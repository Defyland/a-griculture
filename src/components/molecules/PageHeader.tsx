import React from 'react';
import styled from 'styled-components';
import { Typography, Button } from '../atoms';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actionButton?: {
    label: string;
    onClick: () => void;
    icon?: string;
  };
  refreshButton?: {
    onClick: () => void;
  };
}

const HeaderContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TitleContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Subtitle = styled(Typography)`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  actionButton,
  refreshButton
}) => {
  return (
    <HeaderContainer>
      <TitleRow>
        <TitleContent>
          <Typography variant="h2">{title}</Typography>
          {subtitle && (
            <Subtitle variant="body1">{subtitle}</Subtitle>
          )}
        </TitleContent>
        
        <ButtonsContainer>
          {refreshButton && (
            <Button
              variant="text"
              onClick={refreshButton.onClick}
              icon="🔄 "
            >
              Atualizar
            </Button>
          )}
          
          {actionButton && (
            <Button
              variant="primary"
              onClick={actionButton.onClick}
              icon={actionButton.icon}
            >
              {actionButton.label}
            </Button>
          )}
        </ButtonsContainer>
      </TitleRow>
    </HeaderContainer>
  );
};

export default PageHeader; 