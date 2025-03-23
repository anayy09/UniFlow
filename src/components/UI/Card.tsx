// src/components/UI/Card.tsx
import React from 'react';
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  onPress,
  ...props
}) => {
  if (onPress) {
    return (
      <TouchableCardContainer variant={variant} onPress={onPress} {...props}>
        {children}
      </TouchableCardContainer>
    );
  }
  
  return (
    <CardContainer variant={variant} {...props}>
      {children}
    </CardContainer>
  );
};

interface CardStyleProps {
  variant: 'elevated' | 'outlined' | 'filled';
}

const CardContainer = styled.View<CardStyleProps>`
  background-color: ${props => 
    props.variant === 'filled' 
      ? props.theme.colors.surface 
      : props.theme.colors.background
  };
  border-radius: ${props => props.theme.borderRadius.lg}px;
  padding: ${props => props.theme.spacing.lg}px;
  margin-vertical: ${props => props.theme.spacing.sm}px;
  
  ${props => props.variant === 'elevated' && `
    elevation: 4;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 3px;
  `}
  
  ${props => props.variant === 'outlined' && `
    border-width: 1px;
    border-color: ${props.theme.colors.border};
  `}
`;

const TouchableCardContainer = styled.TouchableOpacity<CardStyleProps>`
  background-color: ${props => 
    props.variant === 'filled' 
      ? props.theme.colors.surface 
      : props.theme.colors.background
  };
  border-radius: ${props => props.theme.borderRadius.lg}px;
  padding: ${props => props.theme.spacing.lg}px;
  margin-vertical: ${props => props.theme.spacing.sm}px;
  
  ${props => props.variant === 'elevated' && `
    elevation: 4;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 3px;
  `}
  
  ${props => props.variant === 'outlined' && `
    border-width: 1px;
    border-color: ${props.theme.colors.border};
  `}
`;

export default Card;