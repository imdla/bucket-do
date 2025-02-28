import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import TodoList from '../components/TodoList';

import bucketApi from '../api/bucketApi';

import styles from '../styles/Bucket.module.css';
import errorMessages from '../config/errorMessages';

function Bucket({ bucket, fetchBuckets, modalOpen, modalClose }) {
  const { id, fixedTodoId, todoAll, todoCompleted } = bucket;
  const progress = (todoCompleted / todoAll) * 100;

  const CreateBucketId = useSelector((state) => state.bucket.bucketId);
  const [isToggled, setIsToggled] = useState(CreateBucketId === id ? true : false);

  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(bucket.imageUrl);
  const [inputData, setInputData] = useState({
    title: '',
    file: '',
  });

  // title, imageUrl 초기값 및 업데이트
  useEffect(() => {
    setInputData({
      title: bucket.title || '',
      file: bucket.imageUrl || '',
    });
    setImageUrl(bucket.imageUrl);
  }, [bucket]);

  // form 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    handleTitleUpdate();
  };

  // title 수정
  const handleTitleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  // title 업데이트
  const handleTitleUpdate = async () => {
    const formData = new FormData();
    formData.append('title', inputData.title);

    try {
      await bucketApi.updateBucket(id, formData);
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

    fetchBuckets();
  };

  // image 수정 및 업데이트
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setInputData((prev) => ({ ...prev, file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('file', inputData.file);

    try {
      await bucketApi.updateBucket(id, formData);
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

  // 토글 버튼
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  // 버킷 삭제 버튼
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
      await bucketApi.deleteBucket(id);
      fetchBuckets();
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

  // 이미지 삭제 버튼
  const handleDeleteImage = async () => {
    const modalData = {
      content: '이미지를 삭제하시겠습니까 ?',
      cancelText: '취소',
      confirmText: '확인',
      onConfirm: () => deleteImage(),
    };

    modalOpen(modalData);
    return;
  };

  // 이미지 삭제
  const deleteImage = async () => {
    setImageUrl(null);

    try {
      await bucketApi.deleteBucketImage(id);
      fetchBuckets();
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

  return (
    <>
      <section className={styles.section}>
        <article className={styles.bucket}>
          <>
            <div style={isToggled ? {} : { opacity: '0', width: '0' }} className={styles.imageBox}>
              <img src={imageUrl || '/assets/default-image.png'} alt="미리보기" />

              <input
                className={styles.imageInput}
                type="file"
                accept="image/*"
                ref={fileInputRef}
                name="image_path"
                onChange={handleFileChange}
                disabled={isToggled ? false : true}
              />

              <div className={styles.imageButtonBox}>
                <button
                  className={styles.addImageButton}
                  onClick={() => fileInputRef.current?.click()}
                >
                  추가
                </button>
                <button
                  style={imageUrl ? {} : { display: 'none' }}
                  className={styles.deleteImageButton}
                  onClick={handleDeleteImage}
                >
                  삭제
                </button>
              </div>
            </div>
          </>

          <>
            <form style={isToggled ? {} : { width: '68%' }} onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={inputData.title}
                placeholder="버킷 리스트 내용을 입력해주세요."
                onChange={handleTitleChange}
                onBlur={handleTitleUpdate}
                disabled={isToggled ? false : true}
              />
              <div className={styles.progressBarBox}>
                <p>진행률</p>
                <div
                  style={{
                    background: `linear-gradient(to right, #71c4ef,  #fffefb  ${progress}%)`,
                  }}
                  className={styles.progressBar}
                >
                  <p>{progress}%</p>
                </div>
              </div>
            </form>
          </>

          <>
            <div className={styles.buttonBox}>
              <button className={styles.toggleButton} onClick={handleToggle}>
                {isToggled ? 'Λ' : 'V'}
              </button>
              <button className={styles.deleteButton} onClick={handleDeleteBucket}>
                X
              </button>
            </div>
          </>
        </article>

        <TodoList
          isToggled={isToggled}
          bucketId={id}
          fixedTodoId={fixedTodoId}
          modalOpen={modalOpen}
          modalClose={modalClose}
        />
      </section>
    </>
  );
}

export default Bucket;
