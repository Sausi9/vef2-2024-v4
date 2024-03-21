// pages/games/[id].tsx
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

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

const GamePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`http://localhost:3000/games/${id}`);
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error('Failed to fetch game:', error);
        // Handle error (e.g., show error message)
      }
    };

    if (id) {
      fetchGame();
    }
  }, [id]);

  if (!game) {
    return <p>Loading game...</p>;
  }

  return (
    <div>
      <h2>Game Details</h2>
      <p>Date: {new Date(game.date).toLocaleDateString()}</p>
      <p>{game.home.name} {game.home.score} - {game.away.name} {game.away.score}</p>
    </div>
  );
};

export default GamePage;
