import React, { useState, useEffect } from "react";
import { fetchByFilter, fetchDataByAttributes} from "../services/searchDatabaseServices";

function ResultsTable({ selectedRelation, selectedAttributes, selectedFilter }) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedAttributes.length > 0) {
          if (selectedFilter) {
            console.log(selectedAttributes)
            console.log(selectedRelation)
            console.log(selectedFilter)
            const data = await fetchByFilter(selectedRelation, selectedAttributes, selectedFilter);
            console.log('Fetched data:', data);
            setTableData(data);
          } else {
            console.log(selectedAttributes)
            console.log(selectedRelation)
            const data = await fetchDataByAttributes(selectedRelation, selectedAttributes);
            console.log('Fetched data:', data);
            setTableData(data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [selectedRelation, selectedAttributes, selectedFilter]);

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