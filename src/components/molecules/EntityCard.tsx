import React from 'react';
import styled from 'styled-components';
import { Typography, Card } from '../atoms';
import ActionMenu from './ActionMenu';

export interface EntityCardProps {
  id: string;
  title: string;
  onClick?: () => void;
  actions?: {
    menuOptions: Array<{
      label: string;
      icon?: string;
      onClick: () => void;
      isDanger?: boolean;
    }>;
  };
  headerContent?: React.ReactNode;
  mainContent: React.ReactNode;
  chartContent?: React.ReactNode;
  className?: string;
}

const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 360px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border-radius: 18px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.07);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  position: relative;
  background: white;
  border: none;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.12);
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #4CAF50, #2196F3);
    border-radius: 18px 18px 0 0;
  }
`;

const CardHeader = styled.div`
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.md}`};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 64px;
  position: relative;
  z-index: 1;
  background: linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(245,247,250,1) 100%);
`;

const CardHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CardTitle = styled(Typography)`
  line-height: 1.4;
  font-weight: 600;
  max-width: 75%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #243B53;
`;

const CardBody = styled.div`
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.lg}`};
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 150px;
  justify-content: space-between;
  background: white;
  position: relative;
`;

const ChartContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  height: 180px;
  background: linear-gradient(180deg, rgba(245,247,250,0.5) 0%, rgba(255,255,255,1) 100%);
  margin-top: auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 18px 18px;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, rgba(0,0,0,0.03), rgba(0,0,0,0.08), rgba(0,0,0,0.03));
  }
  
  & > div {
    width: 100% !important;
    height: 100% !important;
  }
`;

export const EntityCard: React.FC<EntityCardProps> = ({
  id,
  title,
  onClick,
  actions,
  headerContent,
  mainContent,
  chartContent,
  className
}) => {
  // Evitar propagação de cliques para ações
  const handleContainerClick = () => {
    if (onClick) onClick();
  };
  
  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <CardContainer onClick={handleContainerClick} className={className}>
      <CardHeader>
        <CardTitle variant="h5" weight="bold" noMargin>
          {title}
        </CardTitle>
        
        <CardHeaderActions>
          {headerContent}
          
          {actions && (
            <div onClick={handleActionClick}>
              <ActionMenu
                id={id}
                options={actions.menuOptions}
                title={`Ações - ${title}`}
              />
            </div>
          )}
        </CardHeaderActions>
      </CardHeader>
      
      <CardBody>
        {mainContent}
      </CardBody>
      
      {chartContent && (
        <ChartContainer onClick={handleActionClick}>
          {chartContent}
        </ChartContainer>
      )}
    </CardContainer>
  );
};

export default EntityCard; 