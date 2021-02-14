import React, { useEffect, useState } from "react";
import CityButton from "../components/CityButton";
import DescriptionLine from "../components/DescriptionLine";

const CountryView = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [countryName, setCountryName] = useState("");
    const [cities, setCities] = useState([]);


    const getUrlCountry = () => {
        let urlQuery = window.location.search;
        let params = new URLSearchParams(urlQuery);
        let countryId = params.get("country");
        return countryId
    }

    const getCitiesFromCountryCode = async (countryCode) => {
        let query = `http://api.geonames.org/searchJSON?country=${countryCode}&featureClass=P&city=cities15000&maxRows=3&username=ytterdorr`;
        let cityList = [];
        await fetch(query)
            .then((result) => result.json())
            .then((data) => {
                // Check if we got result
                if (data.geonames.length > 0) {
                    cityList = data.geonames;
                } else { // Error getting the city
                    setError(`No cities found, ${countryCode}`)
                }
            })
        return cityList
    }

    const getItemByGeoId = async (geoId) => {
        let query = `http://api.geonames.org/getJSON?geonameId=${geoId}&username=ytterdorr&style=short`;
        let data;
        await fetch(query)
            .then((result) => result.json())
            .then((result) => { data = result });
        return data;
    }

    const getCitiesFromGeoId = async () => {
        let countryId = getUrlCountry();
        let countryData = await getItemByGeoId(countryId);
        let cityList = await getCitiesFromCountryCode(countryData.countryCode);
        setCountryName(countryData.name);
        setCities(cityList);
        setLoading(false);

    }

    useEffect(() => {
        getCitiesFromGeoId();
    }, []);


    return (
        <div className="centered-column">
            { loading ? <DescriptionLine text="Loading..." /> :
                <>
                    <DescriptionLine text={countryName} />
                    <div className="citylist-container centered-column">
                        {cities.map(city => {
                            return <CityButton name={city.name} id={city.geonameId} key={city.geonameId} />
                        })}
                    </div>
                </>
            }
            { error ? <p className="error">{error}</p> : null}
        </div>
    )
}

export default CountryView;