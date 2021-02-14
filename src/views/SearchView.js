import React from "react";
import "../css/searchView.css";
import { useHistory } from "react-router-dom";
import DescriptionLine from "../components/DescriptionLine";

window.city = "textCity"
const SearchView = (props) => {
  const { searchType } = props.location.state;
  const history = useHistory();

  const citySearch = (searchWord) => {
    // How to filter correctly?
    // featureCode=P: cities, towns, etc.
    // Currently just returns one answer, hoping the API does a reasonable sorting.
    // Might need to ask someone about that.
    let query = `http://api.geonames.org/searchJSON?name_equals=${searchWord}&featureClass=P&city=cities15000&maxRows=1&username=ytterdorr`;
    fetch(query)
      .then((result) => result.json())
      .then((result) => {
        // Check if we got result
        if (result.geonames.length > 0) {
          // Navigate to cityview
          console.log(result);
          let city = result.geonames[0];
          history.push(`/cityPop?city=${city.geonameId}`)
        } else {
          // Display error
          let errorBox = document.querySelector("#error-box")
          errorBox.innerHTML = `Could not find city: ${searchWord}`;

        }
      });
  };

  const countrySearch = (searchWord) => {
    let query = `http://api.geonames.org/searchJSON?name=${searchWord}&featureCode=PCLI&maxRows=1&username=ytterdorr`;
    fetch(query)
      .then((result) => result.json())
      .then((data) => {
        // Check if we got result
        console.log(data);
        if (data.geonames.length > 0) {
          let country = data.geonames[0]
          console.log(country.name, country.countryCode, country.geonameId);
          // let geonameId = country.geonameId
          history.push(`/country?country=${country.geonameId}`);
        } else { // Error getting the country
          // setError(`No country found, ${countryName}`)
        }
      })
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }


  return (
    <div className="search-container">
      <DescriptionLine text={`Search by ${searchType}`} />
      <input
        type="text"
        name="search-field"
        id="search-field"
        placeholder={`Enter a ${searchType}`}
        onKeyDown={handleKeyDown}
      ></input>
      <div id="error-box"></div>
      <button type="button" id="search-button" onClick={handleSearch}>
        <i className="fas fa-search"></i>
      </button>
    </div >
  );
};

export default SearchView;
