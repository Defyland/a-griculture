import React from 'react';
import type { ReactNode } from 'react';
import {
  TableContainer,
  TableWrapper,
  StyledTable,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell
} from './styles/DataTable.styles';
import type { Column, DataTableProps } from './types/DataTable.types';

function DataTable<T>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  sortField,
  sortDirection = 'asc',
  onSort
}: DataTableProps<T>) {
  const handleHeaderClick = (column: Column<T>) => {
    if (column.sortable && onSort) {
      onSort(column.sortField || column.key);
    }
  };
  
  return (
    <TableContainer>
      <TableWrapper>
        <StyledTable>
          <TableHeader>
            <tr>
              {columns.map((column) => (
                <TableHeaderCell
                  key={column.key}
                  $sortable={column.sortable}
                  onClick={() => handleHeaderClick(column)}
                >
                  {column.header} {column.sortable && sortField === (column.sortField || column.key) && (
                    sortDirection === 'asc' ? '↑' : '↓'
                  )}
                </TableHeaderCell>
              ))}
            </tr>
          </TableHeader>
          <tbody>
            {data.map((item, index) => (
              <TableRow
                key={keyExtractor(item)}
                $clickable={!!onRowClick}
                $isOdd={index % 2 === 1}
                onClick={() => onRowClick && onRowClick(item)}
              >
                {columns.map((column) => (
                  <TableCell key={`${keyExtractor(item)}-${column.key}`}>
                    {column.render ? column.render(item) : (item as Record<string, ReactNode>)[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </TableContainer>
  );
}

export default DataTable; 