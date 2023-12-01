import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchCountryMedalQuery } from '../services/searchDatabaseServices';

const CountryMedalTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCountryMedalQuery();
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
            <th>Country Name</th>
          </tr>
        </thead>
        <tbody>
        {tableData.map((rowData, index) => (
        <tr key={index}>
        <td key="countryName">{rowData.CountryName}</td>
      </tr>
))}
        </tbody>
      </table>
    </div>
  );
};

export default CountryMedalTable;