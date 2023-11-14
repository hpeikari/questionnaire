import React from 'react';
import styles from './checkbox.module.css';

function Checkbox(props) {
  return (
    <>
      <label
        className={[styles.checkboxWrapper, props.className].join(' ')}
        title={props.title}
      >
      <input
        type='checkbox'
        checked={props.checked}
        onChange={props.toggle}
        className={styles.checkbox}
      />
      {props.label && (
        <span
          className={[styles.labelStyle, props.labelClassName].join(' ')}
          role='label'
        >
          {props.label}
        </span>
      )}
    </label>
    </>
  );
}

Checkbox.defaultProps = {
  label: ''
};

export default Checkbox;
