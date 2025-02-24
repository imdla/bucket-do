import React, { useEffect, useState } from 'react';
import todoApi from '../api/todoApi';
import Todo from './Todo';
import styles from '../styles/TodoList.module.css';

export default function TodoList({ bucketId }) {
  const [todos, setTodos] = useState([]);

  function fetchTodos() {
    try {
      const response = todoApi.getTodos(bucketId);
      setTodos(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  // const todoList = todos.map((todo) => {
  //   const { id, content, is_completed } = todo;

  //   return (
  //     <li key={id}>
  //       <Todo
  //         bucketId={bucketId}
  //         todoId={id}
  //         todoContent={content}
  //         todoCompleted={is_completed}
  //         fetchTodo={fetchTodos}
  //       />
  //     </li>
  //   );
  // });

  return (
    <div className={styles.todoListContainer}>
      {/* <ul>{todoList}</ul> */}

      <ul className={styles.todoList}>
        <li>
          <Todo></Todo>
        </li>
        <li>
          <Todo></Todo>
        </li>
        <li>
          <Todo></Todo>
        </li>
      </ul>

      <button className={styles.createButton}>+</button>
    </div>
  );
}
