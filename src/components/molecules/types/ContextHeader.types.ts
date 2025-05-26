import React from 'react';

export interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

export interface ContextHeaderProps {
  title: string;
  subtitle?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  contextualInfo?: React.ReactNode;
  backButton?: React.ReactNode;
} 