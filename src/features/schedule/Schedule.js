import React, { useState, useRef, useEffect } from 'react';
import MouthTable from '../common/components/MonthTable';
import WeekTable from '../common/components/WeekTable';

export default function Schedule(props) {
  return (
    <div>
      <WeekTable bodyHeight={300} />
    </div>
  );
}
