import React from 'react';

import Bucket from '../components/Bucket';
import styles from '../styles/components/BucketList.module.css';

function BucketList({ activeIndex, bucketList, fetchBuckets, modalOpen, modalClose }) {
  const filterList = ['모두', '진행중', '완료'];

  // 버킷 생성
  const list = bucketList
    .filter((bucket) => {
      const { checkCompleted } = bucket;

      if (activeIndex === 0) {
        return true;
      } else {
        return checkCompleted + 1 === activeIndex;
      }
    })
    .reverse()
    .map((bucket) => {
      const { id } = bucket;

      return (
        <li key={id}>
          <Bucket
            bucket={bucket}
            fetchBuckets={fetchBuckets}
            modalOpen={modalOpen}
            modalClose={modalClose}
          ></Bucket>
        </li>
      );
    });

  return (
    <ul className={styles.container}>
      {list.length > 0 ? (
        list
      ) : (
        <p className={styles.emptyBucketList}>{filterList[activeIndex]}인 버킷리스트가 없습니다</p>
      )}
    </ul>
  );
}

export default BucketList;
