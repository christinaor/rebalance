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
  const [addRecordButtonVisible, setAddRecordButtonVisible] = useState(true);
  const [editButtonVisible, setEditButtonVisible] = useState(true);
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(true);
  const [actionsValue, setActionsValue] = useState('Select')

  // useEffect(() => {
  //   console.log('useeffect for sort ran')
  // }, [recordsList]);

  const sortByCounterparty = async () => {
    if (!sortedRecords) {
      console.log('sorting records: ', recordsList)
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

  // Set counterparties to All Parties if none selected
  const checkedCounterparty = currentCounterparty ? currentCounterparty : 'All Parties';


  const clickedInitialAdd = () => {
    setAddRecordButtonVisible(!addRecordButtonVisible);
    setToggleAddRecordForm(!toggleAddRecordForm);
  }

  return (
    <div className="records-container">
      <h2>List of Records with {checkedCounterparty}:</h2>
      <div className="add-or-update-wrapper">
        <div className="record-filters">
          Sort by:
          <button onClick={sortByCounterparty}>Counterparty</button>
          <button>Date</button>
          <button>Cost</button>
          <button>User Split</button>
          <button>Counterparty Split</button>
          <button>User Percentage</button>
        </div>
        <div className="record-buttons">
          Make a change:
          {addRecordButtonVisible &&
          <button onClick={clickedInitialAdd}>Add</button>
          }
          {editButtonVisible &&
            <button>Edit</button>
          }
          {deleteButtonVisible &&
            <button>Delete</button>
          }
        </div>
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
            addRecordButtonVisible={addRecordButtonVisible}
            setAddRecordButtonVisible={setAddRecordButtonVisible}
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
