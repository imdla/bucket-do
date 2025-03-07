import React, { useEffect, useState } from 'react';
import todoApi from '../api/todoApi';
import styles from '../styles/components/Todo.module.css';
import errorMessages from '../config/errorMessages';
import ConfettiEffect from '../components/ConfettiEffect';

export default function Todo({
  bucketId,
  fetchTodo,
  todo,
  isFixed,
  isCompleted,
  setIsCompleted,
  modalOpen,
  modalClose,
}) {
  const { id, content, checkCompleted } = todo;
  const [formData, setFormData] = useState({
    content: isFixed ? (content ? content : '완료') : content,
    checkCompleted: checkCompleted,
  });

  // 폭죽효과 스테이트
  const [explode, setExplode] = useState(false);

  useEffect(() => {
    updateTodo();
  }, [formData]);

  // 버킷 리스트 완료시 폭죽 효과
  useEffect(() => {
    if (explode) {
      modalOpen({
        content: '🎉 축하합니다! 모든 투두가 완료되었습니다. 🎉',
        cancelText: '확인',
      });

      setTimeout(() => {
        setExplode(false);
        modalClose();
      }, 3000);
    }
  }, [explode]);

  // 최종 완료 투두가 완료되었는지 확인
  useEffect(() => {
    if (isFixed && checkCompleted) {
      setIsCompleted(true);
    }
  }, [checkCompleted, isFixed]);

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

  // 체크박스 표시
  const changeCheckbox = (e) => {
    modalClose(true);
    const isChecked = e.target.checked;

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: isFixed ? true : isChecked,
    }));

    if (isFixed) {
      setIsCompleted(true);
    }
  };

  // 체크박스 수정
  const handleChangeCheckbox = async (e) => {
    const isChecked = e.target.checked;

    if (!isFixed) {
      changeCheckbox(e);
    }

    try {
      await updateTodo();
      const updatedTodos = await fetchTodos();

      const allAmount = updatedTodos.length;
      const completedAmount = updatedTodos.filter((todo) => todo.checkCompleted).length;

      if (isChecked && isFixed) {
        if (allAmount - 1 === completedAmount) {
          modalOpen({
            content: `최종 완료 투두를 체크하실 경우, 버킷은 완료되어 해당 버킷에 대한 투두 리스트를 추가할 수 없습니다.
            최종 완료를 체크하시겠습니까?`,
            cancelText: '취소',
            confirmText: '확인',
            onConfirm: () => {
              changeCheckbox(e);
              setExplode(true);
            },
          });
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
    <>
      <div className={styles.todo}>
        <form onSubmit={handleSubmit}>
          <input
            type="checkbox"
            name="checkCompleted"
            onChange={handleChangeCheckbox}
            checked={formData.checkCompleted}
            disabled={isCompleted}
          />

          <input
            id="content"
            type="text"
            name="content"
            placeholder="투두 리스트 내용을 입력해주세요"
            required
            value={isFixed ? (content ? content : '완료') : formData.content}
            onChange={handleChangeContent}
            onBlur={updateTodo}
            disabled={isFixed || isCompleted}
          />
        </form>

        <button
          className={isFixed ? styles.fixedTodoButton : styles.deleteButton}
          onClick={handleDeleteTodo}
          style={isCompleted ? { display: 'none' } : {}}
        >
          <img src="/assets/icon-close.png" alt="닫기 아이콘" />
        </button>
      </div>

      {/* ConfettiEffect 컴포넌트 렌더링 */}
      {explode && <ConfettiEffect trigger={explode} />}
    </>
  );
}
