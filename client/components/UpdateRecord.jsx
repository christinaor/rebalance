import React, {useEffect, useState} from "react";

const UpdateRecord = (props) => {
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

  const updateRecord = (e) => {
    console.log('updateRecord fired');
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
        setPopulatedRecords(false);
      })
      .catch(err => `Error updating record: ${err}`)
      .finally(setToUpdate(false))
  };

  return (
    <div className="records-update-form">
      {!toUpdate && 
        <div className="update-form-placeholder">Select an action to update/delete a record.</div>
      }
      {toUpdate &&
        <div className="updateForm">
          {`Update Record No. ${updatedRecord.id}:`}
          <form action="/api/records" method="PUT">
          <div>
            <label for="item">Change Item:</label>
            <input 
              name="item" 
              type="text" 
              id="records-update-item" 
              onChange={(e) => {
                if (e.target.value !== '') {
                  setUpdatedRecord({...updatedRecord, item: e.target.value})
                }
              }} 
            />
          </div>
          <div>
            <label for="cost">Change Cost:</label>
            <input 
              name="cost" 
              type="text" 
              id="records-update-cost" 
              onChange={(e) => {
                if (e.target.value !== '') {
                  setUpdatedRecord({...updatedRecord, cost: e.target.value})
                }
              }} 
            />
          </div>
          <div>
            <label for="perc">Change Your Split:</label>
            <input 
              name="perc" 
              type="number" 
              step="0.01"
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
            <button onClick={() => setToUpdate(false)}>Cancel Update</button>
            {console.log('in UpdateRecord render checking updatedRecord: ', updatedRecord)}
          </div>
        </form>
        </div>
      }
    </div>
  )
}

export default UpdateRecord;