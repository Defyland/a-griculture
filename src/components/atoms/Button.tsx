import React from 'react';
import type { ButtonProps, LinkButtonProps } from './types/Button.types';
import {
  StyledButton,
  StyledAnchor,
  LoadingSpinner,
  BadgeContainer
} from './styles/Button.styles';
import type { StyledButtonProps } from './styles/Button.styles';

// Função para filtrar propriedades que não devem ir para o DOM
const filterDOMProps = (props: Record<string, unknown>) => {
  const propsToFilter = [
    'variant', 'size', 'fullWidth', 'isLoading', 'icon', 
    'iconPosition', 'rounded', 'elevated', 'active', 'badge'
  ];
  
  const filteredProps: Record<string, unknown> = {};
  Object.keys(props).forEach(key => {
    if (!propsToFilter.includes(key)) {
      filteredProps[key] = props[key];
    }
  });
  
  return filteredProps;
};

// Componente de botão base
const ButtonBase = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  icon,
  iconPosition = 'left',
  rounded = false,
  elevated = false,
  active = false,
  badge
}: ButtonProps | LinkButtonProps) => {
  const hasOnlyIcon = !!icon && !children;
  
  const commonProps: StyledButtonProps = {
    $variant: variant,
    $size: size,
    $fullWidth: fullWidth,
    $rounded: rounded,
    $elevated: elevated,
    $active: active,
    $iconOnly: hasOnlyIcon
  };
  
  const renderContent = () => (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          
          {children}
          {icon && iconPosition === 'right' && icon}
          {badge && <BadgeContainer>{badge}</BadgeContainer>}
        </>
      )}
    </>
  );
  
  return { commonProps, renderContent, hasOnlyIcon, isLoading };
};

// Componente Button (botão HTML)
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { disabled, ...restProps } = props;
  const { commonProps, renderContent, isLoading } = ButtonBase(props);
  
  const domProps = filterDOMProps(restProps);
  
  return (
    <StyledButton
      ref={ref}
      disabled={disabled || isLoading}
      {...commonProps}
      {...domProps}
    >
      {renderContent()}
    </StyledButton>
  );
});

Button.displayName = 'Button';

// Componente LinkButton (link HTML com estilo de botão)
export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>((props, ref) => {
  const { href, target, rel, ...restProps } = props;
  const { commonProps, renderContent, isLoading } = ButtonBase(props);
  
  const domProps = filterDOMProps(restProps);
  
  return (
    <StyledAnchor
      ref={ref}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : rel}
      aria-disabled={isLoading}
      {...commonProps}
      {...domProps}
      style={{
        pointerEvents: isLoading ? 'none' : 'auto',
        opacity: isLoading ? 0.7 : 1,
        ...props.style
      }}
    >
      {renderContent()}
    </StyledAnchor>
  );
});

LinkButton.displayName = 'LinkButton'; 