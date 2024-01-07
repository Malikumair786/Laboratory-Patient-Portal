import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, setRating, count, size }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="star-container" style={{ display: 'flex' }}>
      {[...Array(count || 5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label
            key={index}
            style={{
              color: ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9',
              marginRight: '2px', // Adjust the margin as needed
            }}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          >
            <input
              type="radio"
              name="rating"
              onChange={() => setRating(ratingValue)}
              value={ratingValue}
              style={{ display: 'none' }}
            />
            <FaStar
              cursor="pointer"
              size={size || 20}
              transition="color 200ms"
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
