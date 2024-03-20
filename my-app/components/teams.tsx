// components/teams/Teams.tsx or components/Teams.tsx based on your organizational preference
import { useEffect, useState } from 'react';


type Team = {
    id: number;
    name: string;
    description: string;
}


export function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch('http://localhost/teams'); // Adjust with your actual backend URL
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
        // Handle error (e.g., show error message)
      }
    }

    fetchTeams();
  }, []);

  if (teams.length === 0) {
    return <p>Loading teams...</p>;
  }

  return (
    <div>
      <h2>Teams</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            <h3>{team.name}</h3>
            <p>{team.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teams;
