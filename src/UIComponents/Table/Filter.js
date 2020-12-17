import React from "react";

const Filter = (props) => {
  const onBlur = (evt) => {
    const val = evt.target.value;
    props.onFilter(props.settings.coloumnName, val);
  };

  const onChange = (evt) => {

      if(evt.keyCode === 13) {
        const val = evt.target.value;
        props.onFilter(props.settings.coloumnName, val);
    
      }
  }

  return <input onKeyDown ={onChange} onBlur={(evt) => onBlur(evt)} type="text" />;
};

export default Filter;
