// src/utils/theme.ts
import { DefaultTheme } from 'styled-components/native';

export const COLORS = {
  electricBlue: '#4361EE',
  neonPink: '#FF006E',
  limeGreen: '#B5E48C',
  darkGray: '#2B2D42',
  white: '#FFFFFF',
  lightGray: '#F8F9FA',
  mediumGray: '#CED4DA',
  black: '#212529',
};

export const lightTheme: DefaultTheme = {
  colors: {
    primary: COLORS.electricBlue,
    secondary: COLORS.neonPink,
    accent: COLORS.limeGreen,
    background: COLORS.white,
    surface: COLORS.lightGray,
    text: COLORS.darkGray,
    textSecondary: COLORS.mediumGray,
    border: COLORS.mediumGray,
    error: '#FF5252',
    success: '#4CAF50',
    warning: '#FFC107',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    pill: 9999,
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeights: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
  shadows: {
    small: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    medium: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0px 8px 16px rgba(0, 0, 0, 0.15)',
  },
};

export const darkTheme: DefaultTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: COLORS.darkGray,
    surface: '#3A3B50',
    text: COLORS.white,
    textSecondary: COLORS.mediumGray,
    border: '#4A4B61',
  },
};

// Add type definitions for the theme
declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      surface: string;
      text: string;
      textSecondary: string;
      border: string;
      error: string;
      success: string;
      warning: string;
    };
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    borderRadius: {
      sm: number;
      md: number;
      lg: number;
      xl: number;
      pill: number;
    };
    fontSizes: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
      xxxl: number;
    };
    fontWeights: {
      regular: string;
      medium: string;
      semiBold: string;
      bold: string;
    };
    shadows: {
      small: string;
      medium: string;
      large: string;
    };
  }
}