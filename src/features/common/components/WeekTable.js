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

  const config = { cellHeight: 60, cellWidth: 140, paddingX: 60, paddingY: 60 };

  const headDates = genWeekDates(getWeekStart(new Date()));
  const weekNames = getWeekNames();

  const makeDateHead = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()} (${
      weekNames[getWeek(date)]
    })`;
  };

  const resolveX = (h, m) => {};

  const makeBody = (date) => {
    let res = [];
    [...Array(24).keys()].forEach((i) => res.push([...Array(7).keys()]));

    return res;
  };

  const body = makeBody();

  return (
    <div className="common-table-container">
      <div className="common-task-base" style={{}}>
        I'm on top of the table
      </div>
      <div style={{ display: 'flex' }}>
        <TableContainer component={Paper} className="common-weektable">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow style={{ height: config.headHeight }}>
                <TableCell>TIME</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(24).keys()].map((item) => (
                <TableRow
                  align="center"
                  style={{ width: config.cellWidth }}
                ></TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper} className="common-weektable">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow style={{ height: config.headHeight }}>
                <TableCell>TIME</TableCell>
                {headDates.map((item) => (
                  <TableCell align="center" style={{ width: config.cellWidth }}>
                    {makeDateHead(item)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {body.map((row, i) => (
                <TableRow key={i}>
                  {row.map((d, j) => (
                    <TableCell align="center" style={{ padding: 1 }}>
                      {d}
                    </TableCell>
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
