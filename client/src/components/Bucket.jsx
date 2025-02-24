import React from 'react';
import styles from '../styles/bucket.module.css';
function Bucket() {
  return (
    <article className={styles.bucketItem}>
      <form>
        <input type="image" />
      </form>
      <form>
        <input type="text" placeholder="버킷 리스트 내용을 입력해주세요." />
      </form>
    </article>
  );
}

export default Bucket;
