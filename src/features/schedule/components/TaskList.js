import React, { useState, useRef, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Paper from '@material-ui/core/Paper';
import { PendIconButton } from '../../common';
import { getMinutes, getWeek, mergeDate } from '../../common/util';
import { useRemoveTask } from '../redux/hooks';
import './TaskList.less';

function Tag(props) {
  const { tag } = { ...props };

  return (
    <div
      style={{
        border: '1px solid #f8d754',
        color: '#f8d754',
        background: '#fff7dd',
        display: 'inline-block',
        padding: '0 3px',
        margin: 5,
        height: 24,
        borderRadius: 3,
      }}
    >
      {tag.label}
    </div>
  );
}

function TaskProgress(props) {
  const toProgress = (value) => {
    return Math.floor(value * 100);
  };
  const { value, total, current } = { ...props };
  const useValue = typeof value !== 'undefined';
  const content = useValue ? `${toProgress(value)}%` : `${current}/${total}`;
  const ratio = useValue ? value : current / total;
  return (
    <div>
      <div className="feature-schedule-tasklist-progress">
        <div
          style={{
            width: `${toProgress(ratio)}%`,
            background: '#0ee37d',
          }}
        ></div>
        <div
          style={{
            width: '100%',
            zIndex: 999,
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
}

const DAYMILI = 24 * 3600 * 1000;

const numberOfWeekDay = (startDay, endDay, day) => {
  startDay = new Date(
    startDay.getTime() + ((day - getWeek(startDay) + 7) % 7) * DAYMILI,
  );
  endDay = new Date(
    endDay.getTime() - ((getWeek(endDay) - day + 7) % 7) * DAYMILI,
  );
  console.log(startDay, endDay);

  return (
    Math.floor((endDay.getTime() - startDay.getTime()) / (7 * DAYMILI)) + 1
  );
};

function State(props) {
  const { task } = { ...props };
  const today = new Date();

  const showMin = (m) => {
    let res = m >= 60 * 24 ? `${Math.floor(m / (60 * 24))}d, ` : ``;
    return `${res}${Math.floor(m / 60) % 24}h, ${m % 60}min`;
  };

  const calLectureProgress = (lecture) => {
    let [total, cur] = [0, 0];
    for (let t of lecture.intervals) {
      total += numberOfWeekDay(lecture.startDate, lecture.dueDate, t.day);
      cur += numberOfWeekDay(lecture.startDate, today, t.day);
    }

    return [cur, total];
  };

  const calDayProgress = (task) => {
    let total =
      Math.floor(
        (task.dueDate.getTime() - task.startDate.getTime()) / DAYMILI,
      ) + 1;
    let curNum =
      Math.floor(
        Math.max(today.getTime() - task.startDate.getTime()) / DAYMILI,
        0,
      ) + 1;
    if (task.repeat == 'WEEK') {
      total = Math.floor(total / 7) + 1;
      curNum = Math.floor(curNum / 7) + 1;
    }
    curNum = Math.min(curNum, total);
    return [curNum, total];
  };

  const calWatiHour = (task) => {
    // if none perioded repeat, return time to next
    if (task.repeat == 'DAY') {
      const time =
        (today.getTime() - task.startTime.getTime() + DAYMILI) % DAYMILI;
      return Math.floor(time / (60 * 1000));
    } else if (task.repeat == 'WEEK') {
      const time = (getWeek(today) - getWeek(task.startDate) + 7) % 7;
      return time * 24 * 60;
    }

    return Math.floor(
      (mergeDate(task.startDate, task.startTime).getTime() - today.getTime()) /
        (60 * 1000),
    );
  };

  const calTimeProgress = (task) => {
    if (mergeDate(task.startDate, task.endTime).getTime() < today.getTime()) {
      return -1;
    }
    return (
      (today.getTime() - mergeDate(task.startDate, task.startTime).getTime()) /
      (task.endTime.getTime() - task.startTime.getTime())
    );
  };

  const tastState = (task) => {
    if (task.taskType == 'LECTURE') {
      const [curNum, total] = calLectureProgress(task);
      return <TaskProgress current={curNum} total={total} />;
    }
    if (task.period) {
      const [curNum, total] = calDayProgress(task);
      return <TaskProgress current={curNum} total={total} />;
    }
    let waitTime = calWatiHour(task);
    if (waitTime < 0) {
      let timeProgress = calTimeProgress(task);
      if (timeProgress < 0) {
        return `Passed`;
      }
      return <TaskProgress value={timeProgress} />;
    }
    return `begin in ${showMin(waitTime)}`;
  };

  return <>{tastState(task)}</>;
}

export default function TaskList(props) {
  const { tasks, selected, handleSelect } = { ...props };
  const { removeTask, removeTaskPending } = useRemoveTask();

  const formatDate = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}, ${date.getFullYear()}`;
  };

  const formatPeriod = (task) => {
    return !task.period
      ? `${formatDate(task.startDate)}`
      : `${formatDate(task.startDate)} ~ ${formatDate(task.dueDate)}`;
  };

  const formatTime = (task) => {
    if (task.taskType == 'TASK') {
      return `${getMinutes(task.startTime)} ~ ${getMinutes(task.endTime)}`;
    }
    return ``;
  };

  const handleDelete = (e, id) => {
    removeTask(id);
    if (id == selected) {
      handleSelect(id);
    }
    e.stopPropagation();
  };

  const header = ['Task', 'Period', 'Time', 'State', 'Tag', 'Action'];

  return (
    <Paper
      square
      className="feature-schedule-tasklist-container"
      variant="outlined"
    >
      <div>
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          Lecture and Task
        </Typography>
      </div>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {header.map((item) => (
              <TableCell align="center">
                <Typography>{item}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((item, i) => (
            <TableRow
              className={
                item.id == selected
                  ? 'feature-schedule-tasklist-row-selected'
                  : ''
              }
              onClick={(e) => handleSelect(item.id)}
            >
              <TableCell align="center">{item.title}</TableCell>
              <TableCell align="center">{formatPeriod(item)}</TableCell>
              <TableCell align="center">{formatTime(item)}</TableCell>
              <TableCell align="center" style={{ width: 160 }}>
                {<State task={item} />}
              </TableCell>
              <TableCell align="center" style={{ maxWidth: 200 }}>
                {item.taskType == 'TASK'
                  ? item.tags.map((tag, i) => <Tag tag={tag} />)
                  : null}
              </TableCell>
              <TableCell align="center">
                <PendIconButton
                  disabled={removeTaskPending}
                  onClick={(e) => handleDelete(e, item.id)}
                >
                  <DeleteForeverIcon />
                </PendIconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
