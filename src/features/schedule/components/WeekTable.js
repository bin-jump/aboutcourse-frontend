import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { getWeek, getWeekNames } from '../../common/util';
import './WeekTable.less';

const getWeekStart = (date) => {
  let wk = getWeek(date);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - wk);
};

const genWeekDates = (date) => {
  let res = [];
  [...Array(7).keys()].forEach((i) => {
    res.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + i));
  });

  return res;
};

export default function WeekTable(props) {
  const { bodyHeight, weekDate, tasks } = { ...props };

  let taskList = tasks || [];

  const config = { cellHeight: 60, cellWidth: 100, timeWidth: 70, colSpace: 1 };
  const weekStart = getWeekStart(weekDate || new Date());
  const weekEnd = new Date(weekStart.getTime() + 7 * 60000 * 60 * 24);
  const headDates = genWeekDates(weekStart);
  const weekNames = getWeekNames();

  const validTask = (task) => {
    return (
      weekStart.getTime() <= task.start.getTime() &&
      task.start.getTime() < weekEnd.getTime()
    );
  };

  const filterTasks = (tasks) => {
    return tasks.filter((t) => validTask(t));
  };

  const makeDateHead = (date) => {
    let today = new Date();
    let isToday =
      today.getFullYear() == date.getFullYear() &&
      today.getMonth() == date.getMonth() &&
      today.getDate() == date.getDate();
    return (
      <div style={{ display: 'flex' }}>
        <Typography
          variant="subtitle1"
          style={{
            padding: '0 5px',
            fontWeight: 'bold',
            marginRight: 5,
            background: isToday ? '#dafbeb' : null,
            color: isToday ? '#61e9a3' : null,
            borderRadius: 12,
          }}
        >
          {`${date.getMonth() + 1}/${date.getDate()}`}
        </Typography>
        <Typography variant="subtitle1">{`${
          weekNames[getWeek(date)]
        }`}</Typography>
      </div>
    );
  };

  const resolveY = (start) => {
    let ht = start.getHours() * config.cellHeight;
    ht += Math.ceil((start.getMinutes() * config.cellHeight) / 60);
    return ht;
  };

  const resolveX = (start) => {
    let w = config.timeWidth + getWeek(start) * config.cellWidth;
    //w -= config.colSpace * getWeek(start) * 2;
    return w;
  };

  // TODO: update for overlap
  const resolveW = (d) => {
    return config.cellWidth;
  };

  const resolveH = (start, end) => {
    // end should not exceed current day
    end = new Date(
      Math.min(
        end.getTime(),
        new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          23,
          59,
        ).getTime(),
      ),
    );
    let diff = Math.ceil(Math.abs(start - end) / 60000);
    return Math.ceil((diff * config.cellHeight) / 60);
  };

  const makeBody = (date) => {
    let res = [];
    [...Array(24).keys()].forEach((i) => res.push([...Array(7).keys()]));

    return res;
  };

  const body = makeBody();

  return (
    <div className="common-weektable-root">
      <TableContainer className="common-weektable">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow style={{ height: config.cellHeight }}>
              <TableCell
                style={{
                  borderBottom: 'none',
                  width: config.timeWidth,
                }}
              ></TableCell>
              {headDates.map((item) => (
                <TableCell
                  align="center"
                  style={{
                    width: config.cellWidth,
                    borderBottom: 'none',
                  }}
                >
                  {makeDateHead(item)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <div
        className="common-table-container"
        style={{ height: bodyHeight ? bodyHeight : null }}
      >
        {/* task list */}
        {filterTasks(taskList).map((item) => (
          <div
            className="common-task-base"
            style={{
              top: resolveY(item.start),
              left: resolveX(item.start),
              height: resolveH(item.start, item.end),
              width: resolveW(item.start),
            }}
          >
            task
          </div>
        ))}
        <TableContainer className="common-weektable">
          <Table aria-label="simple table">
            <TableBody>
              {body.map((row, i) => (
                <TableRow key={i}>
                  <TableCell
                    align="center"
                    style={{
                      verticalAlign: 'top',
                      borderBottom: 'none',
                      width: config.timeWidth,
                      padding: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      gutterBottom
                      style={{ marginTop: -10, color: '#cad4da' }}
                    >
                      {i > 0 ? `${i}:00` : null}
                    </Typography>
                  </TableCell>
                  {row.map((d, j) => (
                    <TableCell
                      align="center"
                      style={{
                        borderLeft: j > 0 ? 'solid 1px #e1e5e9' : '',
                        height: config.cellHeight,
                        width: config.cellWidth,
                        borderBottom: 'none',
                        borderTop: i > 0 ? 'solid 1px #e1e5e9' : 'none',
                      }}
                    ></TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
