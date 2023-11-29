import React, { useState, useEffect } from "react";
import Olympics from "../olympics.png";
import ResultsTable from "../components/resultsTable";
import { fetchTables, fetchAttributesByRelation, fetchDataByAttributes } from "../services/searchDatabaseServices";
import "./searchDatabase.css";

function SearchDatabase() {
  const [inputValue, setInputValue] = useState("");
  const [relations, setRelations] = useState([]);
  const [selectedRelation, setSelectedRelation] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);

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

  useEffect(() => {
    fetchDataByAttributes(selectedRelation, selectedAttributes)
    .then(data => {
        console.log(data);
        setFetchedData(data);
      })
      .catch(error => console.error('Error fetching table names:', error));
  }, [fetchedData]);

  const handleRelationChange = (event) => {
    const { value } = event.target;
    setSelectedRelation(value);
    setSelectedAttributes([]); // Reset selected attributes when relation changes
    console.log(value);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCheckboxChange = (event) => {
    const attributeName = event.target.name;
  
    setSelectedAttributes((prevAttributes) => {
      const isChecked = prevAttributes.includes(attributeName);
  
      if (isChecked) {
        return prevAttributes.filter((item) => item !== attributeName);
      } else {
        return [...prevAttributes, attributeName];
      }
    });
  };

  return (
    <>
      <div className="search">
        <div className="image">
          <img src={Olympics} alt="Olympics Logo" />
        </div>
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
                onChange={handleCheckboxChange}
                name={attribute.Field} // Use 'name' instead of 'value'
                />
                {attribute.Field}
              </label>
            ))}
          </div>
        )}
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
        <div className="show">
          Show athletes with ... <button className="Btn"> Show </button>
        </div>
        <div className="show">aggregation with having query?</div>
        <div className="show">
          Show athletes who have won all medal types{" "}
          <button className="Btn"> Show </button>
        </div>
        <ResultsTable/>
        
      </div>
    </>
  );
}

export default SearchDatabase;
