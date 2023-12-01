import React, { useState, useEffect } from "react";
import { fetchByFilter, fetchAgeQuery, fetchDataByAttributes, fetchAlthetesByMedal} from "../services/searchDatabaseServices";

function ResultsTable({ selectedRelation, selectedAttributes, selectedFilter, medalType }) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
          if (selectedFilter.length > 0) {
            console.log(medalType)
            const data = await fetchByFilter(selectedRelation, selectedAttributes, selectedFilter);
            console.log('Fetched data:', data);
            setTableData(data);
          } else if (medalType !== '') {
            // get medalists
            console.log(medalType)
            const data = await  fetchAlthetesByMedal(medalType, selectedAttributes);
            console.log('Fetched data:', data);
            setTableData(data);
          }else {
            const data = await fetchDataByAttributes(selectedRelation, selectedAttributes);
            console.log('Fetched data:', data);
            setTableData(data);
          }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  };
  
    fetchData();
  }, [selectedRelation, selectedAttributes, selectedFilter, medalType]);

  useEffect(() => {
    console.log('tableData:', tableData);
  }, [tableData]);

  return (
    <div className="tableContainer">
      <h3> Database Results </h3>
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