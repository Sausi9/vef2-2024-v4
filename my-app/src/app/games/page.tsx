import React from 'react';
import Games from '../../../components/Games/Games';
import styles from '../page.module.css'
import Header from '../../../components/Header/Header';
const GamesPage = () => {
  return (
    <div className ={styles.container}>
    <Header/>
      <h1 className ={styles.title}>Leikirnir í deildinni!</h1>
        <Games/>
    </div>
  );
};

export default GamesPage;
