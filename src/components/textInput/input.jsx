import React from 'react';
import Label from '../label/label';
import styles from './input.module.css';

function TextInput(props) {
  return (
    <>
        {props.label && <Label htmlFor={props.id} label={props.label} />}
        <input
            type='text'
            id={props.id}
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            tabIndex={props.tabIndex}
            className={[styles.input, props.className].join(' ')}
        />
    </>
  );
}

TextInput.defaultProps = {
    placeholder: 'Placeholder',
    value: '',
    label: ''
};

export default TextInput;
