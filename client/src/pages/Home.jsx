import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import BucketList from '../components/BucketList';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';

function Home() {
  const [currentFilter, setCurrentFilter] = useState('모두');

  function handleClick(e) {
    const filterValue = e.target.innerHTML;
    setCurrentFilter(filterValue);
  }

  return (
    <div>
      <Header></Header>

      <section>
        <div className={styles.container}>
          <>
            <ul className={styles.filter}>
              <li>
                <button onClick={handleClick}>모두</button>
              </li>
              <li>
                <button onClick={handleClick}>진행중</button>
              </li>
              <li>
                <button onClick={handleClick}>완료</button>
              </li>
            </ul>
          </>

          <div className={styles.bucketList}>
            <BucketList></BucketList>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </div>
  );
}

export default Home;
