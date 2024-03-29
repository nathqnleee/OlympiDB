import React, { useState, useEffect } from 'react';
import { fetchAthletes, deleteAthlete } from '../services/updateDatabaseServices';

function DeleteDatabase() {
    const [athletes, setAthletes] = useState([]);
    const [selectedAthlete, setSelectedAthlete] = useState(''); // contains athlete ID
    const [athleteData, setAthleteData] = useState({
        PlayerID: ''
      });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch the athletes from the database
    useEffect(() => {
        fetchAthletes()
        .then(data => {
            setAthletes(data);
            console.log(athletes)
        })
        .catch(error => console.error('Error fetching athletes:', error));
    }, []);

    // Handle athlete selection
    const handleAthleteChange = (event) => {
        const athleteId = event.target.value;
        setSelectedAthlete(athleteId);
        handleInputChange({
            target: {
              name: "PlayerID",
              value: athleteId,
            },
          });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAthleteData(prevData => ({
          ...prevData,
          [name]: value,
        }));
      };

    const handleDeleteAthlete = (event) => {
        event.preventDefault();

          // Basic validation
          if (
            athleteData.PlayerID.trim() === ''
        ) {
            setErrorMessage('Please select an athlete to delete.');
            return;
        }
        deleteAthlete(athleteData)
          .then(response => {
            console.log(response);
            setSuccessMessage('Athlete deleted successfully!');
          })
          .catch(error => {console.error('Error deleting athlete:', error)
          setSuccessMessage('Error deleting athlete! Please try again');
        });
      };

    return (
      <div className="updateDatabasePage">
        <h1>Delete Athlete</h1>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleDeleteAthlete}>
      <label>
            Delete Athlete by Name:
            <select id="athleteSelect" value={selectedAthlete} onChange={handleAthleteChange}>
                <option value="" disabled>Select an athlete</option>
                {athletes.map(athlete => (
                <option key={athlete.PlayerID} value={athlete.PlayerID}>
                    {athlete.FirstName} {athlete.LastName}
                </option>
                ))}
            </select>
            </label>
          <input type="submit" value="Delete" />
        </form>
       </div>
    );
  }
  
  export default DeleteDatabase;