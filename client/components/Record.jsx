import React, { Component } from 'react'

const Record = (props) => {
  const { id, input_date, username, item_name, cost, populatedRecords, setPopulatedRecords } = props;

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
      .then(() => {
        console.log('deleted record')
        setPopulatedRecords(false);
      })
      .catch(err => `Error deleting record: ${err}`)
  };

  return (
    <div className="record grid-record">
      <div>{id}</div>
      <div>{input_date}</div>
      <div>{item_name}</div>
      <div>{cost}</div>
      <button onClick={deleteRecord}>Delete</button>
    </div>
  )
};

export default Record;