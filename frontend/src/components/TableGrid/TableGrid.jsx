import { useEffect, useState } from 'react';
import { Table } from 'reactstrap';

import sortDirections, { getNextSortDirection } from 'constants/sortDirections';

import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableFilter from './TableFilter';

const TableGrid = ({
  columns,
  data,
  defaultSortColumn,
  defaultSortDirection = sortDirections.none
}) => {
  const [organized, setOrganized] = useState([]);
  const [filters, setFilters] = useState({});

  const [sortColumn, setSortColumn] = useState(defaultSortColumn); // accessor
  const [sortDirection, setSortDirection] = useState(defaultSortDirection);
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(getNextSortDirection(sortDirection));
      return;
    }
    setSortDirection(sortDirections.asc);
    setSortColumn(column);
  };

  useEffect(() => {
    let tempData = [...data];
    tempData = tempData.filter((record) => {
      return Object.entries(filters).reduce((isMatch, [accessor, value]) => {
        if (!isMatch) {
          return false;
        }

        let currCol = columns.find((column) => column.accessor === accessor);

        let searchValue = String(record[accessor] || '');
        if (currCol.searchValue) {
          searchValue = currCol.searchValue(record[accessor]);
        }

        return searchValue.toLowerCase().includes(value.toLowerCase());
      }, true);
    });

    if (sortDirection === sortDirections.none) {
      setOrganized(tempData);
      return;
    }

    tempData = tempData.sort((a, b) => {
      if (
        typeof a[sortColumn] === 'number' &&
        typeof b[sortColumn] === 'number'
      ) {
        if (sortDirection === sortDirections.asc) {
          return a[sortColumn] - b[sortColumn];
        }
        return b[sortColumn] - a[sortColumn];
      }

      if (sortDirection === sortDirections.asc) {
        return a[sortColumn].localeCompare(b[sortColumn]);
      }
      return b[sortColumn].localeCompare(a[sortColumn]);
    });
    setOrganized(tempData);
  }, [columns, data, filters, sortColumn, sortDirection]);

  return (
    <>
      <Table responsive>
        <thead>
          <TableHeader
            columns={columns}
            sortDirection={sortDirection}
            onSortColumn={handleSort}
          />
          <TableFilter
            columns={columns}
            filters={filters}
            onFilter={setFilters}
          />
        </thead>
        <TableRow columns={columns} data={organized} />
      </Table>
    </>
  );
};

export default TableGrid;
