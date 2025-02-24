import React, { useState } from 'react';
import styles from '../styles/Todo.module.css';

export default function Todo() {
  const [content, setContent] = useState('');
  const handleTodoInput = () => {};

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
        onChange={handleTodoInput}
      />

      <button className={styles.deleteButton}>X</button>
    </div>
  );
}
