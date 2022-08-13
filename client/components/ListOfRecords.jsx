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
  const [toggleRecordForm, setToggleRecordForm] = useState(false);
  const [postedRecord, setPostedRecord] = useState({
    name: null,
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
      })
      .catch(err => `Error adding records: ${err}`)
  };

  // const handleSubmitToPost = (e) => {
  //   e.preventDefault();
  //   console.log(e.target)
  //   // postRecord();
  // }

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
      <button onClick={() => setToggleRecordForm(!toggleRecordForm)}>{toggleRecordForm ? `Exit Adding A Record`: `Open Record Form`}</button>
      {
      toggleRecordForm && <form action="/api/records" method="POST">
        <div>
          <label for="name">Name:</label>
          <input name="name" type="text" id="records-post-name" onChange={(e) => setPostedRecord({...postedRecord, name: e.target.value})} />
        </div>
        <div>
          <label for="item">Item Purchased:</label>
          <input name="item" type="text" id="records-post-item" onChange={(e) => setPostedRecord({...postedRecord, item: e.target.value})} />
        </div>
        <div>
          <label for="cost">Item Cost:</label>
          <input name="cost" type="text" id="records-post-cost" onChange={(e) => setPostedRecord({...postedRecord, cost: e.target.value})} />
        </div>
        <div>
          <button type="submit" onClick={postRecord}>Add A Record</button>
        </div>
      </form>
      }
    </div>
  )
};

export default ListOfRecords;
