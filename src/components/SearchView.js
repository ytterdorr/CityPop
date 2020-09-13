import React from "react";
import "../css/searchView.css";

const SearchView = (props) => {
  const { searchType } = props.location.state;

  const displayCity = (cityObj) => {
    console.log(cityObj);
  };

  const citySearch = (searchWord) => {
    // How to filter correctly?
    // featureCode=P: cities, towns, etc.
    // Currently just returns one answer, hoping the API does a reasonable sorting.
    // Might need to ask someone about that.
    let query = `http://api.geonames.org/searchJSON?name_equals=${searchWord}&featureClass=P&city=cities15000&maxRows=1&username=ytterdorr`;
    fetch(query)
      .then((result) => result.json())
      .then((result) => {
        if (result.geonames.length > 0) {
          displayCity(result.geonames[0]);
        } else {
          // Display error
        }
      });
  };

  const countrySearch = (searchWord) => {
    console.log(`Country Search: ${searchWord}`);
  };

  const handleSearch = () => {
    console.log("handleSearch");
    let searchWord = document.querySelector("#search-field").value;
    if (searchType === "city") {
      citySearch(searchWord);
    } else if (searchType === "country") {
      countrySearch(searchWord);
    } else {
      console.log(`[handleSearch]: Unknown search type '${searchType}'`);
    }
  };
  return (
    <div className="search-container">
      <div className="description">{`SEARCH BY ${searchType.toUpperCase()}`}</div>
      {/* <label htmlFor="search-field">Search</label> */}
      <input
        type="text"
        name="search-field"
        id="search-field"
        placeholder={`Enter a ${searchType}`}
      ></input>
      <button type="button" id="search-button" onClick={handleSearch}>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default SearchView;
