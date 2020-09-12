import React from "react";
import "./css/reset.css";
import "./css/main.css";

function App() {
  return (
    <div className="App">
      <div class="container">
        <header className="App-header">
          <h1>CityPop</h1>
        </header>
        <main>
          <div className="button-container">
            <button type="button" className="start-button">
              SEARCH BY CITY
            </button>
            <button type="button" className="start-button">
              SEARCH BY COUNTRY
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
