import React from 'react';
import styled from 'styled-components';

interface DetailLabelProps {
  children: React.ReactNode;
  className?: string;
}

const StyledDetailLabel = styled.span`
  margin-right: 8px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

export const DetailLabel: React.FC<DetailLabelProps> = ({ children, className }) => {
  return (
    <StyledDetailLabel className={className}>
      {children}
    </StyledDetailLabel>
  );
};

export default DetailLabel; 