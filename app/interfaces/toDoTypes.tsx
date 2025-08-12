export interface TaskInterface {
    id: string;
    title: string;
    completed: boolean;
}
export interface TaskProps extends TaskInterface {
  onEdit: () => void;
  onDelete: () => void;
}

export interface TaskStore {
    tasks: TaskInterface[];
    addTask: (title: string) => void;
    editTask: (id: string, newTitle: string) => void;
    deleteTask: (id: string) => void;
    toggleTask: (id:string) => void;
}
