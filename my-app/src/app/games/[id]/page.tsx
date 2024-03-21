// pages/games/[id].tsx
import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

type Team = {
  name: string;
  score: number;
}

type Game = {
  id: number;
  date?: string; // Make date optional
  home: Team;
  away: Team;
}

const GamePage: React.FC<{ game: Game }> = ({ game }) => {
  // Check if game.date is defined before attempting to format it
  const formattedDate = game.date ? format(new Date(game.date), 'YYYY-MM-dd') : 'Unknown';


  return (
    <div>
      <h2>Game Details</h2>
      <p>Date: {formattedDate}</p>
      <p>{game.home.name} {game.home.score} - {game.away.name} {game.away.score}</p>
      <Link href="/games">
        <a>Go back to Games</a>
      </Link>
    </div>
  );
};

export default GamePage;
