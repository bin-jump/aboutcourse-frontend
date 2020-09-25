import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getWeek, getWeekNames } from '../util';
import './WeekTable.less';

const getWeekStart = (date) => {
  let wk = getWeek(date);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - wk);
};

const genWeekDates = (date) => {
  let res = [];
  console.log(date);
  [...Array(7).keys()].forEach((i) => {
    res.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + i));
  });

  return res;
};

function WeekCell(props) {
  const { date } = { ...props };

  return (
    <div style={{ height: 120, background: 'grey' }}>{`${
      date.getMonth() + 1
    }/${date.getDate()}`}</div>
  );
}

export default function WeekTable(props) {
  const {} = { ...props };

  let tasks = [
    {
      start: new Date(new Date().getFullYear(), 8, 25, 10, 0),
      end: new Date(new Date().getFullYear(), 8, 25, 12, 20),
    },
  ];
  const config = { cellHeight: 60, cellWidth: 120, timeWidth: 70 };
  const headDates = genWeekDates(getWeekStart(new Date()));
  const weekNames = getWeekNames();

  const makeDateHead = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()} (${
      weekNames[getWeek(date)]
    })`;
  };

  const resolveY = (start) => {
    let ht = config.cellHeight + start.getHours() * config.cellHeight;
    ht += Math.ceil((start.getMinutes() * config.cellHeight) / 60);
    return ht;
  };

  const resolveX = (start) => {
    let w = config.timeWidth + getWeek(start) * config.cellWidth;
    return w;
  };

  // TODO: update for overlap
  const resolveW = (d) => {
    return config.cellWidth;
  };

  const resolveH = (start, end) => {
    // end should not exceed current day
    end = new Date(
      Math.min.apply(null, [
        end,
        new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          23,
          59,
        ),
      ]),
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
    <div>
      <div style={{ display: 'flex', backgroundColor: 'white' }}>
        {/* <TableContainer className="common-weektable-time" style={{ width: 80 }}>
          <Table aria-label="simple table">
            <TableHead style={{ backgroundColor: '#f5f6f8' }}>
              <TableRow style={{ height: config.cellHeight }}>
                <TableCell style={{ borderBottom: 'none' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(24).keys()].map((i) => (
                <TableRow align="center" style={{ height: config.cellHeight }}>
                  <TableCell
                    align="center"
                    style={{
                      height: config.cellHeight,
                      borderBottom: 'none',
                      valign: 'top',
                    }}
                  >
                    {i}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
        <div className="common-table-container">
          {/* task list */}
          {tasks.map((item) => (
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
              <TableBody>
                {body.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell
                      style={{
                        borderBottom: 'none',
                      }}
                    >
                      {i}
                    </TableCell>
                    {row.map((d, j) => (
                      <TableCell
                        align="center"
                        style={{
                          borderLeft: j > 0 ? 'solid 1px #e1e5e9' : '',
                          height: config.cellHeight,
                          width: config.cellWidth,
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
    </div>
  );
}
