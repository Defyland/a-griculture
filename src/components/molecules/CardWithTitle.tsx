import React from 'react';
import { Card, Typography } from '../atoms';
import type { CardWithTitleProps } from './types/CardWithTitle.types';
import { CardHeader, TitleArea, ActionsArea } from './styles/CardWithTitle.styles';

export const CardWithTitle: React.FC<CardWithTitleProps> = ({
  title,
  subtitle,
  children,
  actions,
  variant,
  className,
}) => {
  return (
    <Card variant={variant} className={className}>
      <CardHeader>
        <TitleArea>
          <Typography variant="h3" noMargin>
            {title}
          </Typography>
          {subtitle && <Typography variant="body2" color="lightText">{subtitle}</Typography>}
        </TitleArea>
        {actions && <ActionsArea>{actions}</ActionsArea>}
      </CardHeader>
      {children}
    </Card>
  );
};

export default CardWithTitle; 