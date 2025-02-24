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

  const handleCreate = async () => {
    try {
      await todoApi.createTodo(bucketId);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const todoList = todos.map((todo) => {
    return (
      <li key={todo.id}>
        <Todo bucketId={bucketId} todo={todo} fetchTodo={fetchTodos} />
      </li>
    );
  });

  return (
    <div className={styles.todoListContainer}>
      <ul className={styles.todoList}>{todoList}</ul>

      <button className={styles.createButton} onClick={handleCreate}>
        +
      </button>
    </div>
  );
}
