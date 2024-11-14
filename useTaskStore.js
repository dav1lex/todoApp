import { create } from 'zustand';

const useStore = create((set) => ({
    task: '',
    tasks: [],
    setTask: (newTask) => set({ task: newTask }),

    addTask: () => set((state) => {
        if (state.task.trim() === '') return state;

        const newTask = {
            id: Date.now().toString(),
            name: state.task,
            completed: false
        };

        return { tasks: [...state.tasks, newTask], task: '' };
    }),

    toggleTaskCompleted: (taskId) => set((state) => ({
        tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        )
    })),

    deleteTask: (taskId) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
}));

export default useStore;
