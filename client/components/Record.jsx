/**
 * ************************************
 *
 * @module  Record
 * @author
 * @date
 * @description Functional component conditionally renders other components in ListOfRecords through state changes
 *
 * ************************************
 */

import React, { useEffect, useState } from 'react'

const Record = (props) => {
  const { 
    id, 
    input_date, 
    username, 
    item_name, 
    cost, 
    populatedRecords, 
    setPopulatedRecords, 
    updatedRecord, 
    setUpdatedRecord, 
    toUpdate, 
    setToUpdate, 
    actionsValue, 
    setActionsValue 
  } = props;

  const actionOptions = [
    { label: 'Select', value: 'Select' },
    { label: 'Update', value: 'Update' },
    { label: 'Delete', value: 'Delete' },
  ];

/*
If "Update" is selected, get the data for selected record first and update updatedRecord for later when form is filled out.

If "Delete" is selected, simply delete specified record.
*/
const handleChange = (e) => {
    if (e.target.value === 'Update') {
      // fetch a single record with corresponding id to fill in updatedRecord
      fetch(`api/records/${id}`)
        .then(response => response.json())
        .then(data => {
          console.log('getting one record: ', data)
          setUpdatedRecord({id: data[0].id, item: data[0].item_name, cost: data[0].item_cost})
        })
        .catch(err => `Error getting record to update: ${err}`)
    setToUpdate(true);
    }
    if (e.target.value === 'Delete') {
      deleteRecord(e);
    }
  };

  const deleteRecord = (e) => {
    console.log('deleteRecord fired');
    fetch('api/records/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
      .catch(err => `Error deleting record: ${err}`)
      .finally(() => {
        console.log('deleted record')
        setPopulatedRecords(false);
      })
  };

  return (
    <div className="record grid-record">
      <div>{id}</div>
      <div>{input_date}</div>
      <div>{item_name}</div>
      <div>{cost}</div>
      <div>
        <select value={actionsValue} onChange={handleChange}>
          {actionOptions.map(option => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
};

export default Record;