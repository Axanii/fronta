"use client";
import styles from "./todoStyles.module.scss";
import useTaskStore from "@/app/store/taskStore";
import { useState, useEffect } from "react";
import Task from "@/app/components/Task";
import LoginWindow from "../components/auth/LoginWindow";
import useLoginStore from "../store/loginStore";
import LogOut from "../components/LogoutButton";
import ReturnToMain from "../components/ReturnToMain";
// import { ModalProvider } from "../context/ModalContext";

const ToDoPage = () => {
  const [input, setInput] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const token = useLoginStore((state) => state.token);

  // this is for client-side that adds an entry to history stack,
  // alternatively .replace() - If you want client navigation without adding to history (similar to server redirect)

  const { tasks, editTask, deleteTask, addTask } = useTaskStore(
    (state) => state,
  );

  const handleEditStart = (id: string, currentTitle: string) => {
    setEditId(id);
    setEditValue(currentTitle);
  };

  const handleEditChange = (value: string) => {
    setEditValue(value);
  };

  const handleEditSave = () => {
    if (editId && editValue.trim()) {
      editTask(editId, editValue.trim());
    }
    console.log(editId, editValue);
    setEditId(null);
    setEditValue("");
  };
  const handleCancel = () => {
    setEditValue(""); // revert changes
    setEditId(null);
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
  };

  const handleAdd = (title: string) => {
    if (title.trim() === "") return; // ignore empty
    addTask(title.trim());
    setInput(""); // clear input after add
  };


  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };
  
  useEffect(() => {
    if (!token) {
      setShowModal(true);
    } else {
      setShowModal(false); // optional: hide modal if token appears
    }
  }, [token]);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <>
      {token ? (
        <>
          <div className={styles.starryBackContainer}>
            <ReturnToMain />
            <LogOut />
            <div className={styles.smStars}></div>
            <div className={styles.mdStars}></div>
            <div className={styles.bgStars}></div>
          </div>

          <main className={styles.container}>
            <div>
              <h1 className={styles.toDoHeader}>To Do List</h1>
              <section className={styles.addNewTask}>
                <label htmlFor="addNewTaskId"></label>
                <textarea
                  className={styles.addNewInput}
                  id="addNewTaskId"
                  value={input}
                  placeholder="Add new to do task"
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleAdd(input)}
                  rows={1}
                />
                <button
                  className={`${styles.buttonAdd} ${styles.buttonAnimation}`}
                  onClick={() => handleAdd(input)}
                >
                  <span className={styles.buttonText}>Add</span>
                </button>
              </section>
            </div>
            <ul className={styles.taskList}>
              {tasks.map((task) => (
                <div key={task.id}>
                  <Task
                    key={task.id}
                    id={task.id}
                    editValue={editValue}
                    title={task.title}
                    isEditing={editId === task.id}
                    onStartEdit={() => handleEditStart(task.id, task.title)}
                    onChangeEdit={(val: string) => handleEditChange(val)}
                    onSaveEdit={handleEditSave}
                    onDelete={() => handleDelete(task.id)}
                    onCancel={handleCancel}
                  />
                  <div
                    style={{
                      border: "1px",
                    }}
                  ></div>
                </div>
              ))}
            </ul>
          </main>
        </>
      ) : (
        showModal &&  (

            <LoginWindow />
        )
      )}
    </>
  );
};

export default ToDoPage;
