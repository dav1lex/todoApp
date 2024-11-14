import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Alert, FlatList, Pressable, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import Animated, {FadeInDown, FadeOutUp} from 'react-native-reanimated';
import useStore from './useTaskStore';
import "./global.css"

export default function App() {
    const {task, tasks, setTask, addTask, toggleTaskCompleted, deleteTask} = useStore();

    const completedCount = tasks.filter((task) => task.completed).length;
    const remainingCount = tasks.length - completedCount;

    const CustomButton = ({onPress}) => (
        <TouchableOpacity className="ml-auto mr-auto bg-blue-500 p-3 rounded-lg my-2 w-2/5" onPress={onPress}>
            <Text className="text-white text-center text-lg">Add Task</Text>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-white pt-20 px-10">
            <StatusBar hidden={false}/>
            <Text className="text-3xl font-bold mb-10 text-center">To-Do List</Text>

            <TextInput
                className="border border-gray-300 rounded p-2.5 mb-5"
                placeholder="Add a new task"
                value={task}
                onChangeText={setTask}
            />

            <CustomButton onPress={addTask}/>

            <View className="flex-row justify-between mb-5">
                <Text className="font-medium text-xl">Completed: {completedCount}</Text>
                <Text className="font-medium text-xl">Remaining: {remainingCount}</Text>
            </View>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <Animated.View
                        entering={FadeInDown}
                        exiting={FadeOutUp}
                        layout={FadeInDown.duration(300)}
                        className="flex-row items-center justify-between py-2.5"
                    >
                        <Pressable onPress={() => toggleTaskCompleted(item.id)} className="flex-1 mr-2.5">
                            <View
                                className={`p-4 border-b border-gray-300 rounded ${item.completed ? 'bg-green-100' : 'bg-white'}`}
                            >
                                <Text className={`text-lg ${item.completed ? 'line-through text-gray-600' : ''}`}>
                                    {item.name}
                                </Text>
                            </View>
                        </Pressable>
                        <TouchableOpacity onPress={() => deleteTask(item.id)}>
                            <AntDesign name="minuscircle" size={24} color="#ff6347"/>
                        </TouchableOpacity>
                    </Animated.View>
                )}
            />
        </View>
    );
}
