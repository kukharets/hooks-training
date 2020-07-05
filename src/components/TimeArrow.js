import React from "react";

const TimeArrow = React.forwardRef(({type, angle, handleHover}, ref) => {
  console.warn('TimeArrow', type, angle);
  return (
    <div onMouseEnter={() => {
      console.error(angle);
      handleHover && handleHover(angle)
    }} ref={ref} style={{transform: `rotate(${angle}deg)`}} className={`time-arrow-wrapper-${type}`}>
      <div className={`time-arrow-${type}`}/>
    </div>
  )
});

export default React.memo(TimeArrow);