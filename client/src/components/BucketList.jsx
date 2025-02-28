import React, { useEffect, useState } from 'react';
import Bucket from '../components/Bucket';
import styles from '../styles/BucketList.module.css';
function BucketList({ activeIndex, bucketList, newBucket, onDelete }) {
  const filterList = ['모두', '진행중', '완료'];
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
      {list.length > 0 ? list : <p className={styles.emptyBucketList}>{filterList[activeIndex]}인 버킷리스트가 없습니다</p>}
    </ul>
  );
}

export default BucketList;
