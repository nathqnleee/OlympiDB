import React, { useState, useEffect } from "react";
import Olympics from "../olympics.png";
import "./searchDatabase.css";

function SearchDatabase() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
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
            <select className="select">
              <option value="attribute"> Attribute </option>
            </select>
          </label>
        </div>
        <div className="attributeCheckboxes">
          <label>
            <input type="checkbox" />
            Attribute checkboxes
          </label>
          <label>
            <input type="checkbox" />
            Attribute checkboxes
          </label>
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
        <div className="show">
          Show athletes with ... <button className="Btn"> Show </button>
        </div>
        <div className="show">aggregation with having query?</div>
        <div className="show">
          Show athletes who have won all medal types{" "}
          <button className="Btn"> Show </button>
        </div>

        <div className="tableContainer">
          <h3> Show results </h3>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Country</th>
                <th>Etc...</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>data</td>
                <td>data</td>
                <td>data</td>
                <td>data</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default SearchDatabase;
