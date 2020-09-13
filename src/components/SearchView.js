import React from "react";
// import "../css/main.css";
import "../css/searchView.css";
// import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/solid.min.css";

const SearchView = (props) => {
  const { searchType } = props.location.state;
  return (
    <div className="search-container">
      <div className="description">{`SEARCH BY ${searchType.toUpperCase()}`}</div>
      {/* <label htmlFor="search-field">Search</label> */}
      <input type="text" name="search-field" id="search-field"></input>
      <button type="button" id="search-button">
        <i class="fas fa-search"></i>
      </button>
    </div>
  );
};

export default SearchView;
