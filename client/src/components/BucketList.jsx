import React, { useEffect, useState } from 'react';
import Bucket from '../components/Bucket';
import styles from '../styles/BucketList.module.css';
import bucketApi from '../api/bucketApi';
// import Todo from '../components/';
function BucketList({ activeIndex, bucketList, newBucket }) {
  // const [bucketList, setBucket] = useState();
  // useEffect(() => {}, []);

  return (
    <div className={styles.BucketListcontainer}>
      {bucketList &&
        bucketList.map((bucket) => (
          <li key={bucket.id}>
            <Bucket activeIndex={activeIndex} bucket={bucket}></Bucket>
          </li>
        ))}
    </div>
  );
}

export default BucketList;
