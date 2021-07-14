import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import clsx from 'clsx';

function Pagination({ current_page, total_page, gotoPage }) {
  const arrPages = _.range(total_page);

  return (
    <div className="mt-4 flex flex-row justify-end">
      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        {
          current_page > 1 &&
          <a href="#" onClick={() => gotoPage(current_page - 1)}
             className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <i className="lni lni-chevron-left"></i>
          </a>
        }
        {
          arrPages.length > 1
          && arrPages.map((val) => {
            const pageNumber = val + 1;
            let pageStyles = ['relative', 'inline-flex', 'items-center', 'px-4', 'py-2', 'border', 'border-gray-300', 'bg-white', 'text-sm', 'font-medium', 'text-gray-700', 'hover:bg-gray-50'];
            if (pageNumber == current_page) pageStyles = _.concat(pageStyles, ['bg-gray-200']);
            pageStyles = clsx(pageStyles);
            return (
              <a href="#" onClick={() => gotoPage(pageNumber)}
                 className={pageStyles}>
                {pageNumber}
              </a>
            )
          })
        }
        {
          current_page < total_page &&
          <a href="#" onClick={() => gotoPage(current_page + 1)}
             className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <i className="lni lni-chevron-right"></i>
          </a>
        }
      </nav>
    </div>
  );
}

export default Pagination;