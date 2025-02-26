import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import BucketList from '../components/BucketList';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';

import bucketApi from '../api/bucketApi';
import todoApi from '../api/todoApi';
export default function Home() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [bucketList, setBucketList] = useState([]);
  const [newBucket, setNewBucket] = useState(null);
  const [newTodo, setNewTodo] = useState(null);

  useEffect(() => {
    const fetchBuckets = async () => {
      try {
        const response = await bucketApi.getBuckets();
        setBucketList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBuckets();
  }, [activeIndex, newBucket, newTodo]);

  const handleCreateBucket = async () => {
    try {
      const bucketResponse = await bucketApi.createBucket();
      const todoResponse = await todoApi.createTodo();
      setNewBucket(bucketResponse);
      setNewTodo(todoResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const bucketValue =
    bucketList.length > 0 ? (
      <BucketList activeIndex={activeIndex} bucketList={bucketList} />
    ) : (
      <div>버킷리스트를 추가해주세요</div>
    );

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
