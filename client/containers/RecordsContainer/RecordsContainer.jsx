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
import EditRecordForm from "../../components/EditRecordForm/EditRecordForm.jsx";
import DeleteRecordForm from "../../components/DeleteRecordForm/DeleteRecordForm.jsx";
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
  const [isAltering, setIsAltering] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecord, setEditedRecord] = useState({
    name: null,
    id: null,
    item: null,
    cost: null,
    perc: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedRecord, setDeletedRecord] = useState({
    id: null,
    item: null,
    cost: null,
    perc: null,
  });

  const [sortedRecords, setSortedRecords] = useState(false);

  console.log(recordsList)
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
          setRecordsList(records);
        })
        .catch(err => {
          if (err.name === 'AbortError') {
              return 'Successfully aborted!';
            } else return `Error getting records: ${err}`
          })
    }
  }, [currentCounterparty])

  useEffect(() => {
    if (recordsList.length > 0) {
      setNumUnpaidBalances(recordsList.length);
      let calculatedUserBalance = 0;
      let calculatedCounterpartyBalance = 0;
      for (const record of recordsList) {
        calculatedUserBalance += parseFloat(record.item_cost) * parseFloat(record.user_perc) / 100;
        calculatedCounterpartyBalance += (parseFloat(record.item_cost) - parseFloat(record.item_cost) * parseFloat(record.user_perc) / 100);
      }
      setUserBalance(calculatedUserBalance.toFixed(2));
      setCounterpartyBalance(calculatedCounterpartyBalance.toFixed(2));
    }
  }, [recordsList]);

  const handleToggleAdd = () => {
    setIsAdding(true);
    setIsAltering(true);
  };

  const handleToggleEdit = () => {
    setIsEditing(true);
    setIsAltering(true);
  };

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
        {/* {isAltering && (isEditing || isDeleting) && <button className={styles.cancelButton} onClick={handleCancel}>CANCEL</button>} */}
      </div>

      {isAdding && 
        <AddRecordForm 
          currentCounterparty={currentCounterparty}
          recordsList={recordsList}
          setIsAdding={setIsAdding}
          setIsAltering={setIsAltering}
          setRecordsList={setRecordsList}
        />
      }

      {isEditing && 
        <EditRecordForm 
          currentCounterparty={currentCounterparty}
          editedRecord={editedRecord}
          setEditedRecord={setEditedRecord}
          recordsList={recordsList}
          setRecordsList={setRecordsList}
          setIsAltering={setIsAltering}
          setIsEditing={setIsEditing}
        />
      }

      {isDeleting && 
        <DeleteRecordForm
          deletedRecord={deletedRecord}
          setDeletedRecord={setDeletedRecord}
          recordsList={recordsList}
          setRecordsList={setRecordsList}
          setIsAltering={setIsAltering}
          setIsDeleting={setIsDeleting}
        />      
      }
      
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