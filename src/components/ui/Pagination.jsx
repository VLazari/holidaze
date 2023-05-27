import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function Pagination({ venues, setPageResults }) {
  const [currentPage, setCurrentPage] = useState(1);
  const venuesPerPage = 16;
  const nrOfPages = Math.ceil(venues.length / venuesPerPage);
  const startIndex = (currentPage - 1) * venuesPerPage;
  const endIndex = currentPage * venuesPerPage;

  useEffect(() => {
    const currentPageVenues = venues.slice(startIndex, endIndex);
    setPageResults(currentPageVenues);
  }, [venues, startIndex, endIndex]);

  return (
    <div className="flex-col items-center justify-between border-b border-gray-200 bg-white py-3 pb-10">
      <div className="flex flex-col-reverse items-center">
        <div>
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">
              {currentPage === 1 ? 1 : startIndex + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {endIndex > venues.length ? venues.length : endIndex}
            </span>{' '}
            of <span className="font-medium">{venues.length}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex flex-wrap justify-center -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              className="relative my-1 inline-flex items-center cursor-pointer rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {Array.from({ length: nrOfPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <div
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`relative my-1 inline-flex items-center cursor-pointer ${
                    pageNumber === currentPage
                      ? 'bg-blue-main text-white focus:outline-offset-0'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  } px-4 py-2 text-sm font-semibold`}
                >
                  {pageNumber}
                </div>
              );
            })}
            <div
              onClick={() =>
                currentPage < nrOfPages && setCurrentPage(currentPage + 1)
              }
              className="relative my-1 inline-flex items-center cursor-pointer rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
