import React, { useEffect, useState } from 'react';
import todoApi from '../api/todoApi';
import styles from '../styles/components/Todo.module.css';
import errorMessages from '../config/errorMessages';

export default function Todo({
  bucketId,
  todo,
  isFixed,
  modalOpen,
  modalClose,
  isFixedTodoSelectable,
}) {
  const { id, content, checkCompleted } = todo;
  const [todoList, setTodoList] = useState([]);
  const [formData, setFormData] = useState({
    content: content.slice(0, 4) == 'null' ? '완료' : content,
    checkCompleted: checkCompleted,
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    updateTodo();
  }, [formData]);

  // 투두 리스트 get
  const fetchTodos = async () => {
    try {
      const response = await todoApi.getTodos(bucketId);
      const todos = response.data.todos;
      setTodoList(todos);
    } catch (error) {
      console.log(error);
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

    fetchTodos();
  };

  // 콘텐츠 수정
  const handleChangeContent = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 체크박스 수정
  // todo: 투두 구현 로직 수정 필요
  const handleChangeCheckbox = (e) => {
    console.log(todoList);
    // const allAmount = todoList.length;
    // const completedAmount = todoList.filter((todo) => todo.checkCompleted).length;
    // console.log(allAmount, completedAmount);

    if (e.target.checked && isFixed) {
      if (isFixedTodoSelectable) {
        setFormData({ ...formData, [e.target.name]: e.target.checked });
        // } else if (allAmount - 1 === completedAmount) {
        //   setFormData({ ...formData, [e.target.name]: e.target.checked });
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
      fetchTodos();
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
