/**
 * ************************************
 *
 * @module  ListOfRecords
 * @author
 * @date
 * @description Component holding state consisting of records list and conditional rendering
 *
 * ************************************
 */

import React, { useEffect, useState } from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Button, ButtonGroup, Paper } from '@mui/material';
import Record from "./Record.jsx";
import AddRecord from "./AddRecord.jsx";

const ListOfRecords = props => {
  const {
    recordsList,
    setRecordsList,
    populatedRecords,
    setPopulatedRecords,
    updatedRecord,
    setUpdatedRecord,
    currentCounterparty,
    setCurrentCounterparty,
    sortedRecords,
    setSortedRecords
  } = props;

  const [toggleAddRecordForm, setToggleAddRecordForm] = useState(false);
  const [inEditMode, setInEditMode] = useState(false);
  const [clickedRecordToEdit, setClickedRecordToEdit] = useState(false);
  const [inDeleteMode, setInDeleteMode] = useState(false);
  const [allButtonsVisible, setAllButtonsVisible] = useState(true);
  const [actionsValue, setActionsValue] = useState('Select')

  useEffect(() => {
    console.log('in listofrecords useeffect: ', populatedRecords)
    if (currentCounterparty !== 'All Parties') setSortedRecords(false);
  }, [currentCounterparty]);

  const sortOptions = [
    { value: 'Counterparty', label: 'Counterparty'},
    { value: 'Date', label: 'Date'},
    { value: 'Cost', label: 'Cost'},
    { value: 'User Split', label: 'User Split'},
    { value: 'Counterparty Split', label: 'Counterparty Split'},
    { value: 'User Percentage', label: 'User Percentage'}
  ];

  const animatedComponents = makeAnimated();

  const AnimatedMultiFilter = () => {
    return (
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={sortOptions}
      />
    )
  };

  // const sortByCounterparty = async () => {
  //   if (!sortedRecords && currentCounterparty === 'All Parties') {
  //     await setRecordsList(recordsList.sort((a, b) => a.counterparty_username.localeCompare(b.counterparty_username)));
  //     setSortedRecords(true);
  //     console.log('done sorting:')
  //   } else {
  //     setSortedRecords(false);
  //   }
  // };

  // Create array of records to render later
  const recordElements = recordsList.map(record => {
    const { id, counterparty_username, input_date, item_name, item_cost, user_split, user_perc } = record;
    return (
      <Record 
        key={`record${id}`}
        id={id}
        counterpartyName={counterparty_username}
        inputDate={input_date}
        itemName={item_name}
        cost={item_cost}
        userSplit={user_split}
        userPercent={user_perc}
        populatedRecords={populatedRecords}
        setPopulatedRecords={setPopulatedRecords}
        updatedRecord={updatedRecord}
        setUpdatedRecord={setUpdatedRecord}
        allButtonsVisible={allButtonsVisible}
        setAllButtonsVisible={setAllButtonsVisible}
        inEditMode={inEditMode}
        setInEditMode={setInEditMode}
        inDeleteMode={inDeleteMode}
        setInDeleteMode={setInDeleteMode}
        clickedRecordToEdit={clickedRecordToEdit}
        setClickedRecordToEdit={setClickedRecordToEdit}
        currentCounterparty={currentCounterparty}
        setCurrentCounterparty={setCurrentCounterparty}
      />
    )
  });

  // Set button visibilities based on whether one is clicked
  const clickedInitialAdd = () => {
    setToggleAddRecordForm(true);
    setAllButtonsVisible(false);
  };
  const cancelAdd = () => {
    setToggleAddRecordForm(false);
    setAllButtonsVisible(true);
  };
  const clickedInitialEdit = () => {
    setInEditMode(true);
    setAllButtonsVisible(false);
  };
  const cancelEdit = () => {
    setInEditMode(false);
    setAllButtonsVisible(true);
    // set update object state to null
    setUpdatedRecord({
      id: null,
      item: null,
      cost: null,
      perc: null
    });
    setClickedRecordToEdit(false);
  }
  const clickedInitialDelete = () => {
    setInDeleteMode(true);    
    setAllButtonsVisible(false);
  }
  const cancelDelete = () => {
    setInDeleteMode(false);
    setAllButtonsVisible(true);
  }

  return (
    <Paper elevation={3} className="records-container">
      <h2 className="records-title">Records with {currentCounterparty}</h2>
      <Paper className="alter-records-wrapper align-items-center"
        elevation={0}
        square>
        <div className="record-filters align-items-center">
          <span>Sort by</span>
          {AnimatedMultiFilter()}
        </div>
        {/* <div className="record-filters">
          Sort by:
          {(currentCounterparty === 'All Parties') && <button onClick={sortByCounterparty}>Counterparty</button>}
          <button>Date</button>
          <button>Cost</button>
          <button>User Split</button>
          <button>Counterparty Split</button>
          <button>User Percentage</button>
        </div> */}
        {allButtonsVisible && (
        <div className="record-buttons align-items-center">
          <ButtonGroup variant="text" aria-label="text button group" size="medium">
            <Button onClick={clickedInitialAdd}>Add</Button>
            <Button onClick={clickedInitialEdit}>Edit</Button>
            <Button onClick={clickedInitialDelete}>Delete</Button>
          </ButtonGroup>
        </div>
        )}
        {!allButtonsVisible && inEditMode &&
        <Button variant="contained" size="small" onClick={cancelEdit}>Cancel Edit</Button>
        }
        {!allButtonsVisible && inDeleteMode &&
        <Button onClick={cancelDelete}>Cancel Delete</Button>
        }
      </Paper>
      <Paper elevation={0} square className="add-record-wrapper">
        {toggleAddRecordForm &&
          <AddRecord 
            recordsList={recordsList}
            setRecordsList={setRecordsList}
            populatedRecords={populatedRecords}
            setPopulatedRecords={setPopulatedRecords}
            currentCounterparty={currentCounterparty}
            setCurrentCounterparty={setCurrentCounterparty}
            toggleAddRecordForm={toggleAddRecordForm}
            setToggleAddRecordForm={setToggleAddRecordForm}
            allButtonsVisible={allButtonsVisible}
            setAllButtonsVisible={setAllButtonsVisible}
            cancelAdd={cancelAdd}
          />
        }
      </Paper>
        {inDeleteMode && 
          <Paper elevation={0} className="padding-tb-20px" square>Select a record below to delete...</Paper>
        }
        {inEditMode &&
          <Paper elevation={0} className="padding-tb-20px" square>Select a record below to edit...</Paper>
        }
      <Paper elevation={0} square className="records-grid-container"
      >
        <div className="center grid-record">
          <span>Record No.</span>
          <span>Counterparty</span>
          <span>Date Entered</span>
          <span>Item</span>
          <span>Cost</span>
          <span>User Split</span>
          <span>Counterparty Split</span>
          <span>User Percentage</span>
          <span></span>
        </div>
        {recordElements}
      </Paper>
      <br />
    </Paper>
  )
};

export default ListOfRecords;
