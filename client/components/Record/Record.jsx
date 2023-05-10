/**
 * ************************************
 *
 * @module  Record
 * @author
 * @date
 * @description
 *
 * ************************************
 */

import React from "react";

import styles from './styles.module.scss';

const Record = (props) => {
  const {
    id,
    handleOnClick,
    counterparty,
    itemName,
    itemCost,
    userSplitDollar,
    userSplitPercent,
    date,
  } = props;

  return (
    <div id={id} className={styles.recordRow} onClick={handleOnClick}>
      <div className={`recordCounterparty ${styles.recordCounterparty}`}>{counterparty}</div>
      <div className={`recordItemName ${styles.recordItemName}`}>{itemName}</div>
      <div className={`recordCost ${styles.recordCost}`}>{itemCost}</div>
      <div className={`recordSplitDollar ${styles.recordSplitDollar}`}>{userSplitDollar}</div>
      <div className={`recordSplitPercent ${styles.recordSplitPercent} ${styles.mobileHidden}`}>{userSplitPercent}</div>
      <div className={`recordDate ${styles.recordDate} ${styles.mobileHidden}`}>{date}</div>
    </div>
  )
};

export default Record;