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
import UpdateRecord from "../components/UpdateRecord.jsx";
import ListOfRecords from '../components/ListOfRecords.jsx';

const RecordsContainer = props => {
  const { currentCounterparty, setCurrentCounterparty } = props;

  const [recordsList, setRecordsList] = useState([]);
  const [populatedRecords, setPopulatedRecords] = useState(false);
  const [toUpdate, setToUpdate] = useState(false);
  const [updatedRecord, setUpdatedRecord] = useState({
    id: 1,
    item: null,
    cost: null
  });


  // RecordsList is rendered upon initial render
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch('/api/records', {
      signal: signal
    })
      .then(response => response.json())
      .then(data => {
        console.log('get records here: ', data);
        setRecordsList(data);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return 'Successfully aborted!';
        } else return `Error getting records: ${err}`
      })
      .finally(setPopulatedRecords(true))
  }, [populatedRecords]);

  return (
    <div>

      <ListOfRecords 
        recordsList={recordsList}
        setRecordsList={setRecordsList}
        populatedRecords={populatedRecords}
        setPopulatedRecords={setPopulatedRecords}
        updatedRecord={updatedRecord}
        setUpdatedRecord={setUpdatedRecord}
        toUpdate={toUpdate}
        setToUpdate={setToUpdate}
        currentCounterparty={currentCounterparty}
        setCurrentCounterparty={setCurrentCounterparty}
      />
      <div className="add-or-update-wrapper">
        <AddRecord 
          recordsList={recordsList}
          setRecordsList={setRecordsList}
          populatedRecords={populatedRecords}
          setPopulatedRecords={setPopulatedRecords}
          currentCounterparty={currentCounterparty}
          setCurrentCounterparty={setCurrentCounterparty}
        />
        <UpdateRecord 
          recordsList={recordsList}
          setRecordsList={setRecordsList}
          populatedRecords={populatedRecords}
          setPopulatedRecords={setPopulatedRecords}
          updatedRecord={updatedRecord}
          setUpdatedRecord={setUpdatedRecord}
          toUpdate={toUpdate}
          setToUpdate={setToUpdate}
          currentCounterparty={currentCounterparty}
          setCurrentCounterparty={setCurrentCounterparty}
        />
      </div>
    </div>
  )
}

export default RecordsContainer;