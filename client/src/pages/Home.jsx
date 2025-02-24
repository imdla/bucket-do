import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import BucketList from '../components/BucketList';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';

import bucketApi from '../api/bucketApi';

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [bucketList, setBucketList] = useState([]);
  const [bucket, setBucket] = useState(null);

  useEffect(() => {
    const fetchBuckets = async () => {
      try {
        const response = await bucketApi.getBuckets();
        setBucketList(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBuckets();
  }, [activeIndex, bucket]);

  const handleCreateBucket = async () => {
    try {
      const response = await bucketApi.createBucket();
      setBucket(response);
    } catch (error) {
      console.log(error);
    }
  };

  // todo : activeIndex 값으로 BucketList 필터링 위해 BucketList에 전달
  // todo : 버킷 생성 시 새로 생성된 버킷을 BucketList에 전달
  // const bucketValue = bucketList.length > 0 ? <BucketList activeIndex={activeIndex} bucket={bucket} /> : <div>버킷리스트를 추가해주세요</div>;
  const bucketValue = bucketList.length > 0 ? <BucketList /> : <div>버킷리스트를 추가해주세요</div>;

  function handleActiveFilter(index) {
    setActiveIndex(index);
  }

  const filterList = ['모두', '진행중', '완료'];
  const filterButtons = filterList.map((label, index) => (
    <li key={index}>
      <button
        className={activeIndex === index ? `${styles.active}` : ''}
        onClick={() => handleActiveFilter(index)}
      >
        {label}
      </button>
    </li>
  ));

  return (
    <div>
      <Header />

      <section>
        <div className={styles.container}>
          <>
            <ul className={styles.filter}>{filterButtons}</ul>
          </>

          {/* todo : activeIndex 값으로 BucketList 필터링 */}
          <div className={styles.bucketList}>{bucketValue}</div>
        </div>
      </section>

      <button className={styles.createButton} onClick={handleCreateBucket}>
        생성
      </button>

      <Footer />
    </div>
  );
}
