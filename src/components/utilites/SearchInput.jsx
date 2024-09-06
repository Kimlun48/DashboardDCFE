import React from "react";

const SearchInput = ({ search, setSearch}) => {
    return (
        <input 
        type="text"
        placeholder="Search"
        className="form-control mb-3"
        value={search}
        onChange={e => setSearch(e.target.value)}
        />
    );
};
export default SearchInput;