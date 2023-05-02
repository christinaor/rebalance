/**
 * ************************************
 *
 * @module  
 * @author
 * @date
 * @description Component holding state consisting of records list and conditional rendering
 *
 * ************************************
 */

import React, { useEffect, useState } from "react";
// import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
import { Button, ButtonGroup, Paper, FormControl, Select } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import AddRecord from "../AddRecord/AddRecord.jsx";
import UpdateRecord from "../UpdateRecord/UpdateRecord.jsx";
import CounterpartyFilter from '../CounterpartyFilter/CounterpartyFilter.jsx';

import styles from './styles.module.scss';
 
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
    recordToUpdate,
    setRecordToUpdate,
    clickedRecordToEdit,
    setClickedRecordToEdit,
    recordsList,
    setRecordsList,
    populatedRecords,
    setPopulatedRecords,
    currentCounterparty,
    setCurrentCounterparty,
    editId,
    setEditId,
    counterpartiesList,
    setCounterpartiesList,
    populatedCounterparties,
    setPopulatedCounterparties
  } = props;

  // console.log('checking recordToUpdate: ', recordToUpdate)
  // // Options for sorting records on left
  // const sortOptions = [
  //   { value: 'Counterparty', label: 'Counterparty'},
  //   { value: 'Date', label: 'Date'},
  //   { value: 'Cost', label: 'Cost'},
  //   { value: 'User Split', label: 'User Split'},
  //   { value: 'Counterparty Split', label: 'Counterparty Split'},
  //   { value: 'User Percentage', label: 'User Percentage'}
  // ];

  // const animatedComponents = makeAnimated();

  // const AnimatedMultiFilter = () => {
  //   return (
  //     <Select
  //       closeMenuOnSelect={false}
  //       components={animatedComponents}
  //       isMulti
  //       options={sortOptions}
  //     />
  //   )
  // };

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
      setRecordToUpdate({
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
    <div className={styles.alterRecordsWrapper}>
      <div className={styles.alterSection}>
        <CounterpartyFilter 
          counterpartiesList={counterpartiesList}
          setCounterpartiesList={setCounterpartiesList}
          populatedCounterparties={populatedCounterparties}
          setPopulatedCounterparties={setPopulatedCounterparties}
          currentCounterparty={currentCounterparty}
          setCurrentCounterparty={setCurrentCounterparty}
           
        />

        {allButtonsVisible && (
          <ButtonGroup className="record-buttons" variant="text" aria-label="text button group" size="medium" color="inherit">
            <Button onClick={clickedInitialAdd}>
              <AddIcon />
            </Button>
            <Button onClick={clickedInitialEdit}>
              <EditIcon />
            </Button>
            <Button onClick={clickedInitialDelete}>
              <DeleteIcon />
            </Button>
            <Button>
              <DownloadIcon />
            </Button>
          </ButtonGroup>
        )}
      </div>
    <Paper elevation={0} square className={styles.addRecordWrapper}>
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
    <div className={styles.inDeleteMode}>
    {inDeleteMode && 
      <Paper elevation={0} className="padding-tb-20px" square>Select a record below to delete...</Paper>
    }
    {!allButtonsVisible && inDeleteMode &&
    <Button variant="contained" size="small" onClick={cancelDelete}>Cancel Delete</Button>
    }
    </div>
    <div className={styles.inEditMode}>
    {inEditMode &&
      <Paper elevation={0} className="padding-tb-20px" square>Select a record below to edit...</Paper>
    }
    {!allButtonsVisible && inEditMode &&
    <Button variant="contained" size="small" onClick={cancelEdit}>Cancel Edit</Button>
    }      
    </div>

    {inEditMode && clickedRecordToEdit && (recordToUpdate.id === editId) &&
    <UpdateRecord 
      currentCounterparty={currentCounterparty}
      setCurrentCounterparty={setCurrentCounterparty}
      recordToUpdate={recordToUpdate}
      setRecordToUpdate={setRecordToUpdate}
      clickedRecordToEdit={clickedRecordToEdit}
      setClickedRecordToEdit={setClickedRecordToEdit}
      populatedRecords={populatedRecords}
      setPopulatedRecords={setPopulatedRecords}
      editId={editId}
      setEditId={setEditId}
    />
    }
  </div>
  )
};

export default AlterRecordsComponent;