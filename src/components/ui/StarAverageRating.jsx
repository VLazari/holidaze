import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfStroke, faStar } from '@fortawesome/free-solid-svg-icons';

/**
 * Display the star icons based on the average review
 * @param props rating
 * @returns jsx component containing star icons
 */

export default function StarAverageRating(props) {
  return (
    <div className="flex items-center">
      <h3 className="sr-only">Reviews</h3>
      {props.rating < 1 ? (
        <p className="ml-1 text-sm font-medium text-slate-900">Not rated</p>
      ) : (
        <>
          {[1, 2, 3, 4, 5].map((rating) =>
            props.rating >= rating ? (
              <FontAwesomeIcon
                key={rating}
                className="mx-0.5 text-sm text-gold-main"
                icon={faStar}
              />
            ) : props.rating < rating && props.rating > rating - 1 ? (
              <FontAwesomeIcon
                key={rating}
                className="mx-0.5 text-sm text-gold-main"
                icon={faStarHalfStroke}
              />
            ) : (
              <FontAwesomeIcon
                key={rating}
                className="mx-0.5 text-sm text-gray-200"
                icon={faStar}
              />
            )
          )}
          <p className="ml-1 text-sm font-medium text-slate-900">
            ({props.rating})
          </p>
        </>
      )}
    </div>
  );
}
