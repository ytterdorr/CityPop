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
          let cityName = result.geonames[0].toponymName;
          history.push(`/cityPop?city=${cityName}`)
        } else {
          // Display error
          let errorBox = document.querySelector("#error-box")
          errorBox.innerHTML = `Could not find city: ${searchWord}`;

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
