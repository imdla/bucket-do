import React, { useEffect, useState } from 'react';
import todoApi from '../api/todoApi';
import Todo from './Todo';
import styles from '../styles/TodoList.module.css';

export default function TodoList({ bucketId, modalOpen, modalClose }) {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await todoApi.getTodos(bucketId);
      const data = response.data;
      const todos = data.todos;
      setTodos(todos);
    } catch (error) {
      console.log(error);
    }
  };

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
  // 현재 버킷(bucketId)의 첫 번째 투두 ID 찾기
  const firstTodoId = todos.length > 0 ? todos[0].id : null;

  const todoList = Array.isArray(todos)
    ? todos.map((todo) => {
        return (
          <li key={todo.id}>
            <Todo
              bucketId={bucketId}
              todo={todo}
              fetchTodo={fetchTodos}
              isFirst={todo.id === firstTodoId}
            />
          </li>
        );
      })
    : null;

  return (
    <div className={styles.todoListContainer}>
      <ul className={styles.todoList}>{todoList}</ul>

      <button className={styles.createButton} onClick={handleCreate}>
        +
      </button>
    </div>
  );
}
