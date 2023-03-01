import sortDirections from 'constants/sortDirections';
import { useState } from 'react';

const TableHeader = ({ columns, sortDirection, onSortColumn }) => {
  const sortIconAsc = <i className='fa fa-sort-up ml-1'></i>;
  const sortIconDesc = <i className='fa fa-sort-down ml-1'></i>;
  const sortIconNone = (
    <i className='fa fa-sort ml-1' style={{ color: '#ccc' }}></i>
  );

  const [sortColumnIndex, setSortColumnIndex] = useState(0);

  const handleSortIcon = (columnIndex) => {
    if (columnIndex !== sortColumnIndex) {
      return sortIconNone;
    }

    switch (sortDirection) {
      case sortDirections.asc:
        return sortIconAsc;
      case sortDirections.desc:
        return sortIconDesc;
      default:
        return sortIconNone;
    }
  };

  return (
    <tr>
      {columns.map((column, index) =>
        column.isSortable !== false ? (
          <th
            key={`th${index}`}
            onClick={() => {
              onSortColumn(column.accessor);
              setSortColumnIndex(index);
            }}
            style={{ cursor: 'pointer' }}
            className='text-nowrap'>
            {column.Title}
            {handleSortIcon(index)}
          </th>
        ) : (
          <th key={`th${index}`} className='text-nowrap'>
            {column.Title}
          </th>
        )
      )}
    </tr>
  );
};

export default TableHeader;
