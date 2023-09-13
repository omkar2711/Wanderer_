import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './header.styles';
import https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js"

const Header = ({ setCoordinates }) => {
  const classes = useStyles();

  const [autocomplete, setAutocomplete] = useState();

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry?.location.lat();
    const lng = autocomplete.getPlace().geometry?.location.lng();

    setCoordinates({ lat, lng });
  };

  return (
    <AppBar position='static'>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h5' className={classes.title}>
          Travel Mate
        </Typography>

        <Box display='flex'>
          <Typography variant='h6' className={classes.title}>
            Explore new places
          </Typography>
          	<div class="mode">
		Dark mode:			
		<span class="change">OFF</span>
	</div>

	
		{
		$( ".change" ).on("click", function() {
			if( $( "body" ).hasClass( "dark" )) {
				$( "body" ).removeClass( "dark" );
				$( ".change" ).text( "OFF" );
			} else {
				$( "body" ).addClass( "dark" );
				$( ".change" ).text( "ON" );
			}
		});
		}

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
