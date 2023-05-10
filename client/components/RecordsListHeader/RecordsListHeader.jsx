/**
 * ************************************
 *
 * @module  RecordsListHeader
 * @author
 * @date
 * @description Component holding state consisting of records list and conditional rendering
 *
 * ************************************
 */

import React, { useCallback, useEffect, useState } from "react";
import Record from "../Record/Record.jsx";

import styles from './styles.module.scss';

const RecordsListHeader = () => {
  return (
    <div className={styles.listTitleRow}>
      <div className={styles.listTitleCounterparty}>Counterparty</div>
      <div className={styles.listTitleItemName}>Item Name</div>
      <div className={styles.listTitleCost}>Cost ($)</div>
      <div className={styles.listTitleSplitDollar}>Your Split ($)</div>
      <div className={`${styles.listTitleSplitPercent} ${styles.mobileHidden}`}>Your Split (%)</div>
      <div className={`${styles.listTitleDate} ${styles.mobileHidden}`}>Date Entered</div>
    </div>
  )
};

export default RecordsListHeader;
