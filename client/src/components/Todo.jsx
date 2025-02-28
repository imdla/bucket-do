import React, { useEffect, useState } from 'react';
import styles from '../styles/Todo.module.css';
import todoApi from '../api/todoApi';

export default function Todo({ bucketId, todo, fetchTodo, isFirst }) {
  const { id, content, isCompleted } = todo;

  const [formData, setFormData] = useState({
    content: content || '',
    isCompleted: isCompleted || false,
  });

  useEffect(() => {
    // 초기값이 변경된 경우에만 업데이트
    setFormData({
      content: content || '',
      isCompleted: isCompleted || false,
    });
  }, [content, isCompleted]);

  async function updateTodo() {
    try {
      const response = await todoApi.updateTodo(bucketId, id, formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  // 콘텐츠 입력시 formData에 입력
  const handleChangeContent = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 체크박스 클릭시 formData에 입력
  function handleChangeCheckbox(e) {
    setFormData({ ...formData, isCompleted: e.target.checked });
    updateTodo();
  }

  // 버킷 삭제
  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await todoApi.deleteTodo(bucketId, id);
      fetchTodo();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.todo}>
      <input
        name="isCompleted"
        type="checkbox"
        onChange={handleChangeCheckbox}
        checked={formData.isCompleted}
      />

      <input
        id="content"
        name="content"
        type="text"
        placeholder="투두 리스트 내용을 입력해주세요"
        required
        value={formData.content || ''}
        onChange={handleChangeContent}
        onBlur={updateTodo}
        disabled={isFirst}
      />

      <button
        className={isFirst ? styles.firstTodoButton : styles.deleteButton}
        onClick={handleDelete}
      >
        x
      </button>
    </div>
  );
}
