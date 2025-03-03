import React, { useEffect, useState } from 'react';
import todoApi from '../api/todoApi';
import styles from '../styles/components/Todo.module.css';
import errorMessages from '../config/errorMessages';

export default function Todo({ bucketId, fetchTodo, todo, isFixed, modalOpen, modalClose }) {
  const { id, content, checkCompleted } = todo;
  const [formData, setFormData] = useState({
    content: content.slice(0, 4) == 'null' ? '완료' : content,
    checkCompleted: checkCompleted,
  });

  useEffect(() => {
    updateTodo();
  }, [formData]);

  // 투두 리스트 get
  const fetchTodos = async () => {
    try {
      const response = await todoApi.getTodos(bucketId);
      const todos = response.data.todos;
      return todos;
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

  // 콘텐츠, 체크박스 업데이트
  const updateTodo = async () => {
    try {
      await todoApi.updateTodo(bucketId, id, formData);
      await fetchTodos();
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
  const handleChangeCheckbox = async (e) => {
    const isChecked = e.target.checked;

    if (!isFixed) {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: isChecked,
      }));
    }

    try {
      await updateTodo();
      const updatedTodos = await fetchTodos();

      const allAmount = updatedTodos.length;
      const completedAmount = updatedTodos.filter((todo) => todo.checkCompleted).length;

      if (isChecked && isFixed) {
        if (allAmount - 1 === completedAmount) {
          setFormData((prev) => ({
            ...prev,
            [e.target.name]: isChecked,
          }));
        } else {
          modalOpen({
            content: '모든 투두 리스트가 완료되어야 체크 가능합니다.',
            cancelText: '확인',
            onConfirm: false,
          });
        }
      }
    } catch (error) {
      console.log(error);
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
          value={isFixed ? (todo.content.slice(0, 4) == 'null' ? '완료' : todo.content) : ''}
          onChange={handleChangeContent}
          onBlur={updateTodo}
          disabled={isFixed}
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
