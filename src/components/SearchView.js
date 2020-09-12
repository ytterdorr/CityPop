import React from "react";
import { useParams } from "react-router-dom";

const SearchView = (props) => {
  const { searchType } = props.location.state;
  return <div>Search by {searchType}</div>;
};

export default SearchView;
