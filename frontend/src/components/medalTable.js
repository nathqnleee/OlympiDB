import React, { useState, useEffect } from 'react';
import { fetchMedalQuery } from '../services/searchDatabaseServices';

const MedalTable = ({selectedMedal}) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMedalQuery(selectedMedal)
        console.log(selectedMedal)
        setTableData(data)
        console.log('graph returning data:', data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedMedal]);

  return (
    <div>
      <table className = 'table'>
        <thead>
          <tr>
            <th>CountryName</th>
            <th> Number of athletes</th>
          </tr>
        </thead>
        <tbody>
        {tableData.map((rowData, index) => (
        <tr key={index}>
        <td key="country">{rowData.CountryName}</td>
        <td key="age">{rowData.Count}</td>
      </tr>
))}

        </tbody>
      </table>
    </div>
  );
};

export default MedalTable;