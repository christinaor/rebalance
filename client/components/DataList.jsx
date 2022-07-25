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
  const [list, setList] = useState([0,1,2]);
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

  return (
    <div>
      {listArray}
    </div>
  )
};

export default DataList;
