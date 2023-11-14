import React from 'react';
import styles from './textArea.module.css';

function TextArea(props) {
  return (
    <>
      <textarea
          rows={props.rows}
          value={props.textAreaValue}
          onChange={props.onChange}
          placeholder={props.placeholder}
          className={styles.textAreaStyles}
      />
    </>
  );
}

TextArea.defaultProps = {
    placeholder: 'Placeholder',
    value: ''
};

export default TextArea;


