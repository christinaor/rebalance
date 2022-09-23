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
import { DataGrid } from '@mui/x-data-grid';
import Record from "./Record.jsx";
import AddRecord from "./AddRecord.jsx";
 
const AlterRecordsComponent = props => {
  const {
    allButtonsVisible,
    setAllButtonsVisible,
    toggleAddRecordForm,
    setToggleAddRecordForm,
    inEditMode,
    setInEditMode,
    inDeleteMode,
    setInDeleteMode,
    updatedRecord,
    setUpdatedRecord,
    clickedRecordToEdit,
    setClickedRecordToEdit,
    recordsList,
    setRecordsList,
    populatedRecords,
    setPopulatedRecords,
    currentCounterparty,
    setCurrentCounterparty
  } = props;

  // Options for sorting records on left
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

    // Set button visibilities based on whether one is clicked for add/edit/delete options on right
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
    <div className="alter-records-wrapper">
      <div className="initially-visible-alter-actions">
      <div className="records-sort-by">
        <span>Sort by</span>
        {AnimatedMultiFilter()}
      </div>
      {allButtonsVisible && (
      <div className="record-buttons align-items-center">
        <ButtonGroup variant="text" aria-label="text button group" size="medium">
          <Button onClick={clickedInitialAdd}>Add</Button>
          <Button onClick={clickedInitialEdit}>Edit</Button>
          <Button onClick={clickedInitialDelete}>Delete</Button>
        </ButtonGroup>
      </div>
      )}
      </div>
      {!allButtonsVisible && inEditMode &&
      <Button variant="contained" size="small" onClick={cancelEdit}>Cancel Edit</Button>
      }
      {!allButtonsVisible && inDeleteMode &&
      <Button onClick={cancelDelete}>Cancel Delete</Button>
      }
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
  </div>
  )
};

export default AlterRecordsComponent;