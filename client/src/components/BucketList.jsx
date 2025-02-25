import React from 'react';
import Bucket from '../components/Bucket';
import styles from '../styles/BucketList.module.css';
// import Todo from '../components/';
function BucketList() {
  return (
    <div className={styles.BucketListcontainer}>
      <Bucket />
      {/* <Todo></Todo> */}
    </div>
  );
}

export default BucketList;
