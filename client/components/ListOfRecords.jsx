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
    toUpdate,
    setToUpdate,
    currentCounterparty,
    setCurrentCounterparty,
    sortedRecords,
    setSortedRecords
  } = props;

  const [toggleAddRecordForm, setToggleAddRecordForm] = useState(false);
  const [inEditMode, setInEditMode] = useState(false);
  const [inDeleteMode, setInDeleteMode] = useState(false);
  const [allButtonsVisible, setAllButtonsVisible] = useState(true);
  const [actionsValue, setActionsValue] = useState('Select')

  useEffect(() => {
    if (currentCounterparty !== 'All Parties') setSortedRecords(false);
  }, [currentCounterparty]);

  const sortByCounterparty = async () => {
    if (!sortedRecords && currentCounterparty === 'All Parties') {
      await setRecordsList(recordsList.sort((a, b) => a.counterparty_username.localeCompare(b.counterparty_username)));
      setSortedRecords(true);
      console.log('done sorting:')
    } else {
      setSortedRecords(false);
    }
  };

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
        toUpdate={toUpdate}
        setToUpdate={setToUpdate}
        actionsValue={actionsValue}
        setActionsValue={setActionsValue}
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
    <div className="records-container">
      <h2>Records with {currentCounterparty}:</h2>
      <div className="add-or-update-wrapper">
        <div className="record-filters">
          Sort by:
          {(currentCounterparty === 'All Parties') && <button onClick={sortByCounterparty}>Counterparty</button>}
          <button>Date</button>
          <button>Cost</button>
          <button>User Split</button>
          <button>Counterparty Split</button>
          <button>User Percentage</button>
        </div>
        {allButtonsVisible && (
        <div className="record-buttons">
          <span>Make a change:</span>
            <button onClick={clickedInitialAdd}>Add</button>
            <button onClick={clickedInitialEdit}>Edit</button>
            <button onClick={clickedInitialDelete}>Delete</button>
        </div>
        )}
        {!allButtonsVisible && toggleAddRecordForm &&
        <button onClick={cancelAdd}>Cancel Add</button>
        }
        {!allButtonsVisible && inEditMode &&
        <button onClick={cancelEdit}>Cancel Edit</button>
        }
        {!allButtonsVisible && inDeleteMode &&
        <button onClick={cancelDelete}>Cancel Delete</button>
        }
      </div>
      <div className="add-record-wrapper">   
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
          />
        }
        </div>
      <div className="records-grid-container">
        <div className="center grid-record">
          <span>Record No.</span>
          <span>Counterparty</span>
          <span>Date Entered</span>
          <span>Item</span>
          <span>Cost</span>
          <span>User Split</span>
          <span>Counterparty Split</span>
          <span>User Percentage</span>
          <span>Other Actions</span>
        </div>
        {recordElements}
      </div>
      <br />
    </div>
  )
};

export default ListOfRecords;
