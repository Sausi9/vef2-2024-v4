// components/EditTeamForm.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { Team } from '../Teams/Teams';
import slugify from 'slugify';

type EditTeamFormProps = {
  team: Team;
  onTeamUpdated: () => void;
}

const EditTeamForm = ({ team, onTeamUpdated }: EditTeamFormProps) => {
  const [name, setName] = useState(team.name);
  const [description, setDescription] = useState(team.description);

  useEffect(() => {
    setName(team.name);
    setDescription(team.description);
  }, [team]); 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Updating team:', name, description);
    const updatedTeam = { name, description };
    const teamSlug = slugify(team.name, { lower: false });
    console.log('Team slug:', teamSlug);
    const response = await fetch(`http://localhost:3000/teams/${teamSlug}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTeam),
    });

    if (response.ok) {
      onTeamUpdated(); 
    } else {
      console.error('Failed to update the team');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label="Team Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button type="submit">Update Team</Button>
    </Form>
  );
};

export default EditTeamForm;
