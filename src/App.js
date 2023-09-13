import './App.css';
import React, { Fragment, useEffect, useState } from 'react';

import { CssBaseline, Grid, Button } from '@material-ui/core';

import Header from './components/Header/header.component';
import List from './components/List/list.component';
import Map from './components/Map/map.component';

import { getPlacesData, getWeatherData } from './services';

function App() {
  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState();
  const [childClicked, setChildClicked] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  // Step 1: Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Step 2: Define Dark Mode Styles
  const darkModeStyles = {
    backgroundColor: '#000',
    color: '#fff',
    // Add other dark mode styles here
    	body{
		padding:10% 3% 10% 3%;
		text-align:center;
		}
		img{
			height:140px;
				width:140px;
		}
		h1{
		color: #32a852;
		}
		.mode {
			float:right;
		}
		.change {
			cursor: pointer;
			border: 1px solid #555;
			border-radius: 40%;
			width: 20px;
			text-align: center;
			padding: 5px;
			margin-left: 8px;
		}
		.dark{
			background-color: #222;
			color: #e6e6e6;
		}
  };

  // Step 3: Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);

    // Step 4: Toggle "dark" class on body element
    const body = document.body;
    if (body.classList.contains('dark')) {
      body.classList.remove('dark');
    } else {
      body.classList.add('dark');
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      },
      (error) => {
        alert(
          'Please turn on your location access and refresh the page to continue.'
        );
      }
    );
  }, []);

  useEffect(() => {
    if (bounds?.sw && bounds?.ne) {
      setIsLoading(true);
      getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
        setWeatherData(data)
      );
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setIsLoading(false);
      });
    }
  }, [type, bounds]);

  useEffect(() => {
    const filteredPlaces = places?.filter((place) => place.rating > rating);

    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  return (
    <Fragment>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />

      {/* Step 4: Dark Mode Button */}
      <Button onClick={toggleDarkMode}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </Button>

      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            
            // Step 4: Apply Dark Mode Styles
            style={isDarkMode ? darkModeStyles : {}}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
            
            // Step 4: Apply Dark Mode Styles
            style={isDarkMode ? darkModeStyles : {}}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default App;
