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

const DataList = (props) => {
  const [list, setList] = useState([0,1]);
  const listArray = list.map(num => <div>{num}</div>)
  // const getList = () => {
  //   if (!list.length) {
  //     fetch('/api')
  //       .then(response => response.json())
  //       .then(data => {

  //       })
  //   };
  //   console.log('returned list from getList func')
  // }

  const getList = () => {
    fetch('/api')
      // don't need to read text as json - will crash in the front
      .then(response => response.json())
      .then(data => {
        const someData = data;
        console.log(someData);
        return someData;
      })
  }
  getList();

  return (
    <div>
      {listArray}
    </div>
  )
};

export default DataList;
