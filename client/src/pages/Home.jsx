import React from 'react';
import Header from '../components/Header';
import BucketList from '../components/BucketList';
import Footer from '../components/Footer';

function Home() {
  return (
    <div>
      <Header></Header>
      <BucketList></BucketList>
      <Footer></Footer>
    </div>
  );
}

export default Home;
