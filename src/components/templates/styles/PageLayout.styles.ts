import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import type { MenuIconProps, HeaderProps, LogoProps, NavProps, NavLinkProps } from '../types/PageLayout.types';

// Animações refinadas
export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const slideInRight = keyframes`
  from { transform: translateX(10px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

export const slideInDown = keyframes`
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Ícone de menu com animação suave
export const MenuIcon = styled.div<MenuIconProps>`
  display: none;
  width: 24px;
  height: 20px;
  position: relative;
  cursor: pointer;
  z-index: 1001;
  transition: all ${({ theme }) => theme.transitions.medium};
  
  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: white;
    border-radius: 1px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: ${({ theme }) => theme.transitions.medium};
    
    &:nth-child(1) {
      top: ${({ isOpen }) => (isOpen ? '9px' : '0px')};
      transform: ${({ isOpen }) => (isOpen ? 'rotate(135deg)' : 'rotate(0deg)')};
      transform-origin: center;
    }
    
    &:nth-child(2) {
      top: 9px;
      opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
      transform: ${({ isOpen }) => (isOpen ? 'translateX(-10px)' : 'translateX(0)')};
    }
    
    &:nth-child(3) {
      top: ${({ isOpen }) => (isOpen ? '9px' : '18px')};
      transform: ${({ isOpen }) => (isOpen ? 'rotate(-135deg)' : 'rotate(0deg)')};
      transform-origin: center;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  animation: ${fadeIn} 0.4s ease-out;
`;

export const Header = styled.header<HeaderProps>`
  background-color: ${({ theme, scrolled }) => 
    scrolled ? 'rgba(52, 199, 89, 0.96)' : theme.colors.primary};
  color: white;
  height: ${({ theme, scrolled }) => 
    scrolled ? theme.elements.header.compactHeight : theme.elements.header.height};
  padding: 0;
  box-shadow: ${({ theme, scrolled }) => 
    scrolled ? theme.shadows.medium : 'none'};
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  transition: all ${({ theme }) => theme.transitions.medium};
  backdrop-filter: ${({ scrolled }) => scrolled ? 'blur(10px)' : 'none'};
`;

export const HeaderContent = styled.div`
  max-width: ${({ theme }) => theme.grid.container.xl};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  height: 100%;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

export const Logo = styled(Link)<LogoProps>`
  font-size: ${({ theme, scrolled }) => 
    scrolled ? theme.fontSizes.large : theme.fontSizes.xlarge};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all ${({ theme }) => theme.transitions.medium};
  
  &:hover {
    color: white;
    opacity: 0.9;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.large};
  }
`;

export const Nav = styled.nav<NavProps>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: ${({ theme }) => theme.elements.navSidebar.width};
    flex-direction: column;
    background-color: rgba(52, 199, 89, 0.97);
    padding: ${({ theme }) => theme.spacing.xxxl} ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform ${({ theme }) => theme.transitions.medium};
    box-shadow: ${({ theme, isOpen }) => (isOpen ? theme.shadows.large : 'none')};
    z-index: 1000;
    backdrop-filter: blur(10px);
    animation: ${({ isOpen }) => isOpen ? css`${slideInRight} 0.3s ease-out` : 'none'};
  }
`;

export const NavLink = styled(Link)<NavLinkProps>`
  color: white;
  text-decoration: none;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;
  font-weight: ${({ active, theme }) => active ? theme.fontWeights.semibold : theme.fontWeights.regular};
  opacity: ${({ active }) => active ? 1 : 0.85};
  
  &:after {
    content: '';
    position: absolute;
    width: ${({ active }) => (active ? '40%' : '0')};
    height: 2px;
    bottom: 3px;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    transition: width ${({ theme }) => theme.transitions.medium};
    border-radius: 1px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    opacity: 1;
    
    &:after {
      width: 40%;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md};
    width: 100%;
    text-align: left;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.large};
    
    &:after {
      display: none;
    }
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.15);
      padding-left: ${({ theme }) => theme.spacing.lg};
    }
  }
`;

export const Main = styled.main`
  flex: 1;
  max-width: ${({ theme }) => theme.grid.container.xl};
  margin: 0 auto;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};
  animation: ${slideInDown} 0.4s ease-out;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

export const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.backgroundDarker};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

export const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  backdrop-filter: blur(2px);
  animation: ${fadeIn} 0.2s ease-out;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`; 