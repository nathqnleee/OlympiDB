import React, { useState, useEffect } from "react";
import Olympics from "../olympics.png";
import ResultsTable from "../components/resultsTable";
import { fetchTables, fetchAttributesByRelation, fetchCountries, fetchAlthetesByMedal } from "../services/searchDatabaseServices";
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

    //join
    const [selectedMedal, setSelectedMedal] = useState('');

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
  };  

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCheckboxChange = (attribute) => {
    const isChecked = selectedAttributes.includes(attribute);
    if (isChecked) {
      setSelectedAttributes(selectedAttributes.filter(item => item !== attribute));
    } else {
      setSelectedAttributes([...selectedAttributes, attribute]);
    }
  };

  //join methods
  const handleMedalChange = (event) => {
    const { value } = event.target;
    setSelectedMedal(value);
  };

  // const handleJoinQuery = (event) => {
  //   event.preventDefault();
  //   console.log(selectedMedal)
  //   fetchAlthetesByMedal(selectedMedal, selectedAttributes)
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(error => {console.error('Error updating athlete:', error)});
  // };

  return (
    <>
      <div className="search">
        <div className="image">
          <img src={Olympics} alt="Olympics Logo" />
        </div>
        <Link to ="/login">Manage Database</Link>
        <div className="inputBoxContainer">
          <input
            className="inputBox"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search Olympic Data"
          />
          <button className="Btn"> Search </button>
        </div>
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
                <select id="medalTypeDropdown" name="selectedMedal" value={selectedMedal} onChange={handleMedalChange}>
                  <option value="">Select Medal</option>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                  <option value="bronze">Bronze</option>
                </select> medal!
              <button className="Btn"> Show </button>
            </div>
        <h3>OR</h3>
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

        <div className="show">
          <label>
            Show number of
            <select className="select">
              <option value="attribute"> Gold </option>
              <option value="attribute"> Silver </option>
              <option value="attribute"> Bronze </option>
            </select>
          </label>{" "}
          medals per country
          <button className="Btn"> Search </button>
        </div>
        <div className="show">aggregation with having query?</div>
        <div className="show">
          Show athletes who have won all medal types{" "}
          <button className="Btn"> Show </button>
        </div>
        </div>
        )}
        <ResultsTable selectedAttributes={selectedAttributes} selectedRelation={selectedRelation} selectedFilter={selectedFilter}
                    medalType={selectedMedal}/>
      </div>
    </>
  );
}

export default SearchDatabase;