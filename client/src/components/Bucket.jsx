import React, { useEffect, useState } from 'react';
import styles from '../styles/bucket.module.css';
import bucketApi from '../api/bucketApi';
import { useRef } from 'react';

function Bucket({ activeIndex, bucket }) {
  const [inputData, setInputData] = useState({
    title: '',
    file: '',
  });
  const fileInputRef = useRef(null);

  // 버킷 초기화
  useEffect(() => {
    if (bucket) {
      setInputData({
        title: bucket.title || '',
        file: bucket.imageUrl || '',
      });
    }

    console.log(bucket);
  }, [bucket]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setInputData((prev) => ({ ...prev, file }));

    fileInputRef.current.value = file;
    console.log(fileInputRef.current.value);
  };

  const handleAutoSubmit = async () => {
    const formData = new FormData();
    formData.append('title', inputData.title);

    // 이미지 파일이 있는 경우에 폼데이터에 추가
    if (inputData.file) {
      formData.append('file', inputData.file);
    }

    try {
      const response = await bucketApi.updateBucket(bucket.id, formData);
      console.log(response);
      console.log('✅ 자동 업데이트 성공!');
    } catch (error) {
      console.error('❌ 업데이트 실패 : ', error);
    }
  };

  useEffect(() => {
    handleAutoSubmit();
  }, [inputData]);

  return (
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
        <button className={styles.toogleButton}>V</button>
        <button className={styles.deleteButton}>X</button>
      </div>
    </article>
  );
}

export default Bucket;
