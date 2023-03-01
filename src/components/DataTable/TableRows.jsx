import React from 'react';
import TableCells from './TableCells';

const TableRows = ({ data, colSpan, format, cellClass }) => (
  <tbody>
    {data.length > 0 &&
      data.map((value, index) => (
        <tr key={'tr' + index}>
          <TableCells data={value} format={format} cellClass={cellClass} />
        </tr>
      ))}

    {data.length <= 0 && (
      <tr>
        <td className='text-center text-muted' colSpan={colSpan}>
          No rows available
        </td>
      </tr>
    )}
  </tbody>
);

export default TableRows;
