import React, {useCallback, useState } from "react";

import styles from './styles.module.scss';

const DeleteRecordForm = (props) => {
  const {
    deletedRecord,
    setDeletedRecord,
    recordsList,
    setRecordsList,
    setIsAltering,
    setIsDeleting,
  } = props;

  const deleteRecord = useCallback(e => {
    e.preventDefault();
    const deleteChosenRecord = async () => {
      console.log('deleting chosen record')
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

  const handleCancel = () => {
    setIsDeleting(false);
    setIsAltering(false);
  };

  return (
    <>
      {!deletedRecord?.id && <div className={styles.chooseRecordPrompt}>
        <div className={styles.chooseRecordText}>Choose a record to delete.</div>
        <button className={styles.cancelButton} onClick={handleCancel}>CANCEL</button>
      </div>}

      {deletedRecord?.id && <div className={styles.deleteRecordPrompt}>
        <div className={styles.deleteRecordText}>Are you sure you want to delete this record?</div>
        <ul className={styles.deletedRecordDetails}>
          <li className={styles.deletedRecordDetailsItem}>
            <div className={styles.deletedRecordDetailsItemTitle}>Item Name:</div>
            <div className={styles.deletedRecordDetailsItemName}>{deletedRecord.item}</div>
          </li>
          <li className={styles.deletedRecordDetailsItem}>
            <div className={styles.deletedRecordDetailsItemTitle}>Cost:</div>
            <div className={styles.deletedRecordDetailsItemName}>${deletedRecord.cost}</div>
          </li>
          <li className={styles.deletedRecordDetailsItem}>
            <div className={styles.deletedRecordDetailsItemTitle}>Your Split:</div>
            <div className={styles.deletedRecordDetailsItemName}>{deletedRecord.perc}%</div>
          </li>
        </ul>
        <div className={styles.deleteCancelButtons}>
          <button className={styles.deleteButton} onClick={deleteRecord}>DELETE</button>
          <button className={styles.cancelButton} onClick={handleCancel}>CANCEL</button>
        </div>
      </div>}
    </>
  )
}

export default DeleteRecordForm;