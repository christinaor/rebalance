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
  const [recordsList, setRecordsList] = useState({})

  useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then(data => setRecordsList(data))
  }, []);
  // const listArray = list.map(num => <div>{num}</div>)
  // const getList = () => {
  //   if (!list.length) {
  //     fetch('/api')
  //       .then(response => response.json())
  //       .then(data => {

  //       })
  //   };
  //   console.log('returned list from getList func')
  // }

  // const getList = () => {
  //   fetch('/api')
  //     // don't need to read text as json - will crash in the front
  //     .then(response => response.json())
  //     .then(data => {
  //       const someData = data;
  //       console.log(someData);
  //       return someData;
  //     })
  // }
  // getList();

  return (
    <div>
      <Record />
      {/* {listArray} */}
    </div>
  )
};

export default ListOfRecords;
