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
        insertAthlete(athleteData)
          .then(response => {
            console.log(response);
            // Additional logic after successful insertion, if needed
          })
          .catch(error => console.error('Error inserting athlete:', error));
      };
    
  
    return (
      <div className="updateDatabasePage">
        <h1>Insert Athlete</h1>
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
        
        {/* <h1>Update Athlete</h1>
      <form>
      <label>
                First Name:
                <input
                type="text"
                name="FirstName"  // Make sure the name matches the corresponding key in athleteData
                />
            </label>
            <label>
                Last Name:
                <input
                type="text"
                name="LastName"
                />
            </label>
            <label>
                Age:
                <input
                type="number"
                name="Age"
                />
            </label>
            <label>
                Gender:
                <input
                type="text"
                name="Gender"
                />
            </label>
            <label>
            Country:
            <select name="selectedCountry">
                <option value="">Select a country</option>
            </select>
            </label>
            <label>
                Coach:
                <select
                    name="CoachID"
                    >
                    <option value="">Select a coach</option>
                    </select>
            </label>
          <input type="submit" value="Update" />
        </form>
      <h1>Delete Athlete Using PlayerID</h1>
        <form>
            <label>
              PlayerID:
              <input type="text" name="PlayerID" />
            </label>
            <input type="submit" value="Delete" />
          </form> */}
       </div>
    );
  }
  
  export default InsertDatabase;