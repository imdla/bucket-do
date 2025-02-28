import React, { useEffect, useState } from 'react';
import todoApi from '../api/todoApi';
import styles from '../styles/Todo.module.css';

export default function Todo({ bucketId, todo, fetchTodo, isFixed, modalOpen, modalClose }) {
  const { id, content, completed } = todo;
  console.log(todo);

  const [inputContent, setInputContent] = useState(content);
  const [isCompleted, setCompleted] = useState(completed);
  
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

  useEffect(() => {
    async function updateContent() {
      try {
        const formData = new FormData();
        formData.append('completed', isCompleted);
        const response = await todoApi.updateTodo(bucketId, id, formData);
      } catch (error) {
        1;
        console.log(error);
      }
    }

    updateContent();
  }, [isCompleted]);

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
        disabled={isFixed}
      />

      <button
        className={isFixed ? styles.firstTodoButton : styles.deleteButton}
        onClick={handleDelete}
      >
        x
      </button>
    </div>
  );
}
