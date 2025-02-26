import React, { useEffect, useState } from 'react';
import styles from '../styles/bucket.module.css';
import bucketApi from '../api/bucketApi';
import { useRef } from 'react';
import TodoList from '../components/TodoList';
function Bucket({ activeIndex, bucket }) {
  const [showTodoList, setShowTodoList] = useState(false);

  const [inputData, setInputData] = useState({
    title: '',
    file: '',
  });
  const fileInputRef = useRef(null); // 파일 input 요소에 대한 참조

  // bucket prop이 변경될 때마다 inputData 업데이트
  useEffect(() => {
    if (bucket) {
      setInputData({
        title: bucket.title || 'GGGGGG',
        file: bucket.imageUrl || 'HHHHHHH', // 파일 초기화 (필요에 따라 수정)
      });
    }
  }, [bucket]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // 선택된 첫 번째 파일 가져오기
    setInputData((prev) => ({ ...prev, file })); // 파일 state 업데이트
  };

  const handleAutoSubmit = async () => {
    const formData = new FormData(); // FormData 객체 생성
    formData.append('title', inputData.title);

    // 이미지 파일이 있는 경우에 폼데이터에 추가
    if (inputData.file) {
      formData.append('file', inputData.file);
    }

    try {
      await bucketApi.updateBucket(bucket.id, formData);
      console.log('✅ 자동 업데이트 성공!');
    } catch (error) {
      console.error('❌ 업데이트 실패 : ', error);
    }
  };

  useEffect(() => {
    handleAutoSubmit();
  }, [inputData]);

  const handleToggleTodoList = () => {
    setShowTodoList((prev) => !prev); // ✅ 버튼 클릭 시 상태 변경
  };
  return (
    <section className={styles.section}>
      <article className={styles.bucketItem}>
        <div className={styles.bucketImageBox}>
          <img className={styles.bucketImage} src={bucket.imageUrl} alt="미리보기" />
        </div>

        <form className={styles.bucketForm}>
          <input
            className={styles.fileInput}
            type="file"
            accept="image/*"
            ref={fileInputRef}
            name="image_path"
            onChange={handleFileChange}
          />
          <input
            type="text"
            name="title"
            value={inputData.title}
            placeholder="버킷 리스트 내용을 입력해주세요."
            onChange={handleFormChange}
          />
        </form>
        <div className={styles.buttonBox}>
          <button className={styles.toggleButton} onClick={handleToggleTodoList}>
            V
          </button>
          <button className={styles.deleteButton}>X</button>
        </div>
        {/* ✅ showTodoList 상태가 true일 때만 TodoList 표시 */}
      </article>
      {showTodoList && <TodoList bucketId={bucket.id} />}
    </section>
  );
}

export default Bucket;
