import React, { useState, useEffect } from "react";
import Olympics from "../olympics.png";
import ResultsTable from "../components/resultsTable";
import AgeTable from "../components/ageTable";
import MedalTable from "../components/medalTable";
import GenderTable from "../components/genderTable";
import CountryMedalTable from "../components/countryMedalTable";
import { fetchTables, fetchAttributesByRelation, fetchCountries, fetchAlthetesByMedal, fetchAgeQuery, fetchMedalQuery, fetchGenderQuery, fetchCountryMedalQuery } from "../services/searchDatabaseServices";
import "./searchDatabase.css";
import {Link} from 'react-router-dom';

function SearchDatabase() {
  const [inputValue, setInputValue] = useState("");
  const [relations, setRelations] = useState([]);
  const [selectedRelation, setSelectedRelation] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [countries, setAvailableCountries] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [selectedMedal, setSelectedMedal] = useState('')
  const [showAgeTable, setShowAgeTable] = useState(false);
  const [showMedalTable, setShowMedalTable] = useState(false);
  const [showGenderTable, setShowGenderTable] = useState(false);
  const [showMedalistCountryTable, setMedalistCountry] = useState(false);


    //join
    const [medalType, setMedalType] = useState('');

  useEffect(() => {
    fetchTables()
      .then(data => {
        const tableNames = data.map(table => table.Tables_in_olympics);
        setRelations(tableNames);
      })
      .catch(error => console.error('Error fetching table names:', error));
  }, []);

  useEffect(() => {
    fetchCountries()
      .then(data => {
        const countryNames = data.map(country => country.CountryName); // Use country.CountryName here
        setAvailableCountries(countryNames);
      })
      .catch(error => console.error('Error fetching country names:', error));
  }, []);

  useEffect(() => {
    if (selectedRelation) {
      fetchAttributesByRelation(selectedRelation)
        .then(data => {
          console.log(data)
          setAttributes(data);
        })
        .catch(error => console.error('Error fetching coaches:', error));
    }
  }, [selectedRelation]);

  const handleRelationChange = (event) => {
    const { value } = event.target;
    setSelectedRelation(value);
    setSelectedAttributes([]); // Reset selected attributes when relation changes
    console.log(value);
  };

  const handleCheckBoxChangeFilter = (country) => {
    const isChecked = selectedFilter.includes(country);
    if (isChecked) {
      setSelectedFilter(selectedFilter.filter(item => item !== country));
    } else {
      setSelectedFilter([...selectedFilter, country]);
    }
    setShowAgeTable(false)
    setShowMedalTable(false)
  };  

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCheckboxChange = (attribute) => {
    const isChecked = selectedAttributes.includes(attribute);
    setShowAgeTable(false)
    setShowMedalTable(false)
    setShowGenderTable(false)
    if (isChecked) {
      setSelectedAttributes(selectedAttributes.filter(item => item !== attribute));
    } else {
      setSelectedAttributes([...selectedAttributes, attribute]);
    }
  };

  //join methods
  const handleMedalChange = (event) => {
    const { value } = event.target;
    setMedalType(value);
  };

  const handleShowMedal = (event) => {
    const { value } = event.target;
    setSelectedMedal(value);
    // setSelectedAttributes([]); // Reset selected attributes when relation changes
    console.log(value);
  }; 

  const handleShowYoungest = (event)  => {
    // const ydata = fetchAgeQuery();
    try {
      const data = fetchAgeQuery()
      console.log("query:", data)
      setSelectedAttributes([])
      setShowAgeTable(true)
      setShowMedalTable(false)
      setShowGenderTable(false)
      setMedalistCountry(false)
    } catch (error) {
      console.error('Error fetching data:', error);
      setShowAgeTable(false)
    }
  };

  useEffect(() => {
    if (selectedMedal) {
      fetchMedalQuery(selectedMedal)
        .then(data => {
          console.log('query:', data)
          setShowMedalTable(true)
          setShowAgeTable(false)
          setShowGenderTable(false)
          setMedalistCountry(false)
        })
        .catch(error => console.error('Error fetching medals:', error));
        setShowMedalTable(false)
    }
  }, [selectedMedal]);

  const handleShowGender = (event) => {
    try {
      const data = fetchGenderQuery()
      console.log("query:", data)
      setSelectedAttributes([])
      setShowAgeTable(false)
      setShowMedalTable(false)
      setShowGenderTable(true)
      setMedalistCountry(false)
    } catch (error) {
      console.error('Error fetching data:', error);
     setShowGenderTable(false)
    }
  }

  const handleShowCountryMedal = (event) => {
    const data = fetchCountryMedalQuery()
    setSelectedAttributes([])
    setShowAgeTable(false)
    setShowMedalTable(false)
    setShowGenderTable(false)
    setMedalistCountry(true)
    console.log(data);
  };

  return (
    <>
      <div className="search">
        <div className="image">
          <img src={Olympics} alt="Olympics Logo" />
        </div>
        <Link to ="/login">Manage Database</Link>
       <h2></h2>
        <div className="searchBy">
          <label>
            Search by:
            <select name="selectedTable" value={selectedRelation} onChange={handleRelationChange}>
                <option value="">Select a Relation</option>
                {relations.map(relation => (
                <option key={relation} value={relation}>
                    {relation}
                </option>
                ))}
            </select>
          </label>
        </div>
        <p>Show:</p>
          {attributes.length > 0 && (
          <div className="attributeCheckboxes">
            {attributes.map(attribute => (
              <label key={attribute.Field}>
                <input type="checkbox"
                checked={selectedAttributes.includes(attribute.Field)}
                onChange={() => handleCheckboxChange(attribute.Field)}
                />
                {attribute.Field}
              </label>
            ))}
          </div>
        )}

        {selectedRelation === "Athlete" && (
          <div>

            <div className="show">
                Show athletes who have won a  
                <select id="medalTypeDropdown" name="selectedMedal" value={medalType} onChange={handleMedalChange}>
                  <option value="">Select Medal</option>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                  <option value="bronze">Bronze</option>
                </select> medal!
              <p>OR</p>
            </div>
        
        <div className="countryCheckboxes">
        Filter By Country:
        {countries.map(country => (
          <label key={country}>
            <input
              type="checkbox"
              checked={selectedFilter.includes(country)}
              onChange={() => handleCheckBoxChangeFilter(country)}
            />
            {country}
          </label>
          ))}
        </div>
          <h2> Other Queries To Explore:</h2>
        <div className="show">
          <label>
            Show number of
            <select className="select" value={selectedMedal} onChange={handleShowMedal}>
              <option value="Gold"> Gold </option>
              <option value="Silver"> Silver </option>
              <option value="Bronze"> Bronze </option>
            </select>
          </label>{" "}
          medals per country
        </div>
        <div className="show">
          Show youngest athletes for countries with avg. athlete
           age that is lower than average athlete age over
            all countries 
            <button className="Btn" onClick={handleShowYoungest}> Show </button>
        </div>
        <div className="show">Show countries that have more female gold medalists than male gold medalists
        <button className="Btn" onClick={handleShowGender}> Show </button>
         </div>
        <div className="show">
          Show athletes who have won all medal types
          <button className="Btn" onClick={handleShowCountryMedal}> Show </button>
        </div>
        </div>
        )}
        
        {!showMedalTable && !showAgeTable && !showGenderTable && !showMedalistCountryTable && <ResultsTable selectedAttributes={selectedAttributes} selectedRelation={selectedRelation} selectedFilter={selectedFilter}
                    medalType={medalType}/>}
        {showMedalTable && <MedalTable selectedMedal={selectedMedal} />}
        {showAgeTable && <AgeTable />}
        {showGenderTable && <GenderTable />}
        {showMedalistCountryTable && <CountryMedalTable />}
      </div>
    </>
  );
};

export default SearchDatabase;