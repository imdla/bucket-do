import React, { useState } from 'react';
import styles from '../styles/bucket.module.css';
function Bucket() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <article className={styles.bucketItem}>
      {image && (
        <div className={styles.bucketImageBox}>
          <img className={styles.bucketImage} src={image} alt="미리보기" />
        </div>
      )}

      <form className={styles.bucketForm}>
        <input
          className={styles.fileInput}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <input type="text" placeholder="버킷 리스트 내용을 입력해주세요." />
      </form>
      <div className={styles.buttonBox}>
        <button className={styles.toogleButton}>V</button>
        <button className={styles.deleteButton}>X</button>
      </div>
    </article>
  );
}

export default Bucket;
