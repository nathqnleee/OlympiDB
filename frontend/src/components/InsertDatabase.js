import React, { useState, useEffect } from 'react';
import { fetchCountries, fetchCoachesByCountry, insertAthlete } from '../services/updateDatabaseServices';

function InsertDatabase() {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [coaches, setCoaches] = useState([]);
    const [athleteData, setAthleteData] = useState({
        FirstName: '',
        LastName: '',
        Age: 0,
        Gender: '',
        CountryName: '',
        CoachID: '',
      });

      const [successMessage, setSuccessMessage] = useState('');
      const [errorMessage, setErrorMessage] = useState('');

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
    
      const handleInsertAthlete = (event) => {
        event.preventDefault();

          // Basic validation
          if (
            athleteData.FirstName.trim() === '' ||
            athleteData.LastName.trim() === '' ||
            athleteData.Age === 0 ||
            athleteData.Gender.trim() === '' ||
            selectedCountry.trim() === '' ||
            athleteData.CoachID.trim() === ''
        ) {
            setErrorMessage('Please fill in all the required fields.');
            return;
        }

        insertAthlete(athleteData)
            .then(response => {
                console.log(response);
                setSuccessMessage('Athlete inserted successfully!');
                // Additional logic after successful insertion, if needed
            })
            .catch(error => {
                console.error('Error inserting athlete:', error);
                setSuccessMessage('Error inserting athlete. Please try again.');
            });
    };
    
  
    return (
      <div className="updateDatabasePage">
        <h1>Insert Athlete</h1>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleInsertAthlete}>
            <label>
                First Name:
                <input
                type="text"
                name="FirstName"  // Make sure the name matches the corresponding key in athleteData
                value={athleteData.FirstName}
                onChange={handleInputChange}
                />
            </label>
            <label>
                Last Name:
                <input
                type="text"
                name="LastName"
                value={athleteData.LastName}
                onChange={handleInputChange}
                />
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
                Gender:
                <input
                type="text"
                name="Gender"
                value={athleteData.Gender}
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
            <input type="submit" value="Insert" />
            </form>
       </div>
    );
  }
  
  export default InsertDatabase;