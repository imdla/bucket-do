import React, { useEffect, useState } from 'react';
import styles from '../styles/Todo.module.css';
import todoApi from '../api/todoApi';

export default function Todo({ bucketId, todo, fetchTodo }) {
  const { id, content, is_completed } = todo;
  
  const [inputContent, setInputContent] = useState(content);
  const [isCompleted, setCompleted] = useState(is_completed);

  useEffect(() => {
    async function updateContent() {
      try {
        const formData = new FormData();
        formData.append('is_completed', isCompleted);
        const response = await todoApi.updateTodo(bucketId, id, formData);
      } catch (error) {1
        console.log(error);
      }
    }

    updateContent();
  }, [isCompleted]);

  useEffect(() => {
    async function updateContent() {
      try {
        const formData = new FormData();
        formData.append('content', inputContent);
        const response = await todoApi.updateTodo(bucketId, id, formData);
      } catch (error) {
        console.log(error);
      }
    }

    updateContent();
  }, [inputContent]);

  function handleChangeCheckbox(e) {
    if (e.target.checked) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  }

  function handleChangeInput(e) {
    setInputContent(e.target.value);
  }

  const handleDelete = async () => {
    try {
      await todoApi.deleteTodo(bucketId, id);
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
        value={inputContent}
        onChange={handleChangeInput}
      />

      <button className={styles.deleteButton} onClick={handleDelete}>
        x
      </button>
    </div>
  );
}
