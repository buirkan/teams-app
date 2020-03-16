import React from 'react'

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = []

    for (let i = 1; i < Math.ceil(totalItems / itemsPerPage); i++)
        pageNumbers.push(i)

    return (
        <div>
            <nav>
                <ul className="pagination">
                    {pageNumbers.map(pageNumber => (
                        <li key={pageNumber} className="page-item">
                            <a onClick={() => paginate(pageNumber)} href='# ' className='page-link'>{pageNumber}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Pagination