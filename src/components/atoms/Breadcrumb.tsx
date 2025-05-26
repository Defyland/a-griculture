import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { BreadcrumbProps } from './types/Breadcrumb.types';
import {
  BreadcrumbContainer,
  BreadcrumbLink,
  Separator,
  BreadcrumbItem,
  HomeIcon,
  BreadcrumbText,
  BreadcrumbWrapper,
  SrOnly
} from './styles/Breadcrumb.styles';

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, maxDisplayLength = 20, showHomeIcon = true }) => {
  const navigate = useNavigate();
  
  const handleClick = (path: string, isActive?: boolean) => {
    if (isActive) return;
    navigate(path);
  };
  
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength - 3)}...`;
  };
  
  return (
    <BreadcrumbWrapper>
      <BreadcrumbContainer aria-label="Navegação estrutural">
        {items.map((item, index) => (
          <React.Fragment key={`breadcrumb-${item.path}-${index}`}>
            {index > 0 && <Separator aria-hidden="true">/</Separator>}
            
            <BreadcrumbItem>
              <BreadcrumbLink 
                to={item.path}
                $isActive={item.isActive}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item.path, item.isActive);
                }}
                title={item.label}
                aria-current={item.isActive ? 'page' : undefined}
              >
                {index === 0 && showHomeIcon ? (
                  <>
                    <HomeIcon aria-hidden="true" />
                    <SrOnly>Início</SrOnly>
                  </>
                ) : (
                  <BreadcrumbText>
                    {truncateText(item.label, maxDisplayLength)}
                  </BreadcrumbText>
                )}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbContainer>
    </BreadcrumbWrapper>
  );
};

export default Breadcrumb; 