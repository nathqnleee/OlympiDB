import axios from 'axios';
const API_BASE_URL = 'http://localhost:3001/api';

export const fetchCountries = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/country`);
		console.log(response);
		return response.data;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
};


export const fetchCoachesByCountry = async (country) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/coach/${country}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  export const insertAthlete = async (athleteData) => {
    try {
      console.log(athleteData);
      const response = await axios.post(`${API_BASE_URL}/insertAthlete`, athleteData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error inserting athlete:', error);
      throw error;
    }
  };

  //update component

  export const fetchAthletes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/athletes`);
      // console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  export const updateAthlete = async (athleteData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/updateAthlete`, athleteData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error updating athlete:', error);
      throw error;
    }
  };

  // delete
  export const deleteAthlete = async (athleteData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/deleteAthlete`, athleteData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error deleting athlete:', error);
      throw error;
    }
  };