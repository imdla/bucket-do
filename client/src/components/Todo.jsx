import React, { useEffect, useState } from 'react';
import styles from '../styles/Todo.module.css';
import todoApi from '../api/todoApi';

export default function Todo({ bucketId, todoId, fetchTodo }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    async function updateContent() {
      try {
        const response = await todoApi.updateTodo(bucketId, todoId, content);
      } catch (error) {
        console.log(error);
      }
    }

    updateContent();
  }, [content]);

  function handleChange(e) {
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
      <input type="checkbox" />

      <input
        id="content"
        name="content"
        type="text"
        placeholder="투두 리스트 내용을 입력해주세요"
        required
        value={content}
        onChange={handleChange}
      />

      <button className={styles.deleteButton} onClick={handleDelete}>
        X
      </button>
    </div>
  );
}
