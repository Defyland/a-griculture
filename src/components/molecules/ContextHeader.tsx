import React from 'react';
import { Typography, Breadcrumb } from '../atoms';
import type { ContextHeaderProps } from './types/ContextHeader.types';
import {
  HeaderContainer,
  HeaderTop,
  TitleContainer,
  TitleContent,
  SubtitleWrapper,
  ContextualContent
} from './styles/ContextHeader.styles';

const ContextHeader: React.FC<ContextHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions,
  contextualInfo,
  backButton
}) => {
  return (
    <HeaderContainer>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb items={breadcrumbs} />
      )}
      
      <HeaderTop>
        <TitleContainer>
          {backButton && <div>{backButton}</div>}
          <TitleContent>
            <Typography variant="h1">{title}</Typography>
            {subtitle && (
              <SubtitleWrapper>
                {typeof subtitle === 'string' ? (
                  <Typography variant="subtitle" color="secondary">
                    {subtitle}
                  </Typography>
                ) : subtitle}
              </SubtitleWrapper>
            )}
          </TitleContent>
        </TitleContainer>
        
        {actions && (
          <div>{actions}</div>
        )}
      </HeaderTop>
      
      {contextualInfo && (
        <ContextualContent>
          {contextualInfo}
        </ContextualContent>
      )}
    </HeaderContainer>
  );
};

export default ContextHeader; 