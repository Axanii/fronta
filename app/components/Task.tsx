import EditIcon from '@/app/assets/svg/edit.svg';
import DeleteIcon from '@/app/assets/svg/delete.svg';
import { TaskProps } from '../interfaces/toDoTypes';
import style from '@/app/styles/style-for-components/taskStyles.module.scss'

const Task: React.FC<TaskProps> = ({ id, title, onEdit, onDelete }) => {


  return (
    <li key={id} className={style.taskContainer} data-task-id={id}>
      <div className={style.taskTitle}>{title}</div>
        <div className={style.buttonsContainer}>
      <button
        type="button"
        onClick={onEdit}
        aria-label="Edit task"
        className={style.editIconStyle}
      >
        <EditIcon width={24} height={24} fill='white'/>
      </button>

      <button
        type="button"
        onClick={onDelete}
        aria-label="Delete task"
        className={style.deleteIconStyle}
      >
        <DeleteIcon width={24} height={24} />
      </button>
      </div>
    </li>
  );
};

export default Task;