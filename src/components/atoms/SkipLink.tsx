import React from 'react';
import styled from 'styled-components';

const StyledSkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 6px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 8px;
  z-index: 1000;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  
  &:focus {
    top: 6px;
  }
`;

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

export const SkipLink: React.FC<SkipLinkProps> = ({ href, children }) => {
  return (
    <StyledSkipLink href={href}>
      {children}
    </StyledSkipLink>
  );
}; 