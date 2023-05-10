/**
 * ************************************
 *
 * @module  RecordsList
 * @author
 * @date
 * @description Component holding state consisting of records list and conditional rendering
 *
 * ************************************
 */

import React, { useCallback, useEffect, useState } from "react";
import Record from "../Record/Record.jsx";

import styles from './styles.module.scss';

const RecordsList = props => {
  const {
    recordsList,
    currentCounterparty,
    setSortedRecords,
    isEditing,
    setEditedRecord,
    isDeleting,
    setDeletedRecord,
  } = props;

  useEffect(() => {
    if (currentCounterparty !== 'All Counterparties') setSortedRecords(false);
  }, [currentCounterparty, recordsList]);

  const handleRecordRowClick = useCallback(e => {
    const recordId = e.currentTarget.id;
    const recordCounterparty = e.currentTarget.querySelector('.recordCounterparty').textContent;
    const recordItem = e.currentTarget.querySelector('.recordItemName').textContent;
    const recordCost = e.currentTarget.querySelector('.recordCost').textContent;
    const recordPercent = e.currentTarget.querySelector('.recordSplitPercent').textContent;
    if (isEditing) {
      setEditedRecord({
        name: recordCounterparty,
        id: recordId,
        item: recordItem,
        cost: recordCost,
        perc: recordPercent,
      });
    }
    if (isDeleting) {
      setDeletedRecord({
        id: recordId,
        item: recordItem,
        cost: recordCost,
        perc: recordPercent,
      });
    }
  }, [isEditing, isDeleting]);

  return (
    <div className={styles.recordsContainer}>
      <div className={styles.listTitleRow}>
        <div className={styles.listTitleCounterparty}>Counterparty</div>
        <div className={styles.listTitleItemName}>Item Name</div>
        <div className={styles.listTitleCost}>Cost ($)</div>
        <div className={styles.listTitleSplitDollar}>Your Split ($)</div>
        <div className={`${styles.listTitleSplitPercent} ${styles.mobileHidden}`}>Your Split (%)</div>
        <div className={`${styles.listTitleDate} ${styles.mobileHidden}`}>Date Entered</div>
      </div>

      {(recordsList ?? []).map(record => (
        <Record
          key={`record-${record.id}`}
          id={record.id}
          handleOnClick={handleRecordRowClick}
          counterparty={record.counterparty_username}
          itemName={record.item_name}
          itemCost={record.item_cost}
          userSplitDollar={record.user_split}
          userSplitPercent={record.user_perc}
          date={record.input_date}
        />
      ))}
    </div>
  )
};

export default RecordsList;
