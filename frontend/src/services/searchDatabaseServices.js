import axios from "axios";
const API_BASE_URL = "http://localhost:3001/api";

export const fetchTables = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tables`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchAttributesByRelation = async (relation) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/tableAttributes/${relation}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// FETCH DATA BY ATTRIBUTES
export const fetchDataByAttributes = async (selectedRelation, selectedAttributes) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const requestBody = {
      selectedRelation: selectedRelation,
      selectedAttributes: selectedAttributes,
    };
    console.log(requestBody)

    const response = await axios.post(`${API_BASE_URL}/fetchData`, requestBody, config);

    console.log("Response from server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// fetch data for nested age query 
export const fetchAgeQuery = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ageQuery`);
    console.log("response from server:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error returning age query:', error);
    throw error;
  }
};

export const fetchMedalQuery = async (MedalType) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/medalCount/${MedalType}`);
    console.log("response from server:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error returning age query:', error);
    throw error;
  }
};