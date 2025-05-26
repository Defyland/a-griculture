import styled from 'styled-components';
import { Button } from '../../atoms';

export const ConfirmDeleteContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const ConfirmDeleteMessage = styled.div`
  text-align: center;
  
  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`;

export const ConfirmDeleteWarning = styled.div`
  background-color: ${({ theme }) => theme.colors.danger}10;
  border: 1px solid ${({ theme }) => theme.colors.danger}30;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.md};
  
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.danger};
    font-size: ${({ theme }) => theme.fontSizes.small};
    line-height: 1.5;
  }
`;

export const ConfirmDeleteDetails = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ConfirmDeleteActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const CancelButton = styled(Button)`
  min-width: 100px;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundDarker};
  }
`;

export const DeleteButton = styled(Button)`
  min-width: 100px;
  background-color: ${({ theme }) => theme.colors.danger};
  border-color: ${({ theme }) => theme.colors.danger};
  color: white;
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.dangerDark || '#c62828'};
    border-color: ${({ theme }) => theme.colors.dangerDark || '#c62828'};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.danger}40;
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px ${({ theme }) => theme.colors.danger}40;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`; 