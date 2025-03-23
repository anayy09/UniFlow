// src/components/UI/Typography.tsx
import React from 'react';
import { Text, TextProps } from 'react-native';
import styled from 'styled-components/native';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'button';
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  color,
  align = 'left',
  weight,
  style,
  children,
  ...props
}) => {
  return (
    <StyledText 
      variant={variant} 
      customColor={color} 
      align={align} 
      weight={weight}
      style={style}
      {...props}
    >
      {children}
    </StyledText>
  );
};

interface StyledTextProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'button';
  customColor?: string;
  align: 'auto' | 'left' | 'right' | 'center' | 'justify';
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
}

const StyledText = styled.Text<StyledTextProps>`
  color: ${props => props.customColor || props.theme.colors.text};
  text-align: ${props => props.align};
  
  ${props => {
    switch (props.variant) {
      case 'h1':
        return `
          font-size: ${props.theme.fontSizes.xxxl}px;
          font-weight: ${props.weight || props.theme.fontWeights.bold};
          margin-bottom: ${props.theme.spacing.md}px;
        `;
      case 'h2':
        return `
          font-size: ${props.theme.fontSizes.xxl}px;
          font-weight: ${props.weight || props.theme.fontWeights.bold};
          margin-bottom: ${props.theme.spacing.sm}px;
        `;
      case 'h3':
        return `
          font-size: ${props.theme.fontSizes.xl}px;
          font-weight: ${props.weight || props.theme.fontWeights.semiBold};
          margin-bottom: ${props.theme.spacing.sm}px;
        `;
      case 'h4':
        return `
          font-size: ${props.theme.fontSizes.lg}px ;
          font-weight: ${props.weight || props.theme.fontWeights.semiBold};
          margin-bottom: ${props.theme.spacing.xs}px;
        `;
      case 'h5':
        return `
          font-size: ${props.theme.fontSizes.md}px;
          font-weight: ${props.weight || props.theme.fontWeights.medium};
          margin-bottom: ${props.theme.spacing.xs}px;
        `;
      case 'h6':
        return `
          font-size: ${props.theme.fontSizes.sm}px;
          font-weight: ${props.weight || props.theme.fontWeights.medium};
          margin-bottom: ${props.theme.spacing.xs}px;
        `;
      case 'body1':
        return `
          font-size: ${props.theme.fontSizes.md}px;
          font-weight: ${props.weight || props.theme.fontWeights.regular};
        `;
      case 'body2':
        return `
          font-size: ${props.theme.fontSizes.sm}px;
          font-weight: ${props.weight || props.theme.fontWeights.regular};
        `;
      case 'caption':
        return `
          font-size: ${props.theme.fontSizes.xs}px;
          font-weight: ${props.weight || props.theme.fontWeights.regular};
          color: ${props.customColor || props.theme.colors.textSecondary};
        `;
      case 'button':
        return `
          font-size: ${props.theme.fontSizes.md}px;
          font-weight: ${props.weight || props.theme.fontWeights.medium};
          text-transform: uppercase;
        `;
      default:
        return `
          font-size: ${props.theme.fontSizes.md}px;
          font-weight: ${props.weight || props.theme.fontWeights.regular};
        `;
    }
  }}
`;

export default Typography;