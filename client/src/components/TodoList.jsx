import React, { useEffect, useState, useMemo } from 'react';
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
  const [isDarkBackground, setIsDarkBackground] = useState(false);

  // 배경 이미지에 따른 폰트 컬러 지정
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
      let totalBrightness = 0;
      let pixelCount = 0;

      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];

        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        totalBrightness += brightness;
        pixelCount++;
      }

      const avgBrightness = totalBrightness / pixelCount;
      setIsDarkBackground(avgBrightness < 128);
    };
  }, [imageUrl]);

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
              isDarkBackground={isDarkBackground}
            />
          </li>
        );
      })
    : null;

  // 토글 및 이미지 여부에 띠른 스타일 설정
  const containerStyle = useMemo(() => {
    if (!isToggled) {
      return { opacity: 0, visibility: 'hidden', maxHeight: 0, padding: 0, zIndex: -999 };
    }

    if (imageUrl) {
      return {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }

    return { background: '#b6ccd8' };
  }, [isToggled, imageUrl]);

  return (
    <div style={containerStyle} className={styles.container}>
      <ul>{todos}</ul>
      <button className={styles.createButton} onClick={handleCreate}>
        +
      </button>
    </div>
  );
}
