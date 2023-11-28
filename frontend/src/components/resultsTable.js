import React, { useState, useEffect } from "react";
import { fetchDataByAttributes } from "../services/searchDatabaseServices";

function ResultsTable({ selectedRelation, selectedAttributes }) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedAttributes.length > 0) {
          const data = await fetchDataByAttributes(selectedRelation, selectedAttributes);
          console.log('Fetched data:', data);
          setTableData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [selectedRelation, selectedAttributes]);

  useEffect(() => {
    console.log('tableData:', tableData);
  }, [tableData]);

  return (
    <div className="tableContainer">
      <h3> Show results </h3>
      <table className="table">
        <thead>
          <tr>
            {selectedAttributes.map((attribute) => (
              <th key={attribute}>{attribute}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((rowData, index) => (
            <tr key={index}>
              {selectedAttributes.map((attribute) => (
                <td key={attribute}>{rowData[attribute]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultsTable;