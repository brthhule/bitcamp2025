import axios from 'axios'


export function getDate() {
    return axios.get("http://localhost:3000/date")
      .then(res => res.data)
      .catch(error => {
        console.error("Error fetching date:", error);
        throw error;
      });
  }
