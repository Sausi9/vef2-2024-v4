'use client';
import React, { useState } from 'react';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Button from '../Button/Button';


type AddTeamFormProps = {
    onTeamAdded: () => void;
}

const AddTeamForm = ({onTeamAdded}: AddTeamFormProps) => {
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTeam = { name: teamName, description: teamDescription };

    const response = await fetch('http://localhost:3000/teams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTeam),
    });

    if(response.ok){
        setTeamName('');
        setTeamDescription('');
        onTeamAdded();
    } 
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label="Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />
      <Input
        label="Description"
        value={teamDescription}
        onChange={(e) => setTeamDescription(e.target.value)}
      />
      <Button type="submit">Add Team</Button>
    </Form>
  );
};

export default AddTeamForm;
