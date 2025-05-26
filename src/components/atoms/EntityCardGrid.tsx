import React from 'react';
import styled from 'styled-components';

interface EntityCardGridProps {
  children: React.ReactNode;
  columns?: number;
  className?: string;
}

const GridContainer = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, minmax(300px, 1fr));
  gap: 32px;
  padding: 24px 0;
  width: 100%;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -30px;
    right: -30px;
    bottom: 0;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 5%,
      rgba(255, 255, 255, 0) 95%,
      rgba(255, 255, 255, 1) 100%
    );
    pointer-events: none;
    z-index: -1;
  }
  
  @media (max-width: 1440px) {
    grid-template-columns: repeat(${({ columns }) => Math.min(columns, 3)}, minmax(300px, 1fr));
  }
  
  @media (max-width: 1100px) {
    grid-template-columns: repeat(${({ columns }) => Math.min(columns, 2)}, minmax(300px, 1fr));
    gap: 26px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    justify-content: center;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 16px 0;
  }
  
  /* Melhorar animação e layout dos cards */
  & > * {
    min-width: 0;
    width: 100%;
    opacity: 0;
    animation: fadeInUp 0.5s ease forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  & > *:nth-child(1) { animation-delay: 0.05s; }
  & > *:nth-child(2) { animation-delay: 0.1s; }
  & > *:nth-child(3) { animation-delay: 0.15s; }
  & > *:nth-child(4) { animation-delay: 0.2s; }
  & > *:nth-child(5) { animation-delay: 0.25s; }
  & > *:nth-child(6) { animation-delay: 0.3s; }
  & > *:nth-child(7) { animation-delay: 0.35s; }
  & > *:nth-child(8) { animation-delay: 0.4s; }
`;

/**
 * Grid de cards para entidades com espaçamento e layout padronizados com animação elegante
 */
export const EntityCardGrid: React.FC<EntityCardGridProps> = ({ 
  children, 
  columns = 3,
  className 
}) => {
  return (
    <GridContainer columns={columns} className={className}>
      {children}
    </GridContainer>
  );
};

export default EntityCardGrid; 