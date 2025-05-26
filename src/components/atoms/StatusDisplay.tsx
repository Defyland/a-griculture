import React from 'react';
import styled from 'styled-components';

export type StatusType = 'ativa' | 'concluida' | 'planejada';

interface StatusDisplayProps {
  status: StatusType;
  children: React.ReactNode;
  className?: string;
}

const StyledStatusDisplay = styled.span<{ status: StatusType }>`
  padding: 4px 8px;
  border-radius: 50px;
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${({ status, theme }) => 
    status === 'ativa' 
      ? theme.colors.successLighter 
      : status === 'concluida' 
        ? theme.colors.primaryLighter 
        : theme.colors.warningLighter
  };
  color: ${({ status, theme }) => 
    status === 'ativa' 
      ? theme.colors.success 
      : status === 'concluida' 
        ? theme.colors.primary 
        : theme.colors.warning
  };
`;

export const StatusDisplay: React.FC<StatusDisplayProps> = ({ status, children, className }) => {
  return (
    <StyledStatusDisplay status={status} className={className}>
      {children}
    </StyledStatusDisplay>
  );
};

export default StatusDisplay; 