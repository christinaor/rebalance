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
import UpdateRecord from './UpdateRecord.jsx';

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
    // toUpdate, 
    // setToUpdate, 
    // actionsValue, 
    // setActionsValue,
    inEditMode,
    setInEditMode,
    inDeleteMode,
    setInDeleteMode,
    clickedRecordToEdit,
    setClickedRecordToEdit,
    currentCounterparty,
    setCurrentCounterparty
  } = props;

  // useEffect(() => {
  //   console.log('populatedRecords in record: ', populatedRecords)
  // }, [populatedRecords])

  // delete a record clicked based on its id
  const deleteRecord = (e) => {
    console.log('deleteRecord fired');
    fetch('api/records/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })
      .catch(err => `Error deleting record: ${err}`)
      .finally(() => {
        console.log('deleted record')
        setPopulatedRecords(false);
      })
  };

  const editOrDeleteRecord = (e) => {
    if (inDeleteMode) deleteRecord(e);
    // For update, set updateRecord when record has been clicked
    if (inEditMode && !clickedRecordToEdit) {
      setUpdatedRecord({
        id: id,
        item: itemName,
        cost: cost,
        perc: userPercent
      });
      // Opens edit form when clickedRecordToEdit is set to true
      setClickedRecordToEdit(true);
    // Reset updateRecord if the same or different record is clicked
    } else if (inEditMode && clickedRecordToEdit) {
      // If the id is different than the id in updatedRecord, then a different record was clicked, so updatedRecord should reflect info from this clicked record
      if (updatedRecord.id !== id) {
        console.log('in the if statement comparing ids')
        setUpdatedRecord({
          id: id,
          item: itemName,
          cost: cost,
          perc: userPercent
        });
        setClickedRecordToEdit(true);
      // If id is the same, the record already has clicekdRecordToEdit set to true, so clicking the same record should set it to false and reset updatedRecord
      } else {
        setUpdatedRecord({
          id: null,
          item: null,
          cost: null,
          perc: null
        });
        // Closes edit form for same record clicked when clickedRecordToEdit is set to false
        setClickedRecordToEdit(false);
      }
    }
  }

  // Parse out date to be human-readable
  const recordDate = new Date(inputDate);
  const yyyy = recordDate.getFullYear();
  let mm = recordDate.getMonth() + 1; // month starts at 0;
  let dd = recordDate.getDate();

  dd = (dd < 10) ? '0' + dd : dd;
  mm = (mm < 10) ? '0' + mm : mm;


  // Calculate counterpartySplit using cost and userPercent
  const counterpartySplit = (cost - (cost * userPercent / 100)).toFixed(2);
  const formattedUserPercent = (parseInt(userPercent)).toString() + '%'


  return (
    <div className='records-pending-update'>
      <div 
        className={`grid-record center ${inEditMode ? `record-edit-hover` : `record-edit`} ${inDeleteMode ? `record-delete-hover` : `record-delete`}`}
        onClick={editOrDeleteRecord}
      >
        <div>{id}</div>
        <div>{counterpartyName}</div>
        <div>{`${mm}/${dd}/${yyyy}`}</div>
        <div>{itemName}</div>
        <div>{cost}</div>
        <div>{userSplit}</div>
        <div>{counterpartySplit}</div>
        <div>{formattedUserPercent}</div>
        <div></div>
      </div>
      {inEditMode && clickedRecordToEdit && (updatedRecord.id === id) &&
        <UpdateRecord 
          id={id}
          counterpartyName={counterpartyName}
          dateEntered={`${mm}/${dd}/${yyyy}`}
          itemName={itemName}
          cost={cost}
          userSplit={userSplit}
          counterpartySplit={counterpartySplit}
          userPercent={userPercent}
          currentCounterparty={currentCounterparty}
          setCurrentCounterparty={setCurrentCounterparty}
          updatedRecord={updatedRecord}
          setUpdatedRecord={setUpdatedRecord}
          clickedRecordToEdit={clickedRecordToEdit}
          setClickedRecordToEdit={setClickedRecordToEdit}
          populatedRecords={populatedRecords}
          setPopulatedRecords={setPopulatedRecords}
        />
        }
    </div>
  )
};

export default Record;