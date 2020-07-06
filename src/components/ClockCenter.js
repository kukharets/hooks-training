import React, {useState,  useRef, useLayoutEffect, useCallback, useContext} from 'react';
import ClockRight from "./ClockRight";
import TimeArrow from "./TimeArrow";
import {ClockContext} from "../state/timeProvider";

function ClockCenter() {
  const {seconds, minutes, secondsAngle, minutesAngle } = useContext(ClockContext);
  const [transform, setTransform] = useState(0);

  const secondsArrowRef = useRef();

  useLayoutEffect(() => {
    setTransform(
      window.getComputedStyle(secondsArrowRef.current).getPropertyValue('transform')
    )
  }, [seconds]);

  const handleHover = (value) => {
    alert(value);
  };

  const memoHandleHover = useCallback((value) => handleHover(value), [minutes]);

  return (
    <div>
      <div className="clock-wrapper">
        <div className="clock-center">
          <div className="arrow-info">
            {transform}
          </div>
          <TimeArrow ref={secondsArrowRef} angle={secondsAngle} type='seconds'/>
          <TimeArrow handleHover={memoHandleHover} angle={minutesAngle} type='minutes'/>
          <TimeArrow type='hours'/>
        </div>
      </div>
      <ClockRight />
    </div>
  );
}

export default ClockCenter;
