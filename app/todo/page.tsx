"use client";
import styles from "./todoStyles.module.scss";
import useTaskStore from "@/app/store/taskStore";
import { useState, useEffect } from "react";
import Task from "@/app/components/Task";
import LoginWindow from "../components/auth/LoginWindow";
import useLoginStore from "../store/loginStore";


const ToDoPage = () => {
  const [input, setInput] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [shadows, setShadows] = useState({ small: "", medium: "", big: "" });
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const [showLoginModal, setShowLoginModal] = useState(false);
  const token = useLoginStore((state)=> state.token)

  const tasks = useTaskStore((state) => state.tasks);
  const editTask = useTaskStore((state) => state.editTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const addTask = useTaskStore((state) => state.addTask);

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

  useEffect(() => {
    const generateBoxShadow = (n: number) => {
      let value = `${Math.random() * 2000}px ${Math.random() * 2000}px rgb(${Math.random() * 180 + 55}, ${Math.random() * 180 + 55}, ${Math.random() * 180 + 55})`;
      for (let i = 2; i <= n; i++) {
        value += `, ${Math.random() * 2000}px ${Math.random() * 2000}px rgb(${Math.random() * 180 + 55}, ${Math.random() * 180 + 55}, ${Math.random() * 180 + 55})`;
      }
      return value;
    };

    setShadows({
      small: generateBoxShadow(700),
      medium: generateBoxShadow(200),
      big: generateBoxShadow(100),
    });
  }, []);

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   if (token) {
  //     setShowLoginModal(false)
  //     setIsLoggedIn(true);
  //   } else {
  //     setShowLoginModal(true);
  //   }
  // }, []);

  return (
    <>
      {token ? (
        <>
          <div className={styles.starryBackContainer}>
            <div
              className={styles.smStars}
              style={{ boxShadow: shadows.small }}
            ></div>
            <div
              className={styles.mdStars}
              style={{ boxShadow: shadows.medium }}
            ></div>
            <div
              className={styles.bgStars}
              style={{ boxShadow: shadows.big }}
            ></div>
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
        <LoginWindow />
      )}
    </>
  );
};

export default ToDoPage;
