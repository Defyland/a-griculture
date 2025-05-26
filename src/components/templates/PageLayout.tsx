import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { PageLayoutProps } from './types/PageLayout.types';
import {
  MenuIcon,
  LayoutContainer,
  Header,
  HeaderContent,
  Logo,
  Nav,
  NavLink,
  Main,
  Footer,
  Overlay
} from './styles/PageLayout.styles';
import { Typography } from '../atoms/Typography';

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location]);

  // Verifica se o caminho atual corresponde à rota do link
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <LayoutContainer>
      <Header scrolled={scrolled}>
        <HeaderContent>
          <Logo to="/" scrolled={scrolled}>
            <Typography 
              variant="body1" 
              noMargin 
              style={{ 
                marginRight: '8px', 
                fontSize: '1.3em',
                animation: 'fadeIn 1s ease-out'
              }}
            >
              🌱
            </Typography>
            Challenger
          </Logo>
          
          <MenuIcon isOpen={isOpen} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </MenuIcon>
          
          <Nav isOpen={isOpen}>
            <NavLink to="/" active={isActive('/')}>
              <Typography variant="body1" style={{ 
                fontWeight: isActive('/') ? 600 : 400,
                opacity: isActive('/') ? 1 : 0.85,
                color: 'white'
              }}>
                Dashboard
              </Typography>
            </NavLink>
            <NavLink to="/produtores" active={isActive('/produtores')}>
              <Typography variant="body1" style={{ 
                fontWeight: isActive('/produtores') ? 600 : 400,
                opacity: isActive('/produtores') ? 1 : 0.85,
                color: 'white'
              }}>
                Produtores
              </Typography>
            </NavLink>
            <NavLink to="/propriedades" active={isActive('/propriedades')}>
              <Typography variant="body1" style={{ 
                fontWeight: isActive('/propriedades') ? 600 : 400,
                opacity: isActive('/propriedades') ? 1 : 0.85,
                color: 'white'
              }}>
                Propriedades
              </Typography>
            </NavLink>
            <NavLink to="/safras" active={isActive('/safras')}>
              <Typography variant="body1" style={{ 
                fontWeight: isActive('/safras') ? 600 : 400,
                opacity: isActive('/safras') ? 1 : 0.85,
                color: 'white'
              }}>
                Safras
              </Typography>
            </NavLink>
          </Nav>
        </HeaderContent>
      </Header>
      
      <Overlay isOpen={isOpen} onClick={closeMenu} />
      
      <Main>
        {children}
      </Main>
      
      <Footer>
        <Typography 
          variant="caption" 
          color="secondary" 
          align="center"
        >
          &copy; {new Date().getFullYear()} Challenger - Sistema de Gestão Agropecuária
        </Typography>
      </Footer>
    </LayoutContainer>
  );
};

export default PageLayout; 