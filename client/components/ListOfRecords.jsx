/**
 * ************************************
 *
 * @module  DataList
 * @author
 * @date
 * @description 
 *
 * ************************************
 */

import React, { useEffect, useState } from "react";
import Record from "./Record.jsx";

const ListOfRecords = props => {
  const [recordsList, setRecordsList] = useState([]);
  const [populatedRecords, setPopulatedRecords] = useState(false);
  const [togglePostRecordForm, setTogglePostRecordForm] = useState(false);
  const [postedRecord, setPostedRecord] = useState({
    name: '',
    item: '',
    cost: ''
  });

  const [actionsValue, setActionsValue] = useState('Select')
  const [toUpdate, setToUpdate] = useState(false);
  const [updatedRecord, setUpdatedRecord] = useState({
    id: 1,
    item: null,
    cost: null
  });

  useEffect(() => {
    console.log('ListOfRecords useEffect')

    const controller = new AbortController();
    const signal = controller.signal;

    fetch('/api/records', {
      signal: signal
    })
      .then(response => response.json())
      .then(data => {
        console.log('get data here: ', data)
        setRecordsList(data)
        setPopulatedRecords(true);
        console.log('USEEFFECT RAN')
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return 'Successfully aborted!';
        } else return `Error getting records: ${err}`
      })
  }, [populatedRecords]);

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

  const postRecord = (e) => {
    console.log('postRecord fired')
    e.preventDefault(); // prevents default submission attributes (action and method) of form 
    // console.log(e)
    fetch('/api/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: postedRecord.name,
        item_name: postedRecord.item,
        item_cost: postedRecord.cost
      })
    })
      .then(() => {
        console.log('added record!')
        setPopulatedRecords(false);
        setPostedRecord({
          name: '',
          item: '',
          cost: ''
        })
      })
      .catch(err => `Error adding record: ${err}`)
  };

  const updateRecord = (e) => {
    console.log('updateRecord fired');
    e.preventDefault();
    console.log('in updateRecord checking updatedRecord: ', updatedRecord)
    fetch('api/records/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: updatedRecord.id,
        item_name: updatedRecord.item,
        item_cost: updatedRecord.cost
      })
    })
      .then(() => {
        console.log('updated record')
        setPopulatedRecords(false);
      })
      .catch(err => `Error updating record: ${err}`)
      .finally(setToUpdate(false))
  };

  return (
    <div>
      List of Records:
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

      <div className="all-forms">
        <div className="post-form">
          <button onClick={() => setTogglePostRecordForm(!togglePostRecordForm)}>{togglePostRecordForm ? `Exit Adding A Record`: `Add A Record Here`}</button>
          {
          togglePostRecordForm && <form action="/api/records" method="POST">
            <div>
              <label for="name">Name:</label>
              <input name="name" type="text" value={postedRecord.name} id="records-post-name" onChange={(e) => setPostedRecord({...postedRecord, name: e.target.value})} />
            </div>
            <div>
              <label for="item">Item Purchased:</label>
              <input name="item" type="text" value={postedRecord.item} id="records-post-item" onChange={(e) => setPostedRecord({...postedRecord, item: e.target.value})} />
            </div>
            <div>
              <label for="cost">Item Cost:</label>
              <input name="cost" type="text" value={postedRecord.cost} id="records-post-cost" onChange={(e) => setPostedRecord({...postedRecord, cost: e.target.value})} />
            </div>
            <div>
              <button type="submit" onClick={postRecord}>Add A Record</button>
            </div>
          </form>
          }
        </div>


        {toUpdate &&
          <div className="updateForm">
            {`Update Record No. ${updatedRecord.id}:`}
            <form action="/api/records" method="PUT">
            <div>
              <label for="item">Change Item:</label>
              <input name="item" type="text" id="records-update-item" onChange={(e) => {
                if (e.target.value !== '') {
                  setUpdatedRecord({...updatedRecord, item: e.target.value})
                }
              }} />
            </div>
            <div>
              <label for="cost">Change Cost:</label>
              <input name="cost" type="text" id="records-update-cost" onChange={(e) => {
                if (e.target.value !== '') {
                  setUpdatedRecord({...updatedRecord, cost: e.target.value})
                }
              }} />
            </div>
            <div>
              <button type="submit" onClick={updateRecord}>Update Record No. {updatedRecord.id}</button>
              <button onClick={() => setToUpdate(false)}>Cancel Update</button>
              {console.log('in ListOfRecords render checking updatedRecord: ', updatedRecord)}
            </div>
          </form>
          </div>
        }
      </div>
    </div>
  )
};

export default ListOfRecords;
