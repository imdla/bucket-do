import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import BucketList from '../components/BucketList';

import Modal from '../components/Modal';

import bucketApi from '../api/bucketApi';
import todoApi from '../api/todoApi';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [bucketList, setBucketList] = useState([]);
  const [newBucket, setNewBucket] = useState(null);
  const [newTodo, setNewTodo] = useState(null);
  // 0: 모두, 1: 진행중, 2: 완료
  const [activeIndex, setActiveIndex] = useState(0);
  // todo : 로딩 스켈레톤
  const [isLoading, setIsLoading] = useState(false);
  // todo : 에러 확인 및 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    content: '',
    cancelText: '확인',
    onConfirm: false,
  });


  useEffect(() => {
    fetchBuckets();
  }, [activeIndex, newBucket, newTodo]);

  const fetchBuckets = async () => {
    try {
      setIsLoading(true)

      const response = await bucketApi.getBuckets();
      setBucketList(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  const handleCreateBucket = async () => {
    try {
      setIsLoading(true)

      const bucketResponse = await bucketApi.createBucket();
      const bucketId = bucketResponse.data.id;
      const todoResponse = await todoApi.createTodo(bucketId);

      setNewBucket(bucketResponse);
      setNewTodo(todoResponse);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  const bucketValue =
    bucketList.length > 0 ? (
      <BucketList activeIndex={activeIndex} bucketList={bucketList} onDelete={fetchBuckets} />
    ) : (
      <div>버킷리스트를 추가해주세요</div>
    );

  function handleActiveFilter(index) {
    setActiveIndex(index);
  }

  // 필터 버튼 리스트를 props로 전달
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

      <section className={styles.section}>
        <div className={styles.container}>
          <ul className={styles.filter}>{filterButtons}</ul>
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
