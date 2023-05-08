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

import AddRecordForm from '../../components/AddRecordForm/AddRecordForm.jsx';
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
  } = props;

  const [recordsList, setRecordsList] = useState([]);
  const [populatedRecords, setPopulatedRecords] = useState(false);
  const [recordToUpdate, setRecordToUpdate] = useState({
    id: null,
    item: null,
    cost: null,
    perc: null
  });
  const [sortedRecords, setSortedRecords] = useState(false);

/**
 * RecordsList is rendered for all counterparties the user has on inital render.
 * useEffect runs when currentCounterparty changes so the RecordsList will 
 * reflect records with the counterparty selected only.
*/
  // Fetch records based on counterparty
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
          setRecordsList(records);
          setNumUnpaidBalances(records.length);
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
    } else {
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
    }
  }, [currentCounterparty])

  const [isAltering, setIsAltering] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // TODO: Split into smaller components
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleAdd = () => {
    setIsAdding(true);
    setIsAltering(true);
  };

  // For editing a record
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecord, setEditedRecord] = useState({
    name: null,
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
          setRecordsList([...filteredRecords, {
            counterparty_username: editedRecord.name,
            id: parseInt(editedRecord.id),
            input_date: new Date().toISOString(), // need to look like 2022-08-25T09:02:16.386Z
            item_cost: editedRecord.cost,
            item_name: editedRecord.item,
            user_perc: editedRecord.perc,
            user_split: parseFloat(editedRecord.cost * editedRecord.perc / 100).toString(),
            username: "CO",
          }]);
          setEditedRecord({
            name: null,
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

  const [deletedRecord, setDeletedRecord] = useState({
    id: null,
    item: null,
    cost: null,
    perc: null,
  });

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
  };

  const deleteRecord = useCallback(e => {
    e.preventDefault();
    const deleteChosenRecord = async () => {
      await fetch('api/records/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: deletedRecord.id,
        })
      })
        .then(() => {
          // Filter out deleted record
          const filteredRecords = recordsList.filter(record => record.id != deletedRecord.id)
          setRecordsList([...filteredRecords]);
          setDeletedRecord({
            id: null,
            item: null,
            cost: null,
            perc: null,
          });
          setIsDeleting(false);
          setIsAltering(false);
        })
        .catch(err => `Error updating record: ${err}`)
      };
      deleteChosenRecord();
  }, [deletedRecord, recordsList]);

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
        <AddRecordForm 
          currentCounterparty={currentCounterparty}
          handleCancel={handleCancel}
          setIsAdding={setIsAdding}
          setIsAltering={setIsAltering}
        />
      }

      {isEditing && <>
        {!editedRecord?.id && <div className={styles.chooseRecordText}>Choose a record to update.</div>}
        {editedRecord?.id && <form className={styles.editRecordForm}>
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
          <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
        </form>}
      </>}

      {isDeleting && <>
        {!deletedRecord?.id && <div className={styles.chooseRecordText}>Choose a record to delete.</div>}
        {deletedRecord?.id && <div>
          <div>Are you sure you want to delete this record?</div>
          <div className={styles.deletedRecordDetails}>
            <div>{deletedRecord.item}</div>
            <div>{deletedRecord.cost}</div>
            <div>{deletedRecord.perc}</div>
          </div>
          <div>
            <button onClick={deleteRecord}>Yes</button>
            <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
          </div>
        </div>}
      </>}
      
      <RecordsList 
        recordsList={recordsList}
        setRecordsList={setRecordsList}
        currentCounterparty={currentCounterparty}
        setCurrentCounterparty={setCurrentCounterparty}
        sortedRecords={sortedRecords}
        setSortedRecords={setSortedRecords}

        isEditing={isEditing}
        editedRecord={editedRecord}
        setEditedRecord={setEditedRecord}
        isDeleting={isDeleting}
        deletedRecord={deletedRecord}
        setDeletedRecord={setDeletedRecord}
      />
    </section>
  )
}

export default RecordsContainer;