import React, { Fragment, useEffect, useState } from 'react';
import {
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
  Row,
  Col,
  Form,
  FormGroup
} from 'reactstrap';

import TableCells from './TableCells';

import style from './DataTable.module.css';

const DataTable = ({
  defaultSort = 0,
  defaultSortDirection = false,
  ...props
}) => {
  // data
  const [visibleRows, setVisibleRows] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState([defaultSort, defaultSortDirection]); //column index , true = desc
  const [numberOfRows, setNumberOfRows] = useState(10);
  const [rowCount, setRowCount] = useState();
  const [filters, setFilters] = useState(
    new Array(props.columns.length).fill('')
  );

  useEffect(() => {
    let rows = props.rows;
    // Filter
    rows = rows.filter((row) => {
      let pass = true;
      let str = '';
      for (let i = 0; i < row.length; i++) {
        str = ConvertToString(row[i]).toLowerCase();
        if (!str.includes(filters[i] ? filters[i].toLowerCase() : '')) {
          pass = false;
        }
      }
      return pass;
    });
    // Sort
    rows = rows.sort((a, b) => {
      if (typeof a[sort[0]] === 'number' && typeof b[sort[0]] === 'number') {
        const num1 = a[sort[0]];
        const num2 = b[sort[0]];
        if (num1 > num2) {
          return sort[1] ? -1 : 1;
        } else if (num1 < num2) {
          return sort[1] ? 1 : -1;
        } else {
          return 0;
        }
      } else {
        const str1 = ConvertToString(a[sort[0]]).toUpperCase();
        const str2 = ConvertToString(b[sort[0]]).toUpperCase();
        if (str1 > str2) {
          return sort[1] ? -1 : 1;
        } else if (str1 < str2) {
          return sort[1] ? 1 : -1;
        } else {
          return 0;
        }
      }
    });
    setRowCount(rows.length);
    // Page
    let temprows = [];
    for (let i = (page - 1) * numberOfRows; i < numberOfRows * page; i++) {
      if (rows[i]) {
        temprows.push(rows[i]);
      }
    }
    setVisibleRows(temprows);
  }, [props.rows, filters, numberOfRows, page, sort]);

  const Columns = () => {
    let sorticon = '';
    const tableHead = props.columns.map((value, index) => {
      let title = value;

      if (typeof value != 'string') {
        title = value.title;
      }

      if (index === sort[0]) {
        if (sort[1]) {
          sorticon = <i className='fa fa-caret-down ml-1'></i>;
        } else {
          sorticon = <i className='fa fa-caret-up ml-1'></i>;
        }
      } else {
        sorticon = '';
      }
      if (props.withAction && props.columns.length - 1 === index) {
        return (
          <th scope='col' key={'th' + index} className='text-wrap'>
            {title}
          </th>
        );
      } else {
        return (
          <th
            scope='col'
            key={'th' + index}
            style={{ cursor: 'pointer' }}
            onClick={(e) =>
              setSort([index, index === sort[0] ? !sort[1] : false])
            }>
            {title}
            {sorticon}
          </th>
        );
      }
    });

    return (
      <Fragment>
        <thead className='text-nowrap'>
          <tr>{tableHead}</tr>
        </thead>
        <tfoot
          className='text-nowrap'
          style={{ borderTop: '0.0625rem solid #ddd' }}>
          <tr>{tableHead}</tr>
        </tfoot>
      </Fragment>
    );
  };

  const TableRows = () => {
    let rows = visibleRows.map((value, index) => {
      return (
        <tr key={'tr' + index}>
          <TableCells
            data={value}
            format={props.format}
            cellClass={props.cellClass}
          />
        </tr>
      );
    });
    if (rows.length > 0) {
      return <tbody>{rows}</tbody>;
    }
    return (
      <tbody>
        <tr>
          <td className='text-center text-muted' colSpan={props.columns.length}>
            No rows available
          </td>
        </tr>
      </tbody>
    );
  };

  const Search = () => {
    const tableHead = props.columns.map((value, index) => {
      if (props.withAction && props.columns.length - 1 === index) {
        return <th scope='col' key={'th' + index}></th>;
      }

      if (typeof value != 'string' && !value.isSearchable) {
        return <th scope='col' key={'th' + index}></th>;
      }

      return (
        <th scope='col' key={'th' + index}>
          <Input
            type='text'
            name={'txt' + value}
            id={'tblSearch' + index}
            placeholder={value + ' Search'}
            bsSize='sm'
            onChange={(e) => handleFilter(index, e)}
          />
        </th>
      );
    });
    return (
      <thead>
        <tr>{tableHead}</tr>
      </thead>
    );
  };

  const Paginate = () => {
    let numPages = [];
    let maxPage = Math.ceil(rowCount / numberOfRows);
    if (page > maxPage && maxPage !== 0) {
      setPage(maxPage);
    }
    let pagiStart = page - 1;
    let pagiEnd = page + 1;
    if (page === 1) {
      pagiStart = 1;
      pagiEnd = page + 1;
    }
    if (pagiEnd > maxPage) {
      pagiEnd = maxPage;
    }

    for (let i = pagiStart; i <= pagiEnd; i++) {
      if (page === i) {
        numPages.push(
          <PaginationItem active key={'pagination' + i}>
            <PaginationLink href={'#page' + i} onClick={() => setPage(i)}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else {
        numPages.push(
          <PaginationItem key={'pagination' + i}>
            <PaginationLink
              href={'#page' + i}
              onClick={() => setPage(i)}
              className={style.Pagination}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return (
      <Pagination
        className='pagination justify-content-end mb-0'
        listClassName='justify-content-end mb-0'>
        <PaginationItem disabled={false}>
          <PaginationLink href='#first' onClick={() => setPage(1)}>
            <i className={`fas fa-angle-double-left ${style.Pagination}`} />
            <span className='sr-only'>Previous</span>
          </PaginationLink>
        </PaginationItem>
        {numPages}
        <PaginationItem>
          <PaginationLink href='#last' onClick={() => setPage(maxPage)}>
            <i className={`fas fa-angle-double-right ${style.Pagination}`} />
            <span className='sr-only'>Next</span>
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    );
  };

  const handleFilter = (index, e) => {
    let tempFilter = filters;
    tempFilter[index] = e.target.value;
    setFilters([...tempFilter]);
  };

  const ConvertToString = (item) => {
    let output = '';
    if (item) {
      switch (typeof item) {
        case 'number':
          output = item.toString();
          break;
        case 'object':
          if (item.props.children) {
            for (let i = 0; i < item.props.children.length; i++) {
              if (typeof item.props.children[i] === 'string') {
                output += item.props.children[i];
              }
            }
          }
          break;
        case 'string':
          output = item;
          break;
        default:
          output = '';
          break;
      }
    }
    return output;
  };

  return (
    <>
      <Table responsive>
        {Columns()}
        {Search()}
        {TableRows()}
      </Table>
      <Row>
        <Col className='text-nowrap'>
          <Form inline>
            <FormGroup>
              Show
              <Input
                type='select'
                title='Number of Entries'
                className='mx-1 p-1'
                bsSize='sm'
                onChange={(e) => setNumberOfRows(e.target.value)}>
                <option>5</option>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </Input>
              entries
            </FormGroup>
          </Form>
        </Col>
        <Col>{rowCount < numberOfRows ? '' : Paginate()}</Col>
      </Row>
    </>
  );
};

DataTable.defaultProps = {
  format: {},
  cellClass: {}
};

export default DataTable;
