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
  const [recordsData, setRecordsData] = useState([]);
  const [recordsList, setRecordsList] = useState([]);
  const [populatedRecords, setPopulatedRecords] = useState(false);

  useEffect(() => {
    console.log('ListOfRecords useEffect')
    fetch('/api/records')
      .then(response => response.json())
      .then(data => {
        console.log('get data here: ', data)
        setRecordsList(data)
        setPopulatedRecords(true);
        console.log('USEEFFECT RAN')
      })
      .catch((err) => `Error getting records: ${err}`)
  }, []);

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

  return (
    <div id="record-list-titles">
      List of Records:
      <div>Record No.</div>
      <div>Date Entered</div>
      <div>Item</div>
      <div>Cost</div>
      {recordElements}
    </div>
  )
};

export default ListOfRecords;
