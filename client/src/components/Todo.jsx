import React, { useEffect, useState } from 'react';
import todoApi from '../api/todoApi';
import styles from '../styles/Todo.module.css';
import errorMessages from '../config/errorMessages';

export default function Todo({ bucketId, todo, fetchTodo, isFixed, modalOpen, modalClose }) {
  const { id, content, checkCompleted } = todo;
  const [formData, setFormData] = useState({
    content: content.slice(0, 4) == 'null' ? '완료' : content,
    checkCompleted: checkCompleted,
  });

  useEffect(() => {
    updateTodo();
  }, [formData]);

  // 콘텐츠, 체크박스 업데이트
  const updateTodo = async () => {
    try {
      await todoApi.updateTodo(bucketId, id, formData);
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

  // 콘텐츠 수정
  const handleChangeContent = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 체크박스 수정
  const handleChangeCheckbox = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  // 투두 삭제
  const handleDeleteTodo = async (e) => {
    e.preventDefault();

    try {
      await todoApi.deleteTodo(bucketId, id);
      fetchTodo();
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.todo}>
      <form onSubmit={handleSubmit}>
        <input
          type="checkbox"
          name="checkCompleted"
          onChange={handleChangeCheckbox}
          checked={formData.checkCompleted}
        />

        <input
          id="content"
          type="text"
          name="content"
          placeholder="투두 리스트 내용을 입력해주세요"
          required
          value={formData.content || ''}
          onChange={handleChangeContent}
          onBlur={updateTodo}
          disabled={isFixed}
        />
      </form>

      <button
        className={isFixed ? styles.fixedTodoButton : styles.deleteButton}
        onClick={handleDeleteTodo}
      >
        x
      </button>
    </div>
  );
}
