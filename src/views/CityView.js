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
        let cityName = params.get("city");
        console.log("Got city:", cityName);
        return cityName
    }

    const numberWithSpaces = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }


    useEffect(() => {

        const getCityName = async () => {
            let gotName = await getUrlCity()
            setCityName(gotName);

            let query = `http://api.geonames.org/searchJSON?name_equals=${gotName}&featureClass=P&city=cities15000&maxRows=1&username=ytterdorr`;
            fetch(query)
                .then((result) => result.json())
                .then((data) => {
                    // Check if we got result
                    if (data.geonames.length > 0) {
                        // Get population
                        let population = data.geonames[0].population;
                        console.log(`pop (${gotName}): ${population}`)
                        setPopulation(population)
                        setLoading(false);
                    } else { // Error getting the city
                        setError(`No city found, ${cityName}`)
                    }
                });
        }

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