import React from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { Header } from '../../components/Header/Header';
import styles from './GamePage.module.css'; 

type Team = {
  name: string;
  score: number;
}

type Game = {
  id: number;
  date: string;
  home: Team;
  away: Team;
}

export function formatDate(date: Date, locale = 'en-US') {
  const formatter = new Intl.DateTimeFormat(locale, {
    dateStyle: 'full',
    timeStyle: 'short',
  });
  return formatter.format(date);
}




const GamePage: React.FC<{ game: Game }> = ({ game }) => {
  const date = game.date ? formatDate(new Date(game.date)) : 'Unknown date';

  return (
    <div className={styles.container}>
    <Header />
      <h2 className={styles.header}>Upplýsingar um leik!</h2>
      <div className={styles.details}>
        <p className={styles.detailItem}>Dagsetning: {date}</p>
        <p className={styles.detailItem}>{game.home.name} {game.home.score} - {game.away.name} {game.away.score}</p>
      </div>
    </div>
  );
};


export default GamePage;


export const getServerSideProps: GetServerSideProps = async (context) => {
    
    const id = context.params?.id;
    if (typeof id !== 'string') {
      
      return {
        notFound: true, 
      };
    }
  
    
    const response = await fetch(`http://localhost:3000/games/${id}`);
    const game = await response.json();
  
    return { props: { game } };
  };
