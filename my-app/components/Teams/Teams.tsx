'use client';
import React, { useState, useEffect } from 'react';
import slugify from 'slugify';
import AddTeamForm from '../AddTeamForm.tsx/AddTeamForm';


type Team = {
    id: number;
    name: string;
    slug: string;
    description: string;
}
export function Teams() {

  const [teams, setTeams] = useState<Team[]>([]);

  // Define fetchTeams outside of useEffect but inside the Teams component
  const fetchTeams = async () => {
    try {
      const response = await fetch('http://localhost:3000/teams'); // Adjust with your actual backend URL
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error('Failed to fetch teams:', error);
      // Handle error (e.g., show error message)
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleDeleteTeam = async (teamName: string) => {
    const teamSlug = slugify(teamName);
    console.log('Deleting team:', teamSlug);
    try {
      const response = await fetch(`http://localhost:3000/teams/${teamSlug}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete the team');
      }
  
      // Update the teams state to remove the deleted team
      // Assuming your state still tracks teams by their ID, not slug
      setTeams(teams.filter(team => slugify(team.name) !== teamSlug));
    } catch (error) {
      console.error('Error deleting team:', error);
      // Optionally, handle the error (e.g., display an error message to the user)
    }
  };
  

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
            <button onClick={() => handleDeleteTeam(team.name)}>Delete</button>
          </li>
        ))}
      </ul>
      <AddTeamForm onTeamAdded = {fetchTeams}/>
    </div>
  );
}

