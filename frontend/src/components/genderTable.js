import React, { useState, useEffect } from 'react';
import { fetchGenderQuery } from '../services/searchDatabaseServices';

const GenderTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGenderQuery()
        setTableData(data)
        console.log('graph returning data:', data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='tableContainer'>
      <table className = 'table'>
        <thead>
          <tr>
            <th>CountryName</th>
            <th> Gender </th>
            <th> Count </th>
          </tr>
        </thead>
        <tbody>
        {tableData.map((rowData, index) => (
        <tr key={index}>
        <td key="country">{rowData.CountryName}</td>
        <td key="gender">{rowData.Gender}</td>
        <td key="age">{rowData.GenderCount}</td>
      </tr>
))}

        </tbody>
      </table>
    </div>
  );
};

export default GenderTable;