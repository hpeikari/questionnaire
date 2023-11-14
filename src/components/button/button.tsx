import React from 'react';
import styles from './button.module.css';

const noop = () => {}

function Button(props) {
  return (
    <button
      className={[
        styles.button, 
        styles[props.theme], 
        props.className, 
        props.disabled ? styles.disabled : ''
        ].join(' ')}
      disabled={props.disabled}
      onClick={props.disabled ? noop : props.onClick}
    >
      {props.children}
    </button>
  );
}

Button.defaultProps = {
  text: '',
  className: '',
  disabled: false,
  onClick: noop,
  theme: 'primary',
  visible: true
};

export default Button;
