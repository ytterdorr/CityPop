import React, { useEffect, useState } from "react";
import DescriptionLine from "../components/DescriptionLine";

const CountryView = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [countryName, setCountryName] = useState("");
    const [cities, setCities] = useState([]);


    const getUrlCountry = () => {
        let urlQuery = window.location.search;
        let params = new URLSearchParams(urlQuery);
        let countryName = params.get("country");
        console.log("Got country:", countryName);
        return countryName
    }

    const getCountryCodeFromName = async (countryName) => {
        let query = `http://api.geonames.org/searchJSON?name=${countryName}&featureCode=PCLI&maxRows=10&username=ytterdorr`;
        let countryCode = ""
        await fetch(query)
            .then((result) => result.json())
            .then((data) => {
                // Check if we got result
                console.log(data);
                if (data.geonames.length > 0) {
                    let country = data.geonames[0]
                    console.log(country.countryCode);
                    countryCode = country.countryCode;
                } else { // Error getting the country
                    setError(`No country found, ${countryName}`)
                }
            })
        return countryCode;
    }

    const getCitiesFromCountryCode = async (countryCode) => {
        let query = `http://api.geonames.org/searchJSON?country=${countryCode}&featureClass=P&city=cities15000&maxRows=3&username=ytterdorr`;
        let cities = [];
        await fetch(query)
            .then((result) => result.json())
            .then((data) => {
                // Check if we got result
                console.log(data);
                if (data.geonames.length > 0) {
                    cities = data.geonames;
                } else { // Error getting the city
                    setError(`No cities found, ${countryCode}`)
                }
            })
        return cities
    }

    const generateCitiesList = async () => {
        let gotName = getUrlCountry()
        setCountryName(gotName);
        let countryCode = await getCountryCodeFromName(gotName);
        console.log("Country code: ", countryCode)
        let cities = await getCitiesFromCountryCode(countryCode);

        console.log(cities);
        setCities(cities)
        setLoading(false);
    }

    useEffect(() => {

        generateCitiesList();
    }, []);


    return (
        <div className="centered-column">

            { loading ? <DescriptionLine text="Loading..." /> :
                <>
                    <DescriptionLine text={countryName} />
                    <div className="citylist-container">
                        {cities.map(city => {
                            return <p>{city.name}</p>
                        })}
                    </div>
                </>
            }
            { error ? <p className="error">{error}</p> : null}
        </div>
    )
}


export default CountryView;