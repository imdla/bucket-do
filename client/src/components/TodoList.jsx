import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import todoApi from '../api/todoApi';
import styles from '../styles/TodoList.module.css';
import errorMessages from '../config/errorMessages';

export default function TodoList({ bucketId, fixedTodoId, modalOpen, modalClose }) {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  // 투두 리스트 get
  const fetchTodos = async () => {
    try {
      const response = await todoApi.getTodos(bucketId);
      const todos = response.data.todos;
      setTodoList(todos);
    } catch (error) {
      const errorMessage =
        errorMessages[error.status]?.[error.code] || errorMessages[error.status]?.DEFAULT;
      const modalData = {
        content: errorMessage,
        cancelText: '확인',
        onConfirm: false,
      };

      modalOpen(modalData);
    }
  };

  // 투두 생성
  const handleCreate = async () => {
    try {
      await todoApi.createTodo(bucketId);
      fetchTodos();
    } catch (error) {
      const errorMessage =
        errorMessages[error.status]?.[error.code] || errorMessages[error.status]?.DEFAULT;
      const modalData = {
        content: errorMessage,
        cancelText: '확인',
        onConfirm: false,
      };

      modalOpen(modalData);
    }
  };

  const todos = Array.isArray(todoList)
    ? todoList.map((todo) => {
        const isFixed = todo.id === fixedTodoId;

        return (
          <li key={todo.id}>
            <Todo bucketId={bucketId} todo={todo} fetchTodo={fetchTodos} isFixed={isFixed} />
          </li>
        );
      })
    : null;

  return (
    <div className={styles.todoListContainer}>
      <ul className={styles.todoList}>{todos}</ul>

      <button className={styles.createButton} onClick={handleCreate}>
        +
      </button>
    </div>
  );
}
