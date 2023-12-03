import React from 'react';
import classes from './spinner.module.sass';
import classnames from 'classnames';


const Spinner = (props) => {
  const { className, ...rest } = props;
  
  return (
    <div className={classnames(classes.spinner, className)} {...rest}>
      <span className={classes.hidden}>Loading...</span>
    </div>
  );
};

export default Spinner;