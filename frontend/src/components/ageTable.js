import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchAgeQuery } from '../services/searchDatabaseServices';

const AgeTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAgeQuery();
        setTableData(data);
        console.log('graph returning data:', data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <table className = 'table'>
        <thead>
          <tr>
            <th>CountryName</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
        {tableData.map((rowData, index) => (
        <tr key={index}>
        <td key="country">{rowData.CountryName}</td>
        <td key="age">{rowData.Oldest}</td>
      </tr>
))}

        </tbody>
      </table>
    </div>
  );
};

export default AgeTable;