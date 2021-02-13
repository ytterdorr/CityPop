import React from "react";

const DescriptionLine = ({ text }) => {
    return <div className="description">{`${text.toUpperCase()}`}</div>
}

export default DescriptionLine;