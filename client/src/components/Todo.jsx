import React, { useState } from 'react';

export default function Todo() {
  const [content, setContent] = useState('');
  const handleTodoInput = () => {};

  return (
    <div>
      <button>체크 박스</button>

      <input
        id="todo"
        name="todo"
        type="text"
        placeholder="투두 리스트 내용을 입력해주세요"
        required
        value={content}
        onChange={handleTodoInput}
      />

      <button>X</button>
    </div>
  );
}
