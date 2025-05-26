import React from 'react';

export interface PageLayoutProps {
  children: React.ReactNode;
}

export interface MenuIconProps {
  isOpen: boolean;
}

export interface HeaderProps {
  scrolled: boolean;
}

export interface LogoProps {
  scrolled: boolean;
}

export interface NavProps {
  isOpen: boolean;
}

export interface NavLinkProps {
  active?: boolean;
} 