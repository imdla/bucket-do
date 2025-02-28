import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from '../styles/Bucket.module.css';
import bucketApi from '../api/bucketApi';
import TodoList from '../components/TodoList';
import todoApi from '../api/todoApi';
import errorMessages from '../config/errorMessages';


function Bucket({ bucket, fetchBuckets, modalOpen, modalClose }) {
  const fileInputRef = useRef(null);
  const CreateBucketId = useSelector((state) => state.bucket.bucketId);
  const [isToggled, setIsToggled] = useState(CreateBucketId === bucket.id ? true : false);
  const [imageUrl, setImageUrl] = useState(bucket.imageUrl);
  const [inputData, setInputData] = useState({
    title: '',
    file: '',
  });

  useEffect(() => {
    if (bucket) {
      setInputData({
        title: bucket.title || '',
        file: bucket.imageUrl || '',
      });
      setImageUrl(bucket.imageUrl);
    }
  }, [bucket]);

  const handleTitleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setInputData((prev) => ({ ...prev, file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }

    const formData = new FormData();
    formData.append('file', inputData.file);

    try {
      await bucketApi.updateBucket(bucket.id, formData);
      console.log('✅ 자동 업데이트 성공!!');
    } catch (error) {
      console.error('❌ 업데이트 실패 : ', error);
    }
  };

  const handleTitleUpdate = async () => {
    const formData = new FormData();
    formData.append('title', inputData.title);

    try {
      await bucketApi.updateBucket(bucket.id, formData);
      console.log('✅ 자동 업데이트 성공!!');
    } catch (error) {
      console.error('❌ 업데이트 실패 : ', error);
    }

    fetchBuckets();
  };

  const handleToggleTodoList = () => {
    setIsToggled((prev) => !prev);
  };

  // 버킷 삭제 버튼 클릭
  const handleDeleteBucket = () => {
    const modalData = {
      content: '버킷을 삭제하시겠습니까 ?',
      cancelText: '취소',
      confirmText: '확인',
      onConfirm: () => deleteBucket(),
    };

    modalOpen(modalData);
    return;
  };

  // 버킷 삭제
  const deleteBucket = async () => {
    modalClose();

    try {
      await bucketApi.deleteBucket(bucket.id);
      fetchBuckets();
    } catch (error) {
      const errorMessage = errorMessages[error.status]?.[error.code] || errorMessages[error.status]?.DEFAULT;
      const modalData = {
        content: errorMessage,
        cancelText: '확인',
        onConfirm: false,
      };
  
      modalOpen(modalData);
    }
  }

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
    <>
    <section className={styles.section}>
      <article className={styles.bucket}>
        <div style={isToggled ? {} : {display: "none"}} className={styles.imageBox}>
          <img src={imageUrl || '/assets/default-image.png'} alt="미리보기" />

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
            onChange={handleTitleChange}
            onBlur={handleTitleUpdate}
          />
          <div className={styles.progressBarBox}>
            <p>진행률</p>
            <div className={styles.progressBar}>
              <p>test</p>
            </div>
          </div>
        </form>

        <div className={styles.buttonBox}>
          <button className={styles.toggleButton} onClick={handleToggleTodoList}>
            {isToggled ? 'Λ' : 'V'}
          </button>
          <button className={styles.deleteButton} onClick={handleDeleteBucket}>
            X
          </button>
        </div>
      </article>

      {isToggled && <TodoList bucketId={bucket.id} />}
    </section>
    </>
  );
}

export default Bucket;
