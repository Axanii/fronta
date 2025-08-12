import {create} from 'zustand'
import { TaskStore } from '../interfaces/toDoTypes';






const useTaskStore = create<TaskStore>((set) => ({
    tasks: [{
        id: '1',
        title: "A todo list",
        completed: true,
    }],
    addTask: (title) =>
        set((state) => ({
            tasks: [
                ...state.tasks,
                { id: crypto.randomUUID(), title, completed: false }
            ]
        })),
    editTask: (id, newTitle) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === id ? { ...task, title: newTitle } : task
            )
        })),
    deleteTask: (id) =>
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id)
        })),
    toggleTask: (id) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        }))
}));



export default useTaskStore;