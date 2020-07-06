import React, {useContext} from 'react';
import {ClockContext} from "../state/timeProvider";


function ClockRight() {
  const {seconds} = useContext(ClockContext);
  return (
      <div className="clock-numbers-wrapper">
        {seconds}
      </div>
  );
}

export default ClockRight;
