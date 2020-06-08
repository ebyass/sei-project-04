import React from 'react'

const SelectMonth = () => (
  <div className="field">
    <div className="select">
      <select 
        // onChange={handleFilterChange}
        name="selectedOption" 
        // value={selectedOption}
      >
        <option value="All">All</option>
        <option value="2020">JANUARY</option>
        <option value="2019">FEBRUARY</option>
        <option value="2018">MARCH</option>
        <option value="2017">APRIL</option>
        <option value="2016">MAY</option>
        <option value="2016">JUNE</option>
        <option value="2016">JULY</option>
        <option value="2016">AUGUST</option>
        <option value="2016">SEPTEMBER</option>
        <option value="2016">OCTOBER</option>
        <option value="2016">NOVEMBER</option>
        <option value="2016">DECEMBER</option>
      </select>
    </div>
  </div>
)


export default SelectMonth 