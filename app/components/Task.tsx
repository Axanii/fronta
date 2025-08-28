import EditIcon from "@/app/assets/svg/edit.svg";
import DeleteIcon from "@/app/assets/svg/delete.svg";
import { TaskProps } from "../interfaces/toDoTypes";
import style from "@/app/styles/style-for-components/taskStyles.module.scss";
import AcceptIcon from "@/app/assets/svg/acceptEdit.svg";
import CancelEdit from "@/app/assets/svg/cancelEdit.svg";
import { useEffect, useRef } from "react";

const Task: React.FC<TaskProps> = ({
  id,
  title,                 // NOTE: always the store value when not editing
  onDelete,
  onChangeEdit,
  onStartEdit,
  isEditing,
  onSaveEdit,
  onCancel,
  editValue              // NOTE: temp text while editing
}) => {

  const taRef = useRef<HTMLTextAreaElement | null>(null); // NEW: ref to resize on mount
useEffect(() => {
  if (isEditing && taRef.current) {
    const el = taRef.current;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length); // Cursor to end
  }
}, [isEditing, editValue]);

  return (
    // NOTE: key should be on the array element where <Task /> is mapped, not here
    <li className={style.taskContainer} data-task-id={id}>
      {isEditing ? (
        <>
          <textarea
            ref={taRef}                                   // NEW: used for initial sizing
            className={style.editInputOnChange}
            value={editValue}
            onChange={(e) => {                            // CHANGED: resize on each keystroke
              onChangeEdit(e.target.value);                             // keep height in sync with wraps
            }}
            onKeyDown={(e) => {
              // OPTIONAL: If you want Enter to insert newline instead of save:
              // if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSaveEdit(); }
              if (e.key === "Enter") onSaveEdit();        // current behavior: save on Enter
            }}
            autoFocus
            rows={1}                                      // start small; will grow via JS/CSS
          />
          <button className={style.acceptEditIcon} onClick={onSaveEdit}>
            <AcceptIcon />
          </button>
          <button className={style.cancelEditIcon} onClick={onCancel}>
            <CancelEdit />
          </button>
        </>
      ) : (
        <>
          {/* CHANGED: this block now wraps indefinitely due to CSS (white-space/word-break) */}
          <div className={style.taskTitle}>{title}</div>
          <div className={style.buttonsContainer}>
            <button
              type="button"
              onClick={onStartEdit}
              aria-label="Edit task"
              className={style.editIconStyle}
            >
              <EditIcon width={24} height={24} fill="white" />
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
        </>
      )}
    </li>
  );
};

export default Task;