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
    counterpartyName,
    inputDate,
    itemName, 
    cost, 
    userSplit,
    userPercent,
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
      console.log('finding id in records.jsx: ',id)
      fetch(`api/records/${id}`)
        .then(response => response.json())
        .then(data => {
          console.log('getting one record: ', data)
          setUpdatedRecord({
            id: data[0].id,
            item: data[0].item_name, 
            cost: data[0].item_cost,
            perc: data[0].user_perc
          })
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

  /*
  Parse out date to be human-readable.
  */
  const recordDate = new Date(inputDate);
  const yyyy = recordDate.getFullYear();
  let mm = recordDate.getMonth() + 1; // month starts at 0;
  let dd = recordDate.getDate();

  dd = (dd < 10) ? '0' + dd : dd;
  mm = (mm < 10) ? '0' + mm : mm;

  /**
   * Calculate counterpartySplit using cost and userPercent
   */
  const counterpartySplit = (cost - (cost * userPercent / 100)).toFixed(2);
  const formattedUserPercent = (parseInt(userPercent)).toString() + '%'


  return (
    <div className="record grid-record">
      <div>{id}</div>
      <div>{counterpartyName}</div>
      <div>{`${mm}/${dd}/${yyyy}`}</div>
      <div>{itemName}</div>
      <div>{cost}</div>
      <div>{userSplit}</div>
      <div>{counterpartySplit}</div>
      <div>{formattedUserPercent}</div>
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