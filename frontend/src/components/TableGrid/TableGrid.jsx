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
      const val1 = a[sortColumn] ?? '';
      const val2 = b[sortColumn] ?? '';

      if (typeof val1 === 'number' && typeof val2 === 'number') {
        if (sortDirection === sortDirections.asc) {
          return val1 - val2;
        }
        return val2 - val1;
      }

      if (sortDirection === sortDirections.asc) {
        return val1.localeCompare(val2);
      }
      return val2.localeCompare(val1);
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
