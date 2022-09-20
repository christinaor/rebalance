import React, {useEffect, useState} from "react";
import { Button } from '@mui/material';

const UpdateRecord = (props) => {
  const {
    id,
    counterpartyName,
    dateEntered,
    itemName,
    cost,
    userSplit,
    counterpartySplit,
    userPercent,
    populatedRecords,
    setPopulatedRecords,
    updatedRecord,
    setUpdatedRecord,
    clickedRecordToEdit,
    setClickedRecordToEdit
  } = props;

  const updateRecord = (e) => {
    console.log('updateRecord fired: ', updatedRecord);
    console.log('current populated records is: ', populatedRecords)
    e.preventDefault();
    fetch('api/records/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: updatedRecord.id,
        item_name: updatedRecord.item,
        item_cost: updatedRecord.cost,
        perc_split: updatedRecord.perc
      })
    })
      .then(() => {
        setClickedRecordToEdit(false);
        setUpdatedRecord({
          id: null,
          item: null,
          cost: null,
          perc: null
        })
      })
      .catch(err => `Error updating record: ${err}`)
      .finally(setPopulatedRecords(false))
  };

  const cancelClicked = () => {
    setClickedRecordToEdit(false);
    setUpdatedRecord({
      id: null,
      item: null,
      cost: null,
      perc: null
    }) 
  }

  return (
    <form className="records-put-form grid-record center" action="/api/records" method="PUT">
      <div>{id}</div>
      <div>{counterpartyName}</div>
      <div>{dateEntered}</div>
      <div>
        <input 
          name="item" 
          type="text" 
          size={15}
          placeholder={itemName}
          id="records-update-item" 
          onChange={(e) => {
            if (e.target.value !== '') {
              setUpdatedRecord({...updatedRecord, item: e.target.value})
            }
          }} 
        />
      </div>
      <div>
        <input 
          name="cost" 
          type="text" 
          placeholder={cost}
          size={5}
          id="records-update-cost" 
          onChange={(e) => {
            if (e.target.value !== '') {
              setUpdatedRecord({...updatedRecord, cost: e.target.value})
            }
          }} 
        />
      </div>
      <div>{userSplit}</div>
      <div>{counterpartySplit}</div>
      <div>
        <input 
          name="perc" 
          type="number"
          step="0.01"
          size={10}
          placeholder={userPercent}
          id="records-update-perc" 
          onChange={(e) => {
            if (e.target.value !== '') {
              setUpdatedRecord({...updatedRecord, perc: e.target.value})
            }
          }} 
        />
      </div>
      <div className="center">
        <Button className="center update-button" type="submit" variant="contained" size="small" onClick={updateRecord}>Update</Button>
        {/* <Button className="center update-button" type="submit" variant="contained" size="small" onClick={updateRecord}>Update No.{updatedRecord.id}</Button> */}
        {/* <button onClick={cancelClicked}>Cancel Update</button>
        {console.log('in UpdateRecord render checking updatedRecord: ', updatedRecord)} */}
      </div>
    </form>
  )
}

export default UpdateRecord;