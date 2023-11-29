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
      params: { selectedRelation, selectedAttributes },
    };
    console.log('Axios request:', config);
    console.log("Relation:", selectedRelation);
    const response = await axios.get(`${API_BASE_URL}/fetchData`, config);

    console.log("Response from server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
