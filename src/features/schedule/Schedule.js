import React, { useState, useRef, useEffect } from 'react';
import MouthTable from '../common/components/MonthTable';
import WeekTable from '../common/components/WeekTable';

export default function Schedule(props) {
  return (
    <div>
      <div>up</div>
      <div style={{ display: 'flex' }}>
        <div>SPACE</div>
        <WeekTable />
      </div>
    </div>
  );
}
