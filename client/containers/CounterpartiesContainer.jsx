/**
 * ************************************
 *
 * @module  CounterpartiesContainer
 * @author
 * @date
 * @description stateless container that renders Counterparty components
 *
 * ************************************
 */

import React, { useEffect, useState } from "react";
import { 
  Paper, 
  Drawer, 
  Button, 
  Box, 
  Typography, 
  IconButton,
  List,
  ListItem,
  ListItemText
 } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

const CounterpartiesContainer = props => {
  const {
    counterpartiesList,
    setCounterpartiesList,
    populatedCounterparties,
    setPopulatedCounterparties,
    currentCounterparty,
    setCurrentCounterparty
  } = props;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch('/api/counterparties', {
      signal: signal
    })
      .then(response => response.json())
      .then(data => {
        // console.log('cp data here: ', data);
        setCounterpartiesList(data);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return 'Successfully aborted!';
        } else return `Error getting records: ${err}`
      })
      .finally(setPopulatedCounterparties(false))

    // return () => {
    //   second
    // }
  }, [populatedCounterparties])


  // const [cpDrawerButtonClicked, setCpDrawerButtonClicked] = useState(false);

  // const toggleDrawer = (anchor, open) => (event) => {
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return;
  //   }
  //   setCpDrawerButtonClicked(open)
  // };

  const counterpartySideElements = counterpartiesList.map(counterpartyInfo => (
    <div 
      key={`cp${counterpartyInfo.id}`}
      className="cp-hover"
      onClick={() => setCurrentCounterparty(counterpartyInfo.counterparty_name)}
    >
      {counterpartyInfo.counterparty_name}
    </div>

  ))
  
    const [isCpDrawerOpen, setIsCpDrawerOpen] = useState(false);

  return (
    <>
      <IconButton 
        size="large"
        edge="start"
        color="inherit"
        aria-label="logo"
        onClick={() => setIsCpDrawerOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer 
        anchor="right"
        open={isCpDrawerOpen}
        onClose={() => setIsCpDrawerOpen(false)}
        className="left-counterparties">
          <Typography variant="h6" component="div">
            Select a Counterparty
          </Typography>
          <List>
          {['All Parties', ...counterpartiesList].map(counterpartyInfo => {
              if (counterpartyInfo !== 'All Parties') {
                return (
                  <ListItem 
                    button
                    key={`cp${counterpartyInfo.id}`}
                    className="cp-hover"
                    onClick={() => setCurrentCounterparty(counterpartyInfo.counterparty_name)}
                  >
                    <ListItemText primary={counterpartyInfo.counterparty_name} />
                  </ListItem>                  
                )
              } else {
                return (
                  <ListItem
                    button
                    key={`cpdefault`}
                    className="cp-hover"
                    onClick={() => setCurrentCounterparty('All Parties')}
                  >
                    <ListItemText primary="All Parties" />
                  </ListItem>                  
                )
              }
            })}
          </List>

          {/* <Box p={2} width="250px" textAlign="center" role="presentation">
            <Typography variant="h6" component="div">
              Side Panel
            </Typography>

          </Box> */}
        {/* <h2>Counterparty</h2>
        <div 
          key={`cp0}`}
          className="cp-hover"
          onClick={() => setCurrentCounterparty('All Parties')}>All Parties</div> */}
        {/* {counterpartySideElements} */}
      </Drawer>      
    </>

  )
}

export default CounterpartiesContainer;
 