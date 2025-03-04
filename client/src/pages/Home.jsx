import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import BucketList from '../components/BucketList';

import Modal from '../components/Modal';
import errorMessages from '../config/errorMessages';

import bucketApi from '../api/bucketApi';
import styles from '../styles/pages/Home.module.css';
import Skeleton from 'react-loading-skeleton';

import { createBucket, removeBucket } from '../store/slices/bucketSlice';

export default function Home() {
  const dispatch = useDispatch();
  const [bucketList, setBucketList] = useState([]);
  const [newBucket, setNewBucket] = useState(null);

  // 0: 모두, 1: 진행중, 2: 완료
  const [activeIndex, setActiveIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    content: '',
    cancelText: '확인',
    onConfirm: false,
  });

  // 새로고침 시 생성된 버킷 아이디 값 삭제
  useEffect(() => {
    if (performance.navigation.type == 1) {
      dispatch(removeBucket());
    }
  }, []);

  // 버킷 리스트 get
  useEffect(() => {
    fetchBuckets();
  }, [activeIndex, newBucket]);

  // 로딩 1초 이상일 때 스켈레톤 실행
  useEffect(() => {
    let timeout;
    if (isLoading) {
      timeout = setTimeout(() => setShowSkeleton(true), 1000);
    } else {
      setShowSkeleton(false);
    }

    return () => clearTimeout(timeout);
  }, [isLoading]);

  // 버킷 리스트 get
  const fetchBuckets = async () => {
    try {
      setIsLoading(true);

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
      setIsLoading(false);
    }
  };

  // 버킷 생성
  const handleCreateBucket = async () => {
    try {
      setIsLoading(true);

      const bucketResponse = await bucketApi.createBucket();
      const bucketId = bucketResponse.data.id;

      dispatch(createBucket({ bucketId }));
      setNewBucket(bucketResponse);
    } catch (error) {
      const errorMessage =
        errorMessages[error.status]?.[error.code] || errorMessages[error.status]?.DEFAULT;

      setModalData({
        ...modalData,
        content: errorMessage,
      });
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  // 모달창 open
  const modalOpen = (modalData) => {
    setModalData(modalData);
    setIsModalOpen(true);
  };

  // 모달창 close
  const modalClose = () => {
    setIsModalOpen(false);
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
      <BucketList
        activeIndex={activeIndex}
        bucketList={bucketList}
        fetchBuckets={fetchBuckets}
        modalOpen={modalOpen}
        modalClose={modalClose}
      />
    ) : (
      <div className={styles.emptyBucketList}>버킷리스트를 추가해주세요</div>
    );

  return (
    <div>
      <Modal
        className={styles.modal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        {...modalData}
      />

      <main style={isModalOpen ? { height: '100vh', overflow: 'hidden' } : {}}>
        <Header />

        <section className={styles.section}>
          <div className={styles.container}>
            {showSkeleton ? (
              <>
                <div
                  className={styles.skeletonMargin}
                  style={{ width: '50vw', display: 'flex', gap: '2vw' }}
                >
                  <Skeleton width="8vw" height={47} />
                  <Skeleton width="8vw" height={47} />
                  <Skeleton width="8vw" height={47} />
                </div>
                <Skeleton className={styles.skeletonMarginLarge} width="50vw" height={130} />
                <Skeleton className={styles.skeletonMarginLarge} width="50vw" height={130} />
                <Skeleton className={styles.skeletonMarginLarge} width="50vw" height={130} />
              </>
            ) : (
              <>
                <ul className={styles.filter}>{filterButtons}</ul>
                <div className={styles.bucketList}>{bucketValue}</div>
              </>
            )}
          </div>
        </section>

        <button className={styles.createButton} onClick={handleCreateBucket}>
          <img src="/assets/icon-plus.png" alt="더하기 아이콘 이미지" />
        </button>

        <Footer />
      </main>
    </div>
  );
}
