import { create } from "zustand";
import { TaskStore, TaskInterface } from "../interfaces/toDoTypes";

const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [], // Initialize empty on server
  addTask: (title: string) => {
    const newTask = { id: crypto.randomUUID(), title };
    const updatedTasks = [...get().tasks, newTask];
    set({ tasks: updatedTasks });
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  },
  editTask: (id: string, newTitle: string) => {
    const updatedTasks = get().tasks.map((task: TaskInterface) =>
      task.id === id ? { ...task, title: newTitle } : task,
    );
    set({ tasks: updatedTasks });
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  },
  deleteTask: (id) => {
    const updatedTasks = get().tasks.filter(
      (task: TaskInterface) => task.id !== id,
    );
    set({ tasks: updatedTasks });
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  },
}));

// Load tasks from localStorage on client side only
if (typeof window !== "undefined") {
  const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  useTaskStore.setState({ tasks: storedTasks });
}

export default useTaskStore;