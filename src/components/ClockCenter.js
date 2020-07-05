import React, {useState, useEffect, useMemo, useRef, useLayoutEffect, useReducer, useCallback} from 'react';
import ClockRight from "./ClockRight";
import TimeArrow from "./TimeArrow";
import { calculateClockAngle } from "../helpers/calculateClockAngle";

export const TimeContext = React.createContext({seconds: 0});

const initialState = {seconds: 0, minutes: 0, hours: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'SECONDS_INCREMENT': {
      const { payload } = action;
      let newMinutes = payload === 60 ? state.minutes + 1 : state.minutes;
      let newHours = newMinutes === 60 ? state.hours + 1 : state.hours;
      return {
        ...state,
        seconds: payload,
        minutes: newMinutes,
        hours: newHours,
      }
    }
  }
}

function ClockCenter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { seconds, minutes, hours } = state;
  const [transform, setTransform] = useState(0);

  const secondsArrowRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      dispatch({type: 'SECONDS_INCREMENT', payload: seconds < 60 ? seconds + 1 : 0})
    }, 1000);

  }, [seconds]);

  useLayoutEffect(() => {
    setTransform(
      window.getComputedStyle(secondsArrowRef.current).getPropertyValue('transform')
    )
  }, [seconds]);

  const secondsAngle = calculateClockAngle(seconds, 'seconds');
  const minutesAngle = useMemo(() => {
    calculateClockAngle(minutes, 'minutes');
  }, []);

  const handleHover = (value) => {
    alert(value);
  };

  const memoHandleHover = useCallback((value) => handleHover(value), [minutes]);

  return (
    <TimeContext.Provider value={{seconds}}>
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
    </TimeContext.Provider>
  );
}

export default ClockCenter;
