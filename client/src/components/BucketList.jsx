import React from 'react';

import Bucket from '../components/Bucket';
import styles from '../styles/BucketList.module.css';

function BucketList({ activeIndex, bucketList, newBucket, fetchBuckets }) {
  const filterList = ['모두', '진행중', '완료'];

  // 버킷 생성
  const list = bucketList
    .filter((bucket) => {
      const { completed } = bucket;
      
      if (activeIndex === 0) {
        return true;
      } else {
        return completed + 1 === activeIndex;
      }
    })
    .reverse().map((bucket) => {
      const { id } = bucket;
      console.log(newBucket?.id)
      const isBucketCreated = newBucket?.id === id ? true : false;

      return (
        <li key={id}>
          <Bucket bucket={bucket} isBucketCreated={isBucketCreated} fetchBuckets={fetchBuckets}></Bucket>
        </li>
      );
    });

  return (
    <ul className={styles.container}>
      { list.length > 0 ? 
        list : 
        <p className={styles.emptyBucketList}>{filterList[activeIndex]}인 버킷리스트가 없습니다</p>
      }
    </ul>
  );
}

export default BucketList;
