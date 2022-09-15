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
    setCurrentCounterparty
  } = props;

  const [actionsValue, setActionsValue] = useState('Select')

  // create array of records to render later
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

  const checkedCounterparty = currentCounterparty ? currentCounterparty : 'All Parties';

  return (
    <div className="records-container">
      <h2>List of Records between You and {checkedCounterparty}:</h2>
      <div className="add-record-wrapper">
        <h4 className="add-record-title">Add Record:</h4>
        <AddRecord 
          recordsList={recordsList}
          setRecordsList={setRecordsList}
          populatedRecords={populatedRecords}
          setPopulatedRecords={setPopulatedRecords}
          currentCounterparty={currentCounterparty}
          setCurrentCounterparty={setCurrentCounterparty}
        />        
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
