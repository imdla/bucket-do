import React, { useEffect, useState } from 'react';
import Bucket from '../components/Bucket';
import styles from '../styles/BucketList.module.css';
function BucketList({ activeIndex, bucketList, newBucket, onDelete }) {
  const [buckets, setBuckets] = useState();

  return (
    <div className={styles.container}>
      {bucketList &&
        bucketList.map((bucket) => (
          <li key={bucket.id}>
            <Bucket activeIndex={activeIndex} bucket={bucket} onDelete={onDelete}></Bucket>
          </li>
        ))}
    </div>
  );
}

export default BucketList;
