export interface TaskInterface {
    id: string;
    title: string;
    completed?: boolean;
}
export interface TaskProps extends TaskInterface {
  // onEdit: () => void;
  onDelete: () => void;
  isEditing: boolean;
  onStartEdit: () => void;
  onChangeEdit: (val:string) => void;
  onSaveEdit: () => void;
  onCancel: () => void;
  editValue: string,
  
}

export interface TaskStore {
    tasks: TaskInterface[];
    addTask: (title: string) => void;
    editTask: (id: string, newTitle: string) => void;
    deleteTask: (id: string) => void;
}
