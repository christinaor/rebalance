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

import React, { useCallback, useEffect, useState } from "react";
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
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch('/api/records', {
      signal: signal
    })
      .then(response => response.json())
      .then(records => {
        console.log(records)
        setRecordsList(records)
        setNumUnpaidBalances(records.length)
        let calculatedUserBalance = 0;
        let calculatedCounterpartyBalance = 0;
        for (const record of records) {
          calculatedUserBalance += parseFloat(record.item_cost) * parseFloat(record.user_perc) / 100;
          calculatedCounterpartyBalance += (parseFloat(record.item_cost) - parseFloat(record.item_cost) * parseFloat(record.user_perc) / 100);
        }
        setUserBalance(calculatedUserBalance.toFixed(2));
        setCounterpartyBalance(calculatedCounterpartyBalance.toFixed(2));
      })
      .catch(err => {
        if (err.name === 'AbortError') {
            return 'Successfully aborted!';
          } else return `Error getting records: ${err}`
        })
  }, []);

  // Sort records if counterparty is filtered
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (currentCounterparty !== 'All Parties') {
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
        .then(records => {
          console.log(records)
          setRecordsList(records)
          setNumUnpaidBalances(records.length)
          let calculatedUserBalance = 0;
          let calculatedCounterpartyBalance = 0;
          for (const record of records) {
            calculatedUserBalance += parseFloat(record.item_cost) * parseFloat(record.user_perc) / 100;
            calculatedCounterpartyBalance += (parseFloat(record.item_cost) - parseFloat(record.item_cost) * parseFloat(record.user_perc) / 100);
          }
          setUserBalance(calculatedUserBalance.toFixed(2));
          setCounterpartyBalance(calculatedCounterpartyBalance.toFixed(2));
        })
        .catch((err) => {
          if (err.name === 'AbortError') {
            return 'Successfully aborted!';
          } else return `Error getting records for specific counterparty: ${err}`
        })
    }
  }, [currentCounterparty])

  // useEffect(async () => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   console.log('recordsContainer fired with populatedRecords', populatedRecords)
  //   // Retrieve records based on the current counterparty
  //   let records;
  //   if (!sortedRecords && currentCounterparty !== null && currentCounterparty !== 'All Parties') {
  //     records = await fetch('/api/records/counterparty', {
  //       signal: signal,
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         counterparty: currentCounterparty
  //       })
  //     })
  //       .then(response => response.json())
  //       .catch((err) => {
  //         if (err.name === 'AbortError') {
  //           return 'Successfully aborted!';
  //         } else return `Error getting records for specific counterparty: ${err}`
  //       })
  //       .finally(setPopulatedRecords(true))
  //   // Otherwise all records will be retrieved
  //   } else if (!sortedRecords) {
  //     console.log('in the else grabbing all records')
  //     records = await fetch('/api/records', {
  //       signal: signal
  //     })
  //       .then(response => response.json())
  //       .catch((err) => {
  //         if (err.name === 'AbortError') {
  //           return 'Successfully aborted!';
  //         } else return `Error getting records: ${err}`
  //       })
  //       .finally(setPopulatedRecords(true))
  //   }
  //   setNumUnpaidBalances(records.length);
  //   if (!sortedRecords) setRecordsList(records);

  //   // Calculate user and counterparty balances
  //   let calculatedUserBalance = 0;
  //   let calculatedCounterpartyBalance = 0;
  //   for (const record of records) {
  //     calculatedUserBalance += parseFloat(record.item_cost) * parseFloat(record.user_perc) / 100;
  //     calculatedCounterpartyBalance += (parseFloat(record.item_cost) - parseFloat(record.item_cost) * parseFloat(record.user_perc) / 100);
  //   }
  //   setUserBalance(calculatedUserBalance.toFixed(2));
  //   setCounterpartyBalance(calculatedCounterpartyBalance.toFixed(2));
  // }, [populatedRecords, currentCounterparty, sortedRecords]);

  const [isAltering, setIsAltering] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

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


  const addRecord = useCallback(e => {
    e.preventDefault();
    console.log(addedRecord)
    // Add cases dealing with blanks/nulls in postedRecord
    const splitCalculation =  addedRecord.cost * addedRecord.userPercent / 100;
    const postAddedRecord = async () => {
      await fetch('/api/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: addedRecord.name,
          counterparty: currentCounterparty,
          item: addedRecord.item,
          cost: addedRecord.cost,
          split: splitCalculation,
          percentage: addedRecord.userPercent
        })
      })
        .then(() => {
          console.log('added record!')
          setPopulatedRecords(false);
          setIsEmptyCounterparty(false);
        })
        .catch(err => `Error adding record: ${err}`)
        .finally(() => {
          setAddedRecord({
            name: 'CO',
            counterparty: currentCounterparty,
            item: '',
            cost: '',
            userPercent: 50
          })
          setIsAdding(false);
          setIsAltering(false);
        })
      };
      postAddedRecord();
  }, [addedRecord, currentCounterparty]);

  const handleToggleAdd = () => {
    setIsAdding(true);
    setIsAltering(true);
  };

  // For editing a record
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecord, setEditedRecord] = useState({
    id: null,
    item: null,
    cost: null,
    perc: null,
  });

  const handleToggleEdit = () => {
    setIsEditing(true);
    setIsAltering(true);
  };

  const updateRecord = useCallback(e => {
    console.log('updateRecord fired: ', recordToUpdate);
    console.log('current populated records is: ', populatedRecords)
    e.preventDefault();
    const putEditedRecord = async () => {
      await fetch('api/records/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: editedRecord.id,
          item_name: editedRecord.item,
          item_cost: editedRecord.cost,
          perc_split: editedRecord.perc
        })
      })
        .then(() => {
          console.log('updated record!')
        })
        .catch(err => `Error updating record: ${err}`)
        .finally(() => {
          // Filter out record that was edited, then add editedRecord
          const filteredRecords = recordsList.filter(record => record.id != editedRecord.id)
          console.log(filteredRecords)
          console.log(recordsList.filter(record => record.id == editedRecord.id))
          console.log([...filteredRecords, {
            counterparty_username: currentCounterparty,
            id: editedRecord.id,
            input_date: new Date(),
            item_cost: editedRecord.cost,
            item_name: editedRecord.item,
            user_perc: editedRecord.perc,
            user_split: editedRecord.cost * editedRecord.perc / 100,
            username: "CO",
          }])
          setRecordsList([...filteredRecords, {
            counterparty_username: currentCounterparty,
            id: parseInt(editedRecord.id),
            input_date: new Date().toISOString(), // need to look like 2022-08-25T09:02:16.386Z
            item_cost: editedRecord.cost,
            item_name: editedRecord.item,
            user_perc: editedRecord.perc,
            user_split: parseFloat(editedRecord.cost * editedRecord.perc / 100).toString(),
            username: "CO",
          }]);
          setEditedRecord({
            id: null,
            item: null,
            cost: null,
            perc: null,
          });
          setIsEditing(false);
          setIsAltering(false);
        })
      };
      putEditedRecord();
  }, [currentCounterparty, editedRecord, recordsList]);


  const handleToggleDelete = () => {
    setIsDeleting(true);
    setIsAltering(true);
  };
  const handleCancel = () => {
    if (isAdding) {
      setIsAdding(false);
    } else if (isEditing) {
      setIsEditing(false);
    } else if (isDeleting) {
      setIsDeleting(false);
    }
    setIsAltering(false);
  }


  // Format: 
  // {
  //   id: null,
  //   item: null,
  //   cost: null,
  //   perc: null
  // }
  return (
    <section className={styles.recordsSection}>
      <div className={`${styles.titleBar} titleBar`}>
        <ArrowRightIcon />
        <h2>Records with <span className={styles.currentPartyInTitle}>{currentCounterparty}</span></h2>
      </div>

      <div className={styles.alterRecords}>
        <>
          {!isAltering && <div className={styles.alterRecordsButtons}>
            <button className={styles.addButton} onClick={handleToggleAdd}>ADD</button>
            <button className={styles.editButton} onClick={handleToggleEdit}>EDIT</button>
            <button className={styles.deleteButton} onClick={handleToggleDelete}>DELETE</button>
          </div>}
        </>
        {isAltering && (isEditing || isDeleting) && <button className={styles.cancelButton} onClick={handleCancel}>CANCEL</button>}
      </div>

      {isAdding && 
      <form className={styles.recordsAddForm} action="/api/records" method="POST">
        <div>
          <label htmlFor="added-item">Item Purchased</label>
          <input name="added-item" type="text" value={addedRecord.item} onChange={(e) => setAddedRecord({...addedRecord, item: e.target.value})} required />
        </div>
        <div>
          <label htmlFor="added-cost">Item Cost ($)</label>
          <input name="added-cost" type="text" value={addedRecord.cost} onChange={(e) => setAddedRecord({...addedRecord, cost: e.target.value})} required />
        </div>
        <div>
          <label htmlFor="added-userPercent">Your Split (%)</label>
          <input name="added-userPercent" type="text" placeholder={50} value={addedRecord.userPercent} id="records-post-user-percent" onChange={(e) => setAddedRecord({...addedRecord, userPercent: e.target.value})} required />
        </div>
        <div className={styles.addCancelButtons}>
          <button className={styles.submitNewRecordButton} onClick={addRecord}>Add Record</button>
          <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
        </div>
        {/* {!allButtonsVisible && toggleAddRecordForm &&
        <Button variant="contained" size="small" onClick={cancelAdd}>Cancel Add</Button>
        } */}
      </form>}

      {isEditing && <>
        {!editedRecord?.id && <div className={styles.chooseRecordText}>Choose a record to update.</div>}
        {editedRecord?.id && <form className={styles.editRecordForm}>
          {/* <div>
            <label htmlFor="ID">ID</label>
            <input name="ID" type="number" value={editedRecord.id} onChange={(e) => setEditedRecord({...editedRecord, id: e.target.value})} required />
          </div> */}
          <div>
            <label htmlFor="edited-item-name">Item Name</label>
            <input name="edited-item-name" type="text" value={editedRecord.item} onChange={(e) => setEditedRecord({...editedRecord, item: e.target.value})} />
          </div>
          <div>
            <label htmlFor="edited-cost">Cost ($)</label>
            <input name="edited-cost" type="text" value={editedRecord.cost} onChange={(e) => setEditedRecord({...editedRecord, cost: e.target.value})} />
          </div>
          <div>
            <label htmlFor="edited-user-percentage">Your Split (%)</label>
            <input name="edited-user-percentage" type="number" value={editedRecord.perc} onChange={(e) => setEditedRecord({...editedRecord, perc: e.target.value})} />
          </div>
          <button onClick={updateRecord}>Update Record</button>
        </form>}
      </>}


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

        isEditing={isEditing}
        editedRecord={editedRecord}
        setEditedRecord={setEditedRecord}
      />
    </section>
  )
}

export default RecordsContainer;