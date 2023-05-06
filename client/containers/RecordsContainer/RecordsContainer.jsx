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
import { Paper, Button } from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import RecordsList from '../../components/RecordsList/RecordsList.jsx';

import styles from './styles.module.scss';

const RecordsContainer = props => {
  const { 
    currentCounterparty, 
    setCurrentCounterparty,
    userBalance,
    setUserBalance,
    counterpartyBalance,
    setCounterpartyBalance,
    numUnpaidBalances,
    setNumUnpaidBalances,
    counterpartiesList,
    setCounterpartiesList,
    populatedCounterparties,
    setPopulatedCounterparties
  } = props;

  const [recordsList, setRecordsList] = useState([]);
  const [populatedRecords, setPopulatedRecords] = useState(false);
  const [toUpdate, setToUpdate] = useState(false);
  const [recordToUpdate, setRecordToUpdate] = useState({
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

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [clickedCancel, setClickedCancel] = useState(true);

  // For adding records
  const [addedRecord, setAddedRecord] = useState({
    name: 'CO', // TODO: set to user
    counterparty: currentCounterparty,
    item: '',
    cost: '',
    userPercent: 50
  });
  // const [allButtonsVisible, setAllButtonsVisible] = useState(true);
  // const [toggleAddRecordForm, setToggleAddRecordForm] = useState(false);


  const addRecord = async (e) => {
    e.preventDefault();
    console.log('currentCounterparty here', currentCounterparty)
    if (currentCounterparty === null || currentCounterparty === 'All Parties') {
      return setIsEmptyCounterparty(true);
    } else {
      console.log('addRecord fired')
      // Add cases dealing with blanks/nulls in postedRecord
      const splitCalculation = await (postedRecord.cost * postedRecord.userPercent / 100);
      console.log('this is split',splitCalculation)
      await fetch('/api/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: postedRecord.name,
          counterparty: postedRecord.counterparty,
          item: postedRecord.item,
          cost: postedRecord.cost,
          split: splitCalculation,
          percentage: postedRecord.userPercent
        })
      })
        .then(() => {
          console.log('added record!')
          setPopulatedRecords(false);
          setIsEmptyCounterparty(false);
        })
        .catch(err => `Error adding record: ${err}`)
        .finally(
          setPostedRecord({
            name: 'CO',
            counterparty: currentCounterparty,
            item: '',
            cost: '',
            userPercent: 50
          })
        )
    }
  };

  const handleCancel = () => {
    if (isAdding) {
      setIsAdding(false);
    } else if (isEditing) {
      setIsEditing(false);
    } else if (isDeleting) {
      setIsDeleting(false);
    }
    setClickedCancel(true);
  }

  return (
    <section className={styles.recordsSection}>
      <div className={`${styles.titleBar} titleBar`}>
        <ArrowRightIcon />
        <h2>Records with <span className={styles.currentPartyInTitle}>{currentCounterparty}</span></h2>
      </div>

      <div className={styles.alterRecords}>
        {clickedCancel &&
          <div className={styles.alterRecordsButtons}>
            <button onClick={() => setIsAdding(true)}>ADD</button>
            <button onClick={() => setIsEditing(true)}>EDIT</button>
            <button onClick={() => setIsDeleting(true)}>DELETE</button>
          </div>
        }
        {(isAdding || isEditing || isDeleting) && <button onClick={handleCancel}>CANCEL</button>}
      </div>

      {isAdding && 
      <form className={styles.recordsPostInputs} action="/api/records" method="POST">
        <div className="display-flex-column">
          <label htmlFor="item">Item Purchased</label>
          <input name="item" type="text" value={addedRecord.item} id="records-post-item" onChange={(e) => setAddedRecord({...addedRecord, item: e.target.value})} />
        </div>
        <div className="display-flex-column">
          <label htmlFor="cost">Item Cost ($)</label>
          <input name="cost" type="text" value={addedRecord.cost} id="records-post-cost" onChange={(e) => setAddedRecord({...addedRecord, cost: e.target.value})} />
        </div>
        <div className="display-flex-column">
          <label htmlFor="userPercent">Your Split (%)</label>
          <input name="userPercent" type="text" placeholder={50}value={addedRecord.userPercent} id="records-post-user-percent" onChange={(e) => setAddedRecord({...addedRecord, userPercent: e.target.value})} />
        </div>
        <div className={styles.addCancelButtons}>
          <Button type="submit" variant="contained" size="small" onClick={addRecord}>Add Record</Button>
        </div>
        {/* {!allButtonsVisible && toggleAddRecordForm &&
        <Button variant="contained" size="small" onClick={cancelAdd}>Cancel Add</Button>
        } */}
      </form>}


      <RecordsList 
        recordsList={recordsList}
        setRecordsList={setRecordsList}
        populatedRecords={populatedRecords}
        setPopulatedRecords={setPopulatedRecords}
        recordToUpdate={recordToUpdate}
        setRecordToUpdate={setRecordToUpdate}
        // toUpdate={toUpdate}
        // setToUpdate={setToUpdate}
        currentCounterparty={currentCounterparty}
        setCurrentCounterparty={setCurrentCounterparty}
        sortedRecords={sortedRecords}
        setSortedRecords={setSortedRecords}
        counterpartiesList={counterpartiesList}
        setCounterpartiesList={setCounterpartiesList}
        populatedCounterparties={populatedCounterparties}
        setPopulatedCounterparties={setPopulatedCounterparties}
      />
    </section>
  )
}

export default RecordsContainer;