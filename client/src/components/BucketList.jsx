import React, { useEffect, useState } from 'react';
import Bucket from '../components/Bucket';
import styles from '../styles/BucketList.module.css';
import bucketApi from '../api/bucketApi';
// import Todo from '../components/';
function BucketList({  }) {
  const [bucketList, setBucket] = useState();
  useEffect(() => {
    
  }, []);

  return (
    <div className={styles.BucketListcontainer}>
      <Bucket bucket={bucket} />
      {/* <Todo></Todo> */}
    </div>
  );
}

export default BucketList;
