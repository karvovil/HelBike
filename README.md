# Helsinki City Bike App
UI and a backend service for displaying data from journeys made with city bikes in the Helsinki Capital area.
Described in detail at https://github.com/solita/dev-academy-2023-exercise

Deployed at https://hel-bike.fly.dev/

[Tuntikirjanpito](tunnit.md)


If you want to run this locally you need to download these csv files to /server/files
* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv>
* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv>
* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv> 

When you launch the backend first time (`npm run dev`) data is parsed to a local sqlite database.

REACT_APP_MAPS_API_KEY environment variable needs to be provided with google maps api key with access to static maps.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Needs node and sqlite to run. What else?
## Available Scripts

#### `npm run dev`
Runs the backend in the development mode
#### `npm run build`
Compiles the backend for production to the build folder
### `npm run start`
Starts the compiled app from /build
#### `npm run test`
Runs backend tests
#### `npm run build:ui`
Builds the react app from /client and moves it to build folder in /server 
#### `npm run deploy`
Deploys the app in fly.io
#### `npm run lint`
Runs eslint

### In the **client** directory, you can run the usual cra stuff:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


