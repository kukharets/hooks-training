import React, {useEffect, useMemo, useRef, useLayoutEffect, useReducer, useCallback} from 'react';
import {calculateClockAngle} from "../helpers/calculateClockAngle";

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

export default function useClock() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { seconds, minutes, hours } = state;

  useEffect(() => {
    setTimeout(() => {
      dispatch({type: 'SECONDS_INCREMENT', payload: seconds < 60 ? seconds + 1 : 0})
    }, 1000);
  }, [seconds]);

  const secondsAngle = calculateClockAngle(seconds, 'seconds');
  const minutesAngle = useMemo(() => {
    return calculateClockAngle(minutes, 'minutes');
  }, [minutes]);

  return {...state, seconds, minutes, hours, secondsAngle, minutesAngle}
}