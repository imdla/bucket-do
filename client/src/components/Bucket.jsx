import React, { useEffect, useState } from 'react';
import styles from '../styles/bucket.module.css';
import bucketApi from '../api/bucketApi';
import { useRef } from 'react';

const INITIAL_FORM_DATA = {
  title: '',
  file: null,
};

function Bucket({ activeIndex, bucket }) {
  const [title, setTitle] = useState('');
  const [imagePath, setImagePath] = useState('');
  const fileInputRef = useRef(null); // 파일 input 요소에 대한 참조

  const [inputData, setInputData] = useState(INITIAL_FORM_DATA);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // 선택된 첫 번째 파일 가져오기
    setInputData((prev) => ({ ...prev, file })); // 파일 state 업데이트
  };

  const handleUpdateTitle = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // FormData 객체 생성

    formData.append('title', inputData.title);
    formData.append('content', inputData.content);

    // 이미지 파일이 있는 경우에 폼데이터에 추가
    if (inputData.file) {
      formData.append('file', inputData.file);
    }

    try {
      await bucketApi.updateBucket(bucket.id, formData);
      resetForm();
    } catch (error) {
      console.error('ERROR : ', error);
    }
  };

  // const handleUpdateTitle = async (e) => {
  //   try {
  //     setTitle(e.target.value);

  //     const formData = new FormData();
  //     formData.append('title', title);
  //     if (inputData.file) {
  //       formData.append('file', inputData.file);
  //     }
  //     const response = await bucketApi.updateBucket(bucket.id, formData);
  //     // setTitle(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleUpdateImage = async (e) => {
  //   const file = e.target.files[0]; // 선택된 첫 번째 파일 가져오기
  //   setInputData((prev) => ({ ...prev, file })); // 파일 state 업데이트

  //   const formData = new FormData(); // FormData 객체 생성
  //   formData.append('title', 'dddd');

  //   // 선택된 이미지 파일이 있으면 FormData 객체에 추가
  //   if (inputData.file) {
  //     formData.append('file', inputData.file);
  //   }

  //   try {
  //     const response = await bucketApi.updateBucket(bucket.id, formData);
  //   } catch (error) {
  //     console.error('error:', error);
  //   }
  // };

  return (
    <article className={styles.bucketItem}>
      {/* {image && (
        <div className={styles.bucketImageBox}>
          <img className={styles.bucketImage} src={image} alt="미리보기" />
        </div>
      )} */}

      <form className={styles.bucketForm}>
        <input
          className={styles.fileInput}
          type="file"
          accept="image/*"
          ref={fileInputRef}
          name="image_path"
          value={imagePath}
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
