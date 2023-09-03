import React from 'react';

export default function Filter({ value, onChange }) {
  return (
    <div>
      <label htmlFor="filter">Filter by Name:</label>
      <input
        type="text"
        id="filter"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search by name"
      />
    </div>
  );
}
