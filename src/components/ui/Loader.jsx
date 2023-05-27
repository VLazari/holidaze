import React from 'react';

export default function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex justify-center items-center space-x-1 text-lg text-blue-main">
        <svg className="w-10 h-10 animate-spin" viewBox="0 0 32 32">
          <path
            d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
            fill="currentColor"
          />
        </svg>
        <div>Loading ...</div>
      </div>
    </div>
  );
}
