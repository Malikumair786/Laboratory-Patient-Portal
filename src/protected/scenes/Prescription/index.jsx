import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Prescription = () => {
  const [homeVisitRequests, setHomeVisitRequests] = useState([]);

  useEffect(() => {
    const fetchHomeVisitRequests = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5001/home-visit/getAll'
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch home visit requests: ${response.status}`
          );
        }

        const data = await response.json();
        setHomeVisitRequests(data.data);
      } catch (error) {
        console.error('Error fetching home visit requests:', error.message);
      }
    };

    fetchHomeVisitRequests();
  }, []);

  return (
    <div>
      <h2>Home Visit Requests</h2>
      <ul>
        {homeVisitRequests.map(request => (
          <li key={request._id}>
            {/* Display home visit request details */}
            {request.firstName} {request.lastName} - {request.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Prescription;
