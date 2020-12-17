import React from "react";
import Filter from "./Filter";

const Table = (props) => {
  const cols = props.cols;
  const rows = props.rows;

  return (
    <table>
      <thead>
        <tr>
          {cols.map((col, index) => {
            return (
              <th key={index}>
                <div>{col.label}</div>
                {col.filter && (
                  <div>
                    <Filter onFilter = {props.onFilter} settings={col}></Filter>
                  </div>
                )}
              </th>
            );
          })}
          <th>{"ACTIONS"}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rindex) => {
          return (
            <tr key={rindex}>
              {cols.map((col, cindex) => {
                return <td key={cindex}>{row[col.coloumnName]}</td>;
              })}
              <td>
                <button
                  onClick={() => props.onEdit(row)}
                  type="button"
                  className="btn btn-primary"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => props.onDelete(row)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

Table.defaultProps = {
  cols: [],
  rows: [],
};

export default Table;
