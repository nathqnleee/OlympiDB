import React, { useState, useEffect } from "react";
import Olympics from "../olympics.png";
import ResultsTable from "../components/resultsTable";
import AgeTable from "../components/ageTable";
import MedalTable from "../components/medalTable";
import { fetchTables, fetchAttributesByRelation, fetchDataByAttributes, fetchAgeQuery, fetchMedalQuery } from "../services/searchDatabaseServices";
import "./searchDatabase.css";
import {Link} from 'react-router-dom';

function SearchDatabase() {
  const [inputValue, setInputValue] = useState("");
  const [relations, setRelations] = useState([]);
  const [selectedRelation, setSelectedRelation] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [selectedMedal, setSelectedMedal] = useState('')
  const [showAgeTable, setShowAgeTable] = useState(false);
  const [showMedalTable, setShowMedalTable] = useState(false);



  useEffect(() => {
    fetchTables()
      .then(data => {
        const tableNames = data.map(table => table.Tables_in_olympics);
        setRelations(tableNames);
      })
      .catch(error => console.error('Error fetching table names:', error));
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
    if (isChecked) {
      setSelectedAttributes(selectedAttributes.filter(item => item !== attribute));
    } else {
      setSelectedAttributes([...selectedAttributes, attribute]);
    }
  };


    const handleShowYoungest = (event)  => {
      // const ydata = fetchAgeQuery();
      try {
        const data = fetchAgeQuery()
        console.log("query:", data)
        setSelectedAttributes([])
       // setSelectedRelation("Athlete")
        setShowAgeTable(true)
        setShowMedalTable(false)
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
          })
          .catch(error => console.error('Error fetching medals:', error));
          setShowMedalTable(false)
      }
    }, [selectedMedal]);
  
    const handleShowMedal = (event) => {
      const { value } = event.target;
      setSelectedMedal(value);
      // setSelectedAttributes([]); // Reset selected attributes when relation changes
      console.log(value);
    };

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
          <label>
            Show number of
            <select className="select" value={selectedMedal} onChange={handleShowMedal}>
              <option value="Gold"> Gold </option>
              <option value="Silver"> Silver </option>
              <option value="Bronze"> Bronze </option>
            </select>
          </label>{" "}
          medals per country
          <button className="Btn"> Search </button>
        </div>
        <div className="show">
          Show youngest athletes for countries with avg. athlete
           age that is lower than average athlete age over
            all countries 
            <button className="Btn" onClick={handleShowYoungest}> Show </button>
        </div>
        <div className="show">aggregation with having query?</div>
        <div className="show">
          Show athletes who have won all medal types{" "}
          <button className="Btn"> Show </button>
        </div>
        </div>
        )}

        
        <ResultsTable selectedAttributes={selectedAttributes} selectedRelation={selectedRelation}/>
        {showMedalTable && <MedalTable selectedMedal={selectedMedal} />}
        {showAgeTable && <AgeTable />}
      </div>
    </>
  );
};

export default SearchDatabase;