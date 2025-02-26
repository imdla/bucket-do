import React, { useEffect, useState } from 'react';
import Bucket from '../components/Bucket';
import styles from '../styles/BucketList.module.css';
function BucketList({ activeIndex, bucketList, newBucket, onDelete }) {
  const list = bucketList
    .filter((bucket) => {
      const { completed } = bucket;
      if (activeIndex === 0) {
        return true;
      } else {
        return completed + 1 == activeIndex;
      }
    })
    .map((bucket) => {
      return (
        <li key={bucket.id}>
          <Bucket bucket={bucket} onDelete={onDelete}></Bucket>
        </li>
      );
    });

  return (
    <ul className={styles.container}>
      {list.length > 0 ? list : <li>버킷리스트를 추가해주세요</li>}
    </ul>
  );
}

export default BucketList;
