import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import BucketList from '../components/BucketList';

import Modal from '../components/Modal';
import errorMessages from '../config/errorMessages';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    content: '',
    cancelText: '확인',
    onConfirm: false,
  });

  // 버킷 리스트 get
  useEffect(() => {
    fetchBuckets();
  }, [activeIndex, newBucket, newTodo]);

  const fetchBuckets = async () => {
    try {
      setIsLoading(true)

      const response = await bucketApi.getBuckets();
      setBucketList(response.data);
    } catch (error) {
      const errorMessage =
        errorMessages[error.status]?.[error.code] || errorMessages[error.status]?.DEFAULT;

      setModalData({
        ...modalData,
        content: errorMessage,
      });
      setIsModalOpen(true);
    } finally {
      setIsLoading(false)
    }
  };

  // 버킷 생성
  const handleCreateBucket = async () => {
    try {
      setIsLoading(true)

      const bucketResponse = await bucketApi.createBucket();
      const bucketId = bucketResponse.data.id;
      const todoResponse = await todoApi.createTodo(bucketId);

      setNewBucket(bucketResponse);
      setNewTodo(todoResponse);
    } catch (error) {
      const errorMessage =
        errorMessages[error.status]?.[error.code] || errorMessages[error.status]?.DEFAULT;

      setModalData({
        ...modalData,
        content: errorMessage,
      });
      setIsModalOpen(true);
    } finally {
      setIsLoading(false)
    }
  };

  // 필터 버튼 활성화 기능
  function handleActiveFilter(index) {
    setActiveIndex(index);
  }

  // 필터 버튼 리스트
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

  // 버킷리스트
  const bucketValue =
    bucketList.length > 0 ? (
      <BucketList activeIndex={activeIndex} bucketList={bucketList} onDelete={fetchBuckets} />
    ) : (
      <div className={styles.emptyBucketList}>버킷리스트를 추가해주세요</div>
    );

  return (
    <div>
      <Modal className={styles.modal} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} {...modalData} />
      
      <main  style={isModalOpen ? {height: "100vh", overflow: "hidden"} : {}}>
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
      </main>
    </div>
  );
}
