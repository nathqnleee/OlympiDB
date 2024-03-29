import React, { useState, useEffect } from "react";
import { fetchByFilter, fetchAgeQuery, fetchDataByAttributes, fetchAlthetesByMedal} from "../services/searchDatabaseServices";

function ResultsTable({ selectedRelation, selectedAttributes, selectedFilter, medalType }) {
  const [tableData, setTableData] = useState([]);
  const [displayAttributes, setDisplayAttributes] = useState(selectedAttributes);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedFilter.length > 0) {
          console.log(medalType);
          const data = await fetchByFilter(selectedRelation, selectedAttributes, selectedFilter);
          console.log('Fetched data:', data);
          setTableData(data);
          setDisplayAttributes(selectedAttributes);
        } else if (medalType !== '') {
          // get medalists
          console.log(medalType);
          const data = await fetchAlthetesByMedal(medalType, selectedAttributes);
          console.log('Fetched data:', data);

          // Update displayAttributes to include MedalType
          setDisplayAttributes([...selectedAttributes, 'MedalType']);

          setTableData(data);
        } else {
          const data = await fetchDataByAttributes(selectedRelation, selectedAttributes);
          console.log('Fetched data:', data);
          setTableData(data);
          setDisplayAttributes(selectedAttributes);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedRelation, selectedAttributes, selectedFilter, medalType]);

  useEffect(() => {
    console.log('tableData:', tableData);
    console.log('displayAttributes:', displayAttributes);
  }, [tableData, displayAttributes]);

  return (
    <div className="tableContainer">
      <h3> Database Results </h3>
      <table className="table">
        <thead>
          <tr>
            {console.log(displayAttributes)}
            {displayAttributes.map((attribute) => (
              <th key={attribute}>{attribute}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((rowData, index) => (
            <tr key={index}>
              {displayAttributes.map((attribute) => (
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