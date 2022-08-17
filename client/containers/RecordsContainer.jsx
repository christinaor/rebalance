/**
 * ************************************
 *
 * @module  RecordsContainer
 * @author
 * @date
 * @description stateful component that renders other components related to balance of all parties
 *
 * ************************************
 */

import React, { useEffect, useState } from "react";
import AddRecord from "../components/AddRecord.jsx";
// import ListOfRecords from '../components/ListOfRecords.jsx';

const RecordsContainer = props => {
  const [recordsList, setRecordsList] = useState([]);
  const [populatedRecords, setPopulatedRecords] = useState(false);

  return (
    <div>
      <AddRecord 
        recordsList={recordsList}
        setRecordsList={setRecordsList}
        populatedRecords={populatedRecords}
        setPopulatedRecords={setPopulatedRecords}
      />
      {/* <ListOfRecords /> */}
    </div>
  )
}

export default RecordsContainer;