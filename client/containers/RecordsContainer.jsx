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
  const { 
    currentCounterparty, 
    setCurrentCounterparty,
    userBalance,
    setUserBalance,
    counterpartyBalance,
    setCounterpartyBalance,
    numUnpaidBalances,
    setNumUnpaidBalances
  } = props;

  const [recordsList, setRecordsList] = useState([]);
  const [populatedRecords, setPopulatedRecords] = useState(false);
  const [toUpdate, setToUpdate] = useState(false);
  const [updatedRecord, setUpdatedRecord] = useState({
    id: null,
    item: null,
    cost: null,
    perc: null
  });
  const [sortedRecords, setSortedRecords] = useState(false);

/**
 * RecordsList is rendered for all counterparties the user has on inital render.
 * useEffect runs when currentCounterparty changes so the RecordsList will reflect records with the counterparty selected only.
 */
  useEffect(async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    console.log('recordsContainer fired with populatedRecords', populatedRecords)
    // Retrieve records based on the current counterparty
    let records;
    if (!sortedRecords && currentCounterparty !== null && currentCounterparty !== 'All Parties') {
      records = await fetch('/api/records/counterparty', {
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
        .catch((err) => {
          if (err.name === 'AbortError') {
            return 'Successfully aborted!';
          } else return `Error getting records for specific counterparty: ${err}`
        })
        .finally(setPopulatedRecords(true))
    // Otherwise all records will be retrieved
    } else if (!sortedRecords) {
      console.log('in the else grabbing all records')
      records = await fetch('/api/records', {
        signal: signal
      })
        .then(response => response.json())
        .catch((err) => {
          if (err.name === 'AbortError') {
            return 'Successfully aborted!';
          } else return `Error getting records: ${err}`
        })
        .finally(setPopulatedRecords(true))
    }
    setNumUnpaidBalances(records.length);
    if (!sortedRecords) setRecordsList(records);

    // Calculate user and counterparty balances
    let calculatedUserBalance = 0;
    let calculatedCounterpartyBalance = 0;
    for (const record of records) {
      calculatedUserBalance += parseFloat(record.item_cost) * parseFloat(record.user_perc) / 100;
      calculatedCounterpartyBalance += (parseFloat(record.item_cost) - parseFloat(record.item_cost) * parseFloat(record.user_perc) / 100);
    }
    setUserBalance(calculatedUserBalance.toFixed(2));
    setCounterpartyBalance(calculatedCounterpartyBalance.toFixed(2));
  }, [populatedRecords, currentCounterparty, sortedRecords]);

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
        sortedRecords={sortedRecords}
        setSortedRecords={setSortedRecords}
      />
    </div>
  )
}

export default RecordsContainer;