// src/app/games/pages.tsx
import React from 'react';
import Games from '../../../components/Games/Games';
import styles from '../page.module.css'

const GamesPage = () => {
  return (
    <div className ={styles.container}>
      <h1 className ={styles.title}>Leikirnir í deildinni!</h1>
        <Games/>
    </div>
  );
};

export default GamesPage;
