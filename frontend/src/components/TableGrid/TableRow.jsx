const TableRow = ({ columns, data }) => {
  if (data.length < 1) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} className='text-center'>
            No rows found
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((row, i) => (
        <tr key={`row${i}`}>
          {columns.map((cell, cellIndex) => (
            <td className={cell.cellClassName || null} key={`cell${cellIndex}`}>
              {cell.cellFormat
                ? cell.cellFormat(row[cell.accessor])
                : row[cell.accessor]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableRow;
