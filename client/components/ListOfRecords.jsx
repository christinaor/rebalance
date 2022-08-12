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

  // const recordElements = [];
  // for (let record )

  // const recordElements = recordsList.map(record => {(
  //   <Record 
  //     key={`record${record.id}`}
  //     input_date={record.input_date}
  //     username={record.username}
  //     item_name={record.item_}
  //   />
  // )})
  // const recordElements = [];
  // if (populatedRecords) {
  //   recordElements.push(record => {return (<Record 
  //     id={`record${record.id}`}
  //     input_date={record.input_date}
  //     username={record.username}
  //     item_name={record.item_name}
      
  //     />)
  //   })
  // }
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
      List of Records:
      {/* {populatedRecords && recordElements} */}
      {recordsList.map(record => {
        return (
          <Record 
            key={`record${record.id}`}
            id={`record${record.id}`}
            input_date={record.input_date}
            username={record.username}
            item_name={record.item_name}
          />
        )
      })}
      {/* {populatedRecords && <div>{recordsList[0].id}</div>} */}
    </div>
  )
};

export default ListOfRecords;
