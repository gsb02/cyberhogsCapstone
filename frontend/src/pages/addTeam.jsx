import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import './teams.css'
const AddTeams = () => {
  const [teamName, setTeamName] = useState('');
  const [teamDesc, setTeamDesc] = useState('');
  const [sportID, setSportID] = useState('');
  const [gender, setGender] = useState('');
  const [season, setYear] = useState('');
  const [sports, setSports] = useState([]);
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
}
  useEffect(() => {
  const fetchSports = async () => {
    try {
      const response = await axios.get('http://localhost:3000/sports');
      setSports(response.data); // Assuming response.data is an array of sports
    } catch (error) {
      console.error('Error fetching sports:', error);
    }
  };

  fetchSports();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:3000/teams', { teamName, teamDesc, sportID, gender, season });
        navigate('/teams'); // Navigate after successful addition
    } catch (error) {
            console.error('There was an error adding the team:', error);
    }
    }
    console.log(sports);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '5px', marginTop:'20px' }}>Team Name:</label>
        <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} style={{ width: '300px', height: '30px' }} />
        <br />
        <label style={{ marginBottom: '5px' }}>Team Description:</label>
        <input type="text" value={teamDesc} onChange={(e) => setTeamDesc(e.target.value)} style={{ width: '300px', height: '30px' }} />
        <br />
        <label style={{ marginBottom: '5px' }}>Select Sport:</label>
        <select value={sportID} onChange={(e) => setSportID(e.target.value)} style={{ width: '310px', height: '30px'}}>
        {sports.map(sport => (
        <option key={sport.sportId} value={sport.sportId}>{sport.sportName}</option>
          ))}
        </select>
        <br />
        <label style={{ marginBottom: '5px' }}>Gender:</label>
        <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} style={{ width: '300px', height: '30px' }} />
        <br />
        <label style={{ marginBottom: '5px' }}>Year:</label>
        <input type="text" value={season} onChange={(e) => setYear(e.target.value)} style={{ width: '300px', height: '30px' }} />
        <br />
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '-10px', marginBottom: '10px'}}>
        <button type="submit" className="add-team">Add Team</button>
        </div>
      </form>
      <button onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default AddTeams;