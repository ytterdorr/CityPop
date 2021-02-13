import React from "react";
import { Link } from "react-router-dom";

const StartView = () => {
  return (
    <div className="button-container">
      <Link to={{ pathname: "/search", state: { searchType: "city" } }}>
        <button type="button" className="start-button">
          SEARCH BY CITY
        </button>
      </Link>
      <Link to={{ pathname: "/search", state: { searchType: "country" } }}>
        <button type="button" className="start-button">
          SEARCH BY COUNTRY
        </button>
      </Link>
    </div>
  );
};

export default StartView;
