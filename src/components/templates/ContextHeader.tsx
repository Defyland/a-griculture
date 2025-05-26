import React from 'react';
import styled from 'styled-components';
import { Typography } from '../atoms';

interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

interface ContextHeaderProps {
  title: string;
  subtitle?: React.ReactNode;
  backButton?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

const Container = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Title = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: 0.9rem;
`;

const BreadcrumbSeparator = styled.span`
  margin: 0 ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const BreadcrumbLink = styled.span<{ isActive?: boolean }>`
  color: ${({ theme, isActive }) => isActive ? theme.colors.text : theme.colors.primary};
  cursor: ${({ isActive }) => isActive ? 'default' : 'pointer'};
  font-weight: ${({ isActive, theme }) => isActive ? theme.fontWeights.medium : theme.fontWeights.regular};
  text-decoration: ${({ isActive }) => isActive ? 'none' : 'underline'};
  
  &:hover {
    text-decoration: ${({ isActive }) => isActive ? 'none' : 'underline'};
  }
`;

export const ContextHeader: React.FC<ContextHeaderProps> = ({
  title,
  subtitle,
  backButton,
  actions,
  breadcrumbs
}) => {
  return (
    <Container>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs>
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
              <BreadcrumbLink isActive={item.isActive}>
                {item.label}
              </BreadcrumbLink>
            </React.Fragment>
          ))}
        </Breadcrumbs>
      )}
      
      <HeaderTop>
        <div>
          {backButton}
        </div>
        
        <HeaderActions>
          {actions}
        </HeaderActions>
      </HeaderTop>
      
      <Title>
        <Typography variant="h3" weight="bold" noMargin>
          {title}
        </Typography>
      </Title>
      
      {subtitle && (
        <div>{subtitle}</div>
      )}
    </Container>
  );
};

export default ContextHeader; 