const TableCells = ({ data, format, cellClass }) =>
  data.map((value, index) => (
    <td key={`td${index}`} className={cellClass[index] || 'text-nowrap'}>
      {format[index] ? format[index](value) : value}
    </td>
  ));

export default TableCells;
