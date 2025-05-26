export interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  maxDisplayLength?: number;
  showHomeIcon?: boolean;
}

export interface BreadcrumbLinkProps {
  $isActive?: boolean;
} 