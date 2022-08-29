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

/**
 * RecordsList is rendered for all counterparties the user has on inital render.
 * useEffect runs when currentCounterparty changes so the RecordsList will reflect records with the counterparty selected only.
 */
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (currentCounterparty !== null) {
      fetch('/api/records/counterparty', {
        signal: signal,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          counterparty: currentCounterparty
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log('get records for counterparty and user only: ', data);
          setRecordsList(data);
        })
        .catch((err) => {
          if (err.name === 'AbortError') {
            return 'Successfully aborted!';
          } else return `Error getting records: ${err}`
        })
        .finally(setPopulatedRecords(true))
    } else {
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
    }
  }, [populatedRecords, currentCounterparty]);

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