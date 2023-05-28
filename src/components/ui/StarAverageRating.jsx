import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfStroke, faStar } from '@fortawesome/free-solid-svg-icons';

/**
 * Display the star icons based on the average review
 * @param props rating
 * @returns jsx component containing star icons
 */

export default function StarAverageRating({ rating }) {
  return (
    <div className="flex items-center">
      <h3 className="sr-only">Reviews</h3>
      {rating < 1 ? (
        <p className="text-sm font-medium text-slate-900">Not rated</p>
      ) : (
        <>
          {[1, 2, 3, 4, 5].map((rating) =>
            rating >= rating ? (
              <FontAwesomeIcon
                key={rating}
                className="text-sm text-gold-main"
                icon={faStar}
              />
            ) : rating < rating && rating > rating - 1 ? (
              <FontAwesomeIcon
                key={rating}
                className="text-sm text-gold-main"
                icon={faStarHalfStroke}
              />
            ) : (
              <FontAwesomeIcon
                key={rating}
                className="text-sm text-gray-200"
                icon={faStar}
              />
            )
          )}
          <p className="ml-1 text-sm font-medium text-slate-900">({rating})</p>
        </>
      )}
    </div>
  );
}
