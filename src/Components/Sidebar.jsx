import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { AiFillCloseSquare } from 'react-icons/ai'

const Sidebar = ({ products, onFilterChange, handleToggleSidebar, showSidebar }) => {

  const [selectedFilters, setSelectedFilters] = useState({
    color: null,
    gender: null,
    priceRange: null,
    type: null,
  });

  const handleFilterChange = (filter, value) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [filter]: prevState[filter] === value ? null : value,
    }))
  };

  useEffect(() => {
    console.log(selectedFilters)
    onFilterChange(selectedFilters);
  }, [selectedFilters])


  const PRICE_RANGES = [
    { label: '0-250', min: 0, max: 250 },
    { label: '251-540', min: 250, max: 450 },
    { label: '450 or above', min: 450, max: Infinity }
  ];

  const filters = {
    color: [...new Set(products.map(product => product.color))],
    gender: [...new Set(products.map(product => product.gender))],
    priceRange: PRICE_RANGES,
    type: [...new Set(products.map(product => product.type))]
  };

  return (
    <div className={`sidebar`} id={`${showSidebar ? 'show' : ''}`}>
      <div className="sidebar-header">
        <h2>Filters</h2>
        <button className="filter-icon" onClick={handleToggleSidebar}>
          <AiFillCloseSquare />
        </button>
      </div>
      <div id="sidebar-content">
        <h3>Color</h3>
        <div className='filter-list'>
          {filters.color.map((value) => (
            <label key={value}>
              <input type="checkbox" checked={selectedFilters.color === value} value={value} onChange={(event) => handleFilterChange("color", event.target.value)} />
              {value}
            </label>
          ))}
        </div>
        <h3>Gender</h3>
        <div className='filter-list'>
          {filters.gender.map((value) => (
            <label key={value}>
              <input type="checkbox" checked={selectedFilters.gender === value} value={value} onChange={(event) => handleFilterChange("gender", event.target.value)} />
              {value}
            </label>
          ))}
        </div>
        <h3>Price</h3>
        <div className='filter-list'>
          {filters.priceRange.map((value) => (
            <label key={value.label}>
              <input type="checkbox" checked={selectedFilters.priceRange?.min === value.min} onChange={(event) => handleFilterChange("priceRange", { min: value.min, max: value.max })} />
              {value.label}
            </label>
          ))}
        </div>
        <h3>Type</h3>
        <div className='filter-list'>
          {filters.type.map((value) => (
            <label key={value}>
              <input type="checkbox" value={value} onChange={(event) => handleFilterChange("Color", event.target.value)} />
              {value}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar