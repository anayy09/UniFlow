// src/components/UI/Button.tsx
import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: any;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  style,
}) => {
  return (
    <ButtonContainer
      variant={variant}
      size={size}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      onPress={onPress}
      style={style}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' || variant === 'text' ? '#4361EE' : '#FFFFFF'} 
          size="small" 
        />
      ) : (
        <>
          {icon && <IconContainer>{icon}</IconContainer>}
          <ButtonText variant={variant} size={size} disabled={disabled}>
            {title}
          </ButtonText>
        </>
      )}
    </ButtonContainer>
  );
};

interface ButtonStyleProps {
  variant: 'primary' | 'secondary' | 'outline' | 'text';
  size: 'small' | 'medium' | 'large';
  disabled: boolean;
  fullWidth: boolean;
}

const ButtonContainer = styled.TouchableOpacity<ButtonStyleProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${props => {
    if (props.disabled) return props.theme.colors.textSecondary;
    switch (props.variant) {
      case 'primary':
        return props.theme.colors.primary;
      case 'secondary':
        return props.theme.colors.secondary;
      case 'outline':
      case 'text':
        return 'transparent';
      default:
        return props.theme.colors.primary;
    }
  }};
  
  padding: ${props => {
    switch (props.size) {
      case 'small':
        return `${props.theme.spacing.xs}px ${props.theme.spacing.md}px`;
      case 'medium':
        return `${props.theme.spacing.sm}px ${props.theme.spacing.lg}px`;
      case 'large':
        return `${props.theme.spacing.md}px ${props.theme.spacing.xl}px`;
      default:
        return `${props.theme.spacing.sm}px ${props.theme.spacing.lg}px`;
    }
  }};
  
  border-radius: ${props => props.theme.borderRadius.md}px;
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
  
  border-width: ${props => (props.variant === 'outline' ? '2px' : '0px')};
  border-color: ${props => props.theme.colors.primary};
`;

const ButtonText = styled.Text<{
  variant: 'primary' | 'secondary' | 'outline' | 'text';
  size: 'small' | 'medium' | 'large';
  disabled: boolean;
}>`
  color: ${props => {
    if (props.disabled) return props.theme.colors.textSecondary;
    switch (props.variant) {
      case 'primary':
      case 'secondary':
        return '#FFFFFF';
      case 'outline':
      case 'text':
        return props.theme.colors.primary;
      default:
        return '#FFFFFF';
    }
  }};
  
  font-size: ${props => {
    switch (props.size) {
      case 'small':
        return `${props.theme.fontSizes.sm}px`;
      case 'medium':
        return `${props.theme.fontSizes.md}px`;
      case 'large':
        return `${props.theme.fontSizes.lg}px`;
      default:
        return `${props.theme.fontSizes.md}px`;
    }
  }};
  
  font-weight: ${props => props.theme.fontWeights.semiBold};
  text-align: center;
`;

const IconContainer = styled.View`
  margin-right: ${props => props.theme.spacing.xs}px;
`;

export default Button;