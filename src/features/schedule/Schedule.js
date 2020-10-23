import React, { useState, useRef, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import TaskCalendar from './components/TaskCalendar';
import TaskDetail from './components/TaskDetail';
import TaskList from './components/TaskList';
import { useFetchItems } from './redux/hooks';

export default function Schedule(props) {
  const [selectId, setSelectId] = useState(null);
  const { items, fetchItems, fetchItemsPending } = useFetchItems();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSelect = (id) => {
    if (selectId == id) {
      setSelectId(null);
    } else {
      setSelectId(id);
    }
  };

  return (
    <div style={{ padding: '10px 8px' }}>
      <div style={{ display: 'flex' }}>
        <TaskCalendar
          tasks={items}
          handleSelect={handleSelect}
          selected={selectId}
        />
      </div>
      <TaskList tasks={items} handleSelect={handleSelect} selected={selectId} />
    </div>
  );
}
