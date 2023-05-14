import sortDirections from 'constants/sortDirections';
import { useState } from 'react';
import { Col, ListGroup, ListGroupItem, Row } from 'reactstrap';

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
            style={{ cursor: 'pointer' }}>
            <ListGroup horizontal>
              <ListGroupItem className='p-0 border-0'>{column.Title}</ListGroupItem>
              <ListGroupItem  className='p-0 border-0'>{handleSortIcon(index)}</ListGroupItem>
            </ListGroup>
          </th>
        ) : (
          <th key={`th${index}`}>{column.Title}</th>
        )
      )}
    </tr>
  );
};

export default TableHeader;
