import { Input } from 'reactstrap';

const TableFilter = ({ columns, filters, onFilter }) => {
  const handleFilter = (accessor, value) => {
    onFilter({ ...filters, [accessor]: value });
  };

  return (
    <tr>
      {columns.map((column, index) => (
        <th key={`thFilter${index}`}>
          {column.isFilterable !== false && (
            <Input
              placeholder={`${column.Title} Search`}
              bsSize='sm'
              onChange={(e) => handleFilter(column.accessor, e.target.value)}
            />
          )}
        </th>
      ))}
    </tr>
  );
};

export default TableFilter;
