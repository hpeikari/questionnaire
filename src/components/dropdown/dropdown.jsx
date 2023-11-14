import React from 'react';
import Label from '../label/label';
import styles from './dropdown.module.css';

function Dropdown(props) {
  return (
    <>
      {props.label && <Label htmlFor={props.id} label={props.label} />}
      <select 
        value={props.answerType} 
        onChange={props.onChange} 
        className={styles.selectStyles}
      >
        {props.options.map((option) => (
          <option
            key={option.value} 
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
