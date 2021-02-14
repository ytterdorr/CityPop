import React, { useEffect, useState } from "react";
import DescriptionLine from "../components/DescriptionLine";
import "../css/searchView.css";

const CityView = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [population, setPopulation] = useState("");
    const [cityName, setCityName] = useState("");

    const getUrlCity = async () => {
        let urlQuery = window.location.search;
        let params = new URLSearchParams(urlQuery);
        let cityId = params.get("city");
        console.log("Got city:", cityId);
        return cityId
    }

    const getCityName = async () => {
        let geoId = await getUrlCity()
        console.log("geoId", geoId)

        let query = `http://api.geonames.org/getJSON?geonameId=${geoId}&username=ytterdorr&style=short`;
        fetch(query)
            .then((result) => result.json())
            .then((data) => {
                // Check if we got result
                console.log("data", data);
                if (data.fcl === "P") { // Got a city
                    // Get population
                    let city = data;
                    console.log(`pop (${city.name}): ${city.population}`)
                    setCityName(city.name);
                    setPopulation(city.population)
                    setLoading(false);
                } else { // Error getting the city
                    setError(`No city found`)
                }
            });
    }

    const numberWithSpaces = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }


    useEffect(() => {



        getCityName();

    }, [])



    return (
        <div className="centered-column">

            { loading ? <DescriptionLine text="Loading..." /> :
                <>
                    <DescriptionLine text={cityName} />
                    <div className="population-display">
                        <p className="small-text">Population</p>
                        <p className="population-number">{numberWithSpaces(population)}</p>
                    </div>
                </>
            }
            { error ? <p className="error">{error}</p> : null}
        </div>)
}

export default CityView;