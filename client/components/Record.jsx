import React, { Component } from 'react'

const Record = (props) => {
  const { id, input_date, username, item_name, cost } = props;

  return (
    <div className="record grid-record">
      <div>{id}</div>
      <div>{input_date}</div>
      <div>{item_name}</div>
      <div>{cost}</div>
    </div>
  )
};

export default Record;