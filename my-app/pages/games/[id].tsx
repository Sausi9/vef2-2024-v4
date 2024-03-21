import React from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { Header } from '../../components/Header/Header';
import styles from './GamePage.module.css'; // Update the path as necessary

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

// This function runs at request time on the server-side.
export const getServerSideProps: GetServerSideProps = async (context) => {
    // Ensure `id` is a string. If `context.params` or `id` is undefined, throw an error or redirect.
    const id = context.params?.id;
    if (typeof id !== 'string') {
      // Handle the case where id is not a string. For example, you can redirect to the 404 page or another page.
      return {
        notFound: true, // This will render the default 404 page. You can also use `redirect` to redirect to a custom page.
      };
    }
  
    // Replace this URL with the actual endpoint where you fetch game data by ID
    const response = await fetch(`http://localhost:3000/games/${id}`);
    const game = await response.json();
  
    // Pass the game data to the page via props
    return { props: { game } };
  };
