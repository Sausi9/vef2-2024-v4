'use client';
// components/Games/Games.tsx
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styles from './Games.module.css';

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

const Games: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:3000/games');
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error('Failed to fetch games:', error);
        // Handle error (e.g., show error message)
      }
    };

    fetchGames();
  }, []);

  return (
    <div className={styles.gamesContainer}>
      <h2 className={styles.gamesHeader}>Games</h2>
      <ul className={styles.gamesList}>
        {games.map((game) => (
          <li key={game.id} className={styles.gamesItem}>
            <Link href={`/games/${game.id}`}>
                <h3>{game.date ? new Date(game.date).toLocaleDateString() : 'Unknown date'}</h3>
                <p>
                  {game.home?.name} {game.home?.score} - {game.away?.name} {game.away?.score}
                </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Games;

