import styled from 'styled-components';
import { animated } from 'react-spring';
import type { TableRowProps } from '../types/DataTable.types';

export const TableContainer = styled.div`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.card};
  background-color: white;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundDarker};
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: 6px;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

export const TableHeader = styled.thead`
  background-color: ${({ theme }) => theme.colors.backgroundDarker};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TableHeaderCell = styled.th<{ $sortable?: boolean }>`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: left;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.small};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: ${({ $sortable }) => ($sortable ? 'pointer' : 'default')};
  
  &:hover {
    color: ${({ theme, $sortable }) => $sortable ? theme.colors.primary : theme.colors.textSecondary};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: 0.75rem;
  }
`;

export const TableRow = styled(animated.tr)<TableRowProps>`
  transition: all 0.2s ease;
  position: relative;
  background-color: ${({ $isOdd, theme }) => 
    $isOdd ? theme.colors.backgroundDarker : theme.colors.white};
  
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  }
`;

export const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  vertical-align: middle;
  
  &:last-child {
    position: relative;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: 0.875rem;
  }
`; 