'use client';
import React, { useState, useEffect } from 'react';
import slugify from 'slugify';
import AddTeamForm from '../AddTeamForm.tsx/AddTeamForm';
import EditTeamForm from '../EditTeamForm/EditTeamForm';
import styles from './Teams.module.css';

export type Team = {
    id: number;
    name: string;
    slug: string;
    description: string;
}
export function Teams() {

  const [teams, setTeams] = useState<Team[]>([]);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  
  const fetchTeams = async () => {
    try {
      const response = await fetch('http://localhost:3000/teams');
      if (!response.ok) {
        throw new Error('Failed to fetch teams');
      }
      const data = await response.json();
      const sortedData = data.sort((a: Team, b: Team) => a.id - b.id);
      setTeams(sortedData);
    } catch (error) {
      console.error('Failed to fetch teams:', error);
    }
  };
  

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleDeleteTeam = async (teamName: string) => {
    const teamSlug = slugify(teamName, { lower: false });
    console.log('Deleting team:', teamSlug);
    try {
      const response = await fetch(`http://localhost:3000/teams/${teamSlug}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete the team');
      }
  
      setTeams(teams.filter(team => slugify(team.name,{lower: false}) !== teamSlug));
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };
  

  if (teams.length === 0) {
    return <p>Loading teams...</p>;
  }

  return (
    <div>
    <h2 className={styles.title}>Teams</h2> 
    {editingTeam ? (
      <EditTeamForm
        team={editingTeam}
        onTeamUpdated={() => {
          setEditingTeam(null);
          fetchTeams();
        }}
      />
    ) : (
      <div>
        <ul className={styles.list}> 
          {teams.map((team) => (
            <li key={team.id} className={styles.listItem}> 
              <h3>{team.name}</h3>
              <p>{team.description}</p>
              <div className={styles.buttonGroup}> 
                <button onClick={() => setEditingTeam(team)} className={styles.button}>Edit</button>
                <button onClick={() => handleDeleteTeam(team.name)} className={styles.deletebutton}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
        <AddTeamForm onTeamAdded={fetchTeams} />
      </div>
    )}
  </div>
);
}

