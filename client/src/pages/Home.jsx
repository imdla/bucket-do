import React, { useState } from 'react';
import Header from '../components/Header';
import BucketList from '../components/BucketList';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';

function Home() {
  const [isActive, setIsActive] = useState();

  return (
    <div>
      <Header></Header>

      <section>
        <div className={styles.container}>
          <>
            <ul className={styles.filter}>
              <li>
                <button>모두</button>
              </li>
              <li>
                <button>진행중</button>
              </li>
              <li>
                <button>완료</button>
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
