import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import todoApi from '../api/todoApi';
import styles from '../styles/TodoList.module.css';
import errorMessages from '../config/errorMessages';

export default function TodoList({
  imageUrl,
  isToggled,
  bucketId,
  fixedTodoId,
  modalOpen,
  modalClose,
}) {
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
      console.log('투두 생성 에러 발생😈');
      console.log(error);
      // const errorMessage =
      //   errorMessages[error.status]?.[error.code] || errorMessages[error.status]?.DEFAULT;
      // const modalData = {
      //   content: errorMessage,
      //   cancelText: '확인',
      //   onConfirm: false,
      // };

      // modalOpen(modalData);
    }
  };

  // 투두 리스트
  const todos = Array.isArray(todoList)
    ? todoList.map((todo) => {
        const isFixed = todo.id === fixedTodoId;

        return (
          <li key={todo.id}>
            <Todo
              bucketId={bucketId}
              todo={todo}
              fetchTodo={fetchTodos}
              isFixed={isFixed}
              modalOpen={modalOpen}
              modalClose={modalClose}
            />
          </li>
        );
      })
    : null;

  // 토글 및 이미지 여부에 띠른 스타일 설정
  const containerStyle = isToggled
    ? imageUrl
      ? {
          backgroundImage: `url(${imageUrl})`,
          objectFit: 'cover',
          backgroundOrigin: 'border-box',
          backgroundSize: 'cover',
        }
      : { background: '#b6ccd8' }
    : { opacity: '0', visibility: 'hidden', maxHeight: '0', padding: '0', zIndex: '-999' };

  return (
    <div style={containerStyle} className={styles.container}>
      <ul>{todos}</ul>

      <button className={styles.createButton} onClick={handleCreate}>
        +
      </button>
    </div>
  );
}
