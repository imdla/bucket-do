import React, { useEffect, useState } from 'react';
import todoApi from '../api/todoApi';
import styles from '../styles/components/Todo.module.css';
import errorMessages from '../config/errorMessages';

export default function Todo({
  bucketId,
  todo,
  fetchTodo,
  isFixed,
  modalOpen,
  modalClose,
  isDarkBackground,
  isFixedTodoSelectable,
}) {
  const { id, content, checkCompleted } = todo;
  const [isFocused, setIsFocused] = useState(false);
  const [formData, setFormData] = useState({
    content: content.slice(0, 4) == 'null' ? '완료' : content,
    checkCompleted: checkCompleted,
  });

  useEffect(() => {
    updateTodo();
  }, [formData]);

  // 콘텐츠, 체크박스 업데이트
  const updateTodo = async () => {
    setIsFocused(false);

    try {
      await todoApi.updateTodo(bucketId, id, formData);
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

  // 콘텐츠 수정
  const handleChangeContent = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 체크박스 수정
  const handleChangeCheckbox = (e) => {
    if (e.target.checked && isFixed) {
      if (isFixedTodoSelectable) {
        setFormData({ ...formData, [e.target.name]: e.target.checked });
      } else {
        const modalData = {
          content: '모든 투두 리스트가 완료되어야 체크 가능합니다.',
          cancelText: '확인',
          onConfirm: false,
        };

        modalOpen(modalData);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    }
  };

  // 투두 삭제
  const DeleteTodo = async () => {
    modalClose();

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

  // 투두 삭제 버튼
  const handleDeleteTodo = async (e) => {
    const modalData = {
      content: '투두를 삭제하시겠습니까 ?',
      cancelText: '취소',
      confirmText: '확인',
      onConfirm: () => DeleteTodo(),
    };

    modalOpen(modalData);
    return;
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
          style={
            isDarkBackground ? { color: isFocused ? '#313d44' : '#fffefb' } : { color: '#313d44' }
          }
          onFocus={() => setIsFocused(true)}
        />
      </form>

      <button
        className={isFixed ? styles.fixedTodoButton : styles.deleteButton}
        onClick={handleDeleteTodo}
      >
        <img src="/assets/icon-close.png" alt="닫기 아이콘" />
      </button>
    </div>
  );
}
