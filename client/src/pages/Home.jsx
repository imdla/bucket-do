import React, { useState } from 'react';

import Header from '../components/Header';
import BucketList from '../components/BucketList';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';

import useFetch from '../hook/useFetch';
import bucketApi from '../api/bucketApi';

function Home() {
  const [activeIndex, setActiveIndex] = useState(null);
  const { data: bucketList, loading, error } = useFetch(bucketApi.getBuckets);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const bucketValue = bucketList.length > 0 ? <BucketList /> : <div>버킷리스트를 추가해주세요</div>;

  function handleClick(index) {
    setActiveIndex(index);
  }

  const filterList = ['모두', '진행중', '완료'];
  const filterButtons = filterList.map((label, index) => (
    <li key={index}>
      <button
        className={activeIndex === index ? `${styles.active}` : ''}
        onClick={() => handleClick(index)}
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

      <Footer />
    </div>
  );
}

export default Home;
