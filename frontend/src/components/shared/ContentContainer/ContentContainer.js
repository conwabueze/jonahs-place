import React from 'react';
import './ContentContainer.css';

function ContentContainer(props) {
  return <div className="ContentContainer"> {props.children}</div>;
}

export default ContentContainer;
