# CityPop
This is an assessment work ordered by We Know IT student consulting. The app uses the [Geonames API](https://www.geonames.org/export/web-services.html) to display population numbers for cities. 

The app is divided into 4 views:
- **Start view**: Presents a choice between city search and country search.

- **Search view**: As the country search and city search are very similar to the viewer, I made them the same view, with a prop "searchType" controlling which type of search. A successful search navigates to "country view" or "city view" respectively, with the respective geonames-ID as url-parameter. An unsuccessful search presents an error message.

I chose not to put a loading message when checking if the city/country exist, but only on successful searches when the next view is loaded. This might break a requirement, but can be easily amended. 

- **Country view**: Loads a country based on a geonames-ID from the url. Presents a clickable list of the country's three largest cities. A loading text is shown during the API call. 

- **City view**: Loads a city based on a geonames-ID from the url. Presents the city name and the population. A loading text is shown during the API call. 

Navigation between views is done using [react-router-dom](https://reactrouter.com/web/guides/quick-start). 

# Environment setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Install node.js
https://nodejs.org/en/

### Clone the git repo
`git clone https://github.com/ytterdorr/CityPop.git`
### install dependencies
Navigate into the cloned repository and run the command 
#### `npm install` 
which should install all the required packages. 

#
the following instructions are the default instructions from `create-react-app`.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

