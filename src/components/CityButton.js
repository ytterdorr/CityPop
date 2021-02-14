import React from "react";
import { Link } from "react-router-dom";

const CityButton = ({ name, id }) => {
    return <Link to={`/cityPop?city=${name}`} key={id}>
        <button type="button" className="city-button bordered-button">
            {name}
        </button>
    </Link>
}

export default CityButton;