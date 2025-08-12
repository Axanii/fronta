"use client";
import styles from "./todoStyles.module.scss";
import useTaskStore from "@/app/store/store";
import { useState } from "react";
import Task from "@/app/components/Task";

const ToDoPage = () => {
  const [input, setInput] = useState("");
  const tasks = useTaskStore((state) => state.tasks);
  const editTask = useTaskStore((state) => state.editTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const addTask = useTaskStore((state) => state.addTask);
  // const toggleComplete = useTaskStore((state) => state.toggleTask);

  const handleEdit = (id: string, newTitle: string) => {
    editTask(id, newTitle);
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
  };

  const handleAdd = (title: string) => {
    if (title.trim() === "") return; // ignore empty
    addTask(title.trim());
    setInput(""); // clear input after add
  };

  return (
    <div className={styles.starryBackContainer}>
      <div className={styles.smStars}></div>
      <div className={styles.mdStars}></div>
      <div className={styles.bgStars}></div>
      <main className={styles.container}>
        <div>
          <h1 className={styles.toDoHeader}>To Do List</h1>
          <section className={styles.addNewTask}>
            <label htmlFor="addNewTaskId"></label>
            <input
              className={styles.addNewInput}
              id="addNewTaskId"
              value={input}
              placeholder="govno"
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className={`${styles.buttonAdd} ${styles.buttonAnimation}`}
              onClick={() => handleAdd(input)}
            >
              <span>Add</span>
            </button>
          </section>
        </div>
        <ul className={styles.taskList}>
          {tasks.map((task) => (
            <Task
              key={task.id}
              data-task-id={task.id}
              id={task.id}
              title={task.title}
              completed={task.completed}
              onEdit={() => handleEdit(task.id, "New Title")} // Placeholder title for now
              onDelete={() => handleDelete(task.id)}
            />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default ToDoPage;
