import React from 'react';
import styles from './radioButton.module.css';

function RadioButton(props) {
  return (
    <div className={[styles.wrapper, props.className].join(' ')}>
      {Object.keys(props.choices).map((k) => {
        const checked = props.selectedKey === k;
        return (
          <div key={k} className={styles.inputWrapper}>
            <input
              className={styles.radioInput}
              type='radio'
              value={props.choices[k]}
              checked={checked}
              onChange={() => props.onChange(props.choices[k])}
            />
            {props.radio(k)}
          </div>
        );
      })}
    </div>
  );
}

RadioButton.defaultProps = {
  label: ''
};

export default RadioButton;
