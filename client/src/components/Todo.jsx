import React, { useEffect, useState } from 'react';
import styles from '../styles/Todo.module.css';
import todoApi from '../api/todoApi';

export default function Todo({ bucketId, todo, fetchTodo, isFixed }) {
  const { id, content, completed } = todo;
  console.log(todo);

  const [inputContent, setInputContent] = useState(content);
  const [isCompleted, setCompleted] = useState(completed);

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
