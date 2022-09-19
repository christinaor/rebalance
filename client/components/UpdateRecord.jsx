import React, {useEffect, useState} from "react";

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
    recordsList,
    setRecordsList,
    populatedRecords,
    setPopulatedRecords,
    updatedRecord,
    setUpdatedRecord,
    toUpdate,
    setToUpdate,
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
    <form className="records-put-form" action="/api/records" method="PUT">
      <div>{id}</div>
      <div>{counterpartyName}</div>
      <div>{dateEntered}</div>
      <div>
        {/* <label for="item">Change Item:</label> */}
        <input 
          name="item" 
          type="text" 
          size={5}
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
        {/* <label for="cost">Change Cost:</label> */}
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
          size={5}
          placeholder={userPercent}
          id="records-update-perc" 
          onChange={(e) => {
            if (e.target.value !== '') {
              setUpdatedRecord({...updatedRecord, perc: e.target.value})
            }
          }} 
        />
      </div>
      <div>
        <button type="submit" onClick={updateRecord}>Update Record No. {updatedRecord.id}</button>
        <button onClick={cancelClicked}>Cancel Update</button>
        {console.log('in UpdateRecord render checking updatedRecord: ', updatedRecord)}
      </div>
    </form>
  )
}

export default UpdateRecord;