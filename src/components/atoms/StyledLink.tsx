import React from 'react';
import styled from 'styled-components';

interface StyledLinkProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  className?: string;
}

const StyledLinkElement = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.secondary};
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledLink: React.FC<StyledLinkProps> = ({ children, onClick, className }) => {
  return (
    <StyledLinkElement onClick={onClick} className={className}>
      {children}
    </StyledLinkElement>
  );
};

export default StyledLink; 