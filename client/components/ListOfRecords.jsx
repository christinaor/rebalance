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


const ListOfRecords = props => {
  const {
    recordsList,
    setRecordsList,
    populatedRecords,
    setPopulatedRecords,
    updatedRecord,
    setUpdatedRecord,
    toUpdate,
    setToUpdate
  } = props;
  const [actionsValue, setActionsValue] = useState('Select')

  const recordElements = recordsList.map(record => {
    const { id, input_date, username, item_name, item_cost } = record;
    return (
      <Record 
        key={`record${id}`}
        id={id}
        input_date={input_date}
        username={username}
        item_name={item_name}
        cost={item_cost}
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

  return (
    <div className="records-container">
      <h2>List of Records:</h2>
      <div className="records-grid-container">
        <div className="record-list-titles grid-record">
          <span>Record No.</span>
          <span>Date Entered</span>
          <span>Item</span>
          <span>Cost</span>
          <span>Other Actions</span>
        </div>
        {recordElements}
      </div>
      <br />
    </div>
  )
};

export default ListOfRecords;
