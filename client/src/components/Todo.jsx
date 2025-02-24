import React, { useEffect, useState } from 'react';
import styles from '../styles/Todo.module.css';
import todoApi from '../api/todoApi';

export default function Todo({ bucketId, todoId, todoContent, todoCompleted, fetchTodo }) {
  const [content, setContent] = useState(todoContent);
  const [isCompleted, setCompleted] = useState(todoCompleted);

  useEffect(() => {
    async function updateContent() {
      try {
        const formData = new FormData();
        formData.append('isCompleted', isCompleted);
        const response = await todoApi.updateTodo(bucketId, todoId, formData);
      } catch (error) {
        console.log(error);
      }
    }

    updateContent();
  }, [isCompleted]);

  useEffect(() => {
    async function updateContent() {
      try {
        const formData = new FormData();
        formData.append('content', content);
        const response = await todoApi.updateTodo(bucketId, todoId, formData);
      } catch (error) {
        console.log(error);
      }
    }

    updateContent();
  }, [content]);

  function handleChangeCheckbox(e) {
    if (e.target.checked) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  }

  function handleChangeInput(e) {
    setContent(e.target.value);
  }

  const handleDelete = async () => {
    try {
      await todoApi.deleteTodo(bucketId, todoId);
      fetchTodo();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.todo}>
      <input type="checkbox" onChange={handleChangeCheckbox} />

      <input
        id="content"
        name="content"
        type="text"
        placeholder="투두 리스트 내용을 입력해주세요"
        required
        value={content}
        onChange={handleChangeInput}
      />

      <button className={styles.deleteButton} onClick={handleDelete}>
        x
      </button>
    </div>
  );
}
