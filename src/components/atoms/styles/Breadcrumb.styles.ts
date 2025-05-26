import styled from 'styled-components';
import { Link } from 'react-router-dom';
import type { BreadcrumbLinkProps } from '../types/Breadcrumb.types';
import { FaHome } from 'react-icons/fa';

export const BreadcrumbWrapper = styled.nav`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const BreadcrumbContainer = styled.ol`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  margin: 0;
  list-style-type: none;
  flex-wrap: wrap;
`;

export const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
`;

export const BreadcrumbLink = styled(Link)<BreadcrumbLinkProps>`
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.primary : theme.colors.textSecondary};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: ${({ theme, $isActive }) => 
    $isActive ? theme.fontWeights.medium : theme.fontWeights.regular};
  display: flex;
  align-items: center;
  transition: color 0.2s, transform 0.1s;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};

  &:hover, &:focus {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const BreadcrumbText = styled.span`
  display: inline-block;
`;

export const HomeIcon = styled(FaHome)`
  font-size: 1rem;
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

export const Separator = styled.span`
  margin: 0 ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

// Estilo para leitores de tela
export const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`; 