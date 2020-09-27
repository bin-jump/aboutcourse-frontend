import React, { useState, useRef, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import TaskCalendar from './components/TaskCalendar';
import TaskDetail from './components/TaskDetail';
import TaskList from './components/TaskList';

export default function Schedule(props) {
  return (
    <div style={{ padding: '10px 8px' }}>
      <div style={{ display: 'flex' }}>
        <TaskCalendar />
        <TaskDetail />
      </div>
      <TaskList />
    </div>
  );
}
