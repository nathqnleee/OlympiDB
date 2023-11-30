import React, { useState, useEffect } from 'react';
import { fetchCountries, fetchCoachesByCountry, updateAthlete, fetchAthletes } from '../services/updateDatabaseServices';

function UpdateDatabase() {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [coaches, setCoaches] = useState([]);
    const [athletes, setAthletes] = useState([]);
    const [selectedAthlete, setSelectedAthlete] = useState(''); // contains athlete ID
    const [athleteData, setAthleteData] = useState({
        Age: 0,
        CountryName: '',
        CoachID: '',
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

    // Fetch countries from the API and update the state
    useEffect(() => {
        fetchCountries()
          .then(data => {
            const countryNames = data.map(country => country.CountryName);
            setCountries(countryNames);
          })
          .catch(error => console.error('Error fetching countries:', error));
      }, []);

      useEffect(() => {
        if (selectedCountry) {
          fetchCoachesByCountry(selectedCountry)
            .then(data => {
              setCoaches(data);
            })
            .catch(error => console.error('Error fetching coaches:', error));
        }
      }, [selectedCountry]);

      const handleCountryChange = (event) => {
        const { value } = event.target;
        setSelectedCountry(value);
        handleInputChange({
            target: {
              name: "CountryName",
              value: value,
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
    
      const handleUpdateAthlete = (event) => {
        event.preventDefault();

          // Basic validation
          if (
            athleteData.CountryName.trim() === '' ||
            athleteData.Age === 0 ||
            athleteData.PlayerID.trim() === '' ||
            athleteData.CoachID.trim() === ''
        ) {
            setErrorMessage('Please fill in all the required fields.');
            return;
        }
        updateAthlete(athleteData)
          .then(response => {
            console.log(response);
            setSuccessMessage('Athlete updated successfully!');
          })
          .catch(error => {console.error('Error updating athlete:', error)
          setSuccessMessage('Error updating athlete! Please try again');});
      };

    return (
      <div className="updateDatabasePage">
        <h1>Update Athlete</h1>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleUpdateAthlete}>
      <label>
      Update Record of Athlete: 
            <select id="athleteSelect" value={selectedAthlete} onChange={handleAthleteChange}>
                <option value="" disabled>Select an athlete</option>
                {athletes.map(athlete => (
                <option key={athlete.PlayerID} value={athlete.PlayerID}>
                    {athlete.FirstName} {athlete.LastName}
                </option>
                ))}
            </select>
            </label>
            <label>
                Age:
                <input
                type="number"
                name="Age"
                value={athleteData.Age}
                onChange={handleInputChange}
                />
            </label>

            <label>
            Country:
            <select name="selectedCountry" value={selectedCountry} onChange={handleCountryChange}>
                <option value="">Select a country</option>
                {countries.map(country => (
                <option key={country} value={country}>
                    {country}
                </option>
                ))}
            </select>
            </label>
            <label>
                Coach:
                <select
                    name="CoachID"
                    value={athleteData.CoachID}
                    onChange={handleInputChange}
                    >
                    <option value="">Select a coach</option>
                    {coaches.map(coach => (
                        <option key={coach.CoachID} value={coach.CoachID}>
                        {`${coach.FirstName} ${coach.LastName}`}
                        </option>
                    ))}
                    </select>
            </label>
          <input type="submit" value="Update" />
        </form>
       </div>
    );
  }
  
  export default UpdateDatabase;