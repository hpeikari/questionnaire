import React from 'react';
import styles from './label.module.css';

function Label(props) {
  return (
    <label className={styles.label} htmlFor={props.id}>{props.label}</label>
  );
}

Label.defaultProps = {
    id: 'id'
};

export default Label;
