import React, { Component } from 'react'

const Record = (props) => {
  const { id, input_date, username, item_name } = props;

  return (
    <div>This is {id}, where {username} purchased {item_name}!</div>
  )
};

export default Record;