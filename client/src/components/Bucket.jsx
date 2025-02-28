import React, { useRef, useEffect, useState } from 'react';
import styles from '../styles/Bucket.module.css';
import bucketApi from '../api/bucketApi';
import TodoList from '../components/TodoList';
import todoApi from '../api/todoApi';

function Bucket({ bucket, fetchBuckets }) {
  const [showTodoList, setShowTodoList] = useState(false);
  const [imageUrl, setImageUrl] = useState(bucket.imageUrl);
  const [inputData, setInputData] = useState({
    title: '',
    file: '',
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (bucket) {
      setInputData({
        title: bucket.title || '',
        file: bucket.imageUrl || '',
      });
      setImageUrl(bucket.imageUrl);
    }
  }, [bucket]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setInputData((prev) => ({ ...prev, file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAutoSubmit = async () => {
    const formData = new FormData();
    formData.append('title', inputData.title);

    if (inputData.file) {
      formData.append('file', inputData.file);
    }

    try {
      await bucketApi.updateBucket(bucket.id, formData);
      console.log('✅ 자동 업데이트 성공!!');
    } catch (error) {
      console.error('❌ 업데이트 실패 : ', error);
    }
  };

  useEffect(() => {
    handleAutoSubmit();
  }, [inputData, bucket.imageUrl]);

  const handleToggleTodoList = () => {
    setShowTodoList((prev) => !prev);
  };

  const handleDeleteBucket = async () => {
    try {
      await bucketApi.deleteBucket(bucket.id);
      console.log('✅ 버킷 삭제 성공');
      fetchBuckets();
    } catch (error) {
      console.error('❌ 버킷 삭제 실패', error);
    }
  };
  const handleDeleteImage = async () => {
    setImageUrl(null);
    try {
      await bucketApi.deleteBucketImage(bucket.id);
      console.log('✅ 버킷 이미지 삭제 성공');
      fetchBuckets();
    } catch (error) {
      console.error('❌ 버킷 이미지 삭제 실패', error);
    }
  };
  return (
    <section className={styles.section}>
      <article className={styles.bucket}>
        <div className={styles.imageBox}>
          <img src={imageUrl || '../public/assets/default-image.png'} alt="미리보기" />
          <input
            className={styles.fileInput}
            type="file"
            accept="image/*"
            ref={fileInputRef}
            name="image_path"
            onChange={handleFileChange}
          />
          <div className={styles.imageButtonBox}>
            <button className={styles.addImageButton} onClick={() => fileInputRef.current?.click()}>
              추가
            </button>
            <button className={styles.deleteImageButton} onClick={handleDeleteImage}>
              삭제
            </button>
          </div>
        </div>

        <form>
          <input
            type="text"
            name="title"
            value={inputData.title}
            placeholder="버킷 리스트 내용을 입력해주세요."
            onChange={handleFormChange}
          />
          <div className={styles.progressBarBox}>
            <p>진행률</p>
            <div className={styles.progressBar}>test</div>
          </div>
        </form>

        <div className={styles.buttonBox}>
          <button className={styles.toggleButton} onClick={handleToggleTodoList}>
            {showTodoList ? 'Λ' : 'V'}
          </button>
          <button className={styles.deleteButton} onClick={handleDeleteBucket}>
            X
          </button>
        </div>
      </article>

      {showTodoList && <TodoList bucketId={bucket.id} />}
    </section>
  );
}

export default Bucket;
