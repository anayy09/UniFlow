// src/components/UI/ProgressBar.tsx
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

interface ProgressBarProps {
  progress: number;
  height?: number;
  color?: string;
  backgroundColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  color,
  backgroundColor,
}) => {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <Container height={height} backgroundColor={backgroundColor}>
      <Progress width={clampedProgress} color={color} />
    </Container>
  );
};

interface ContainerProps {
  height: number;
  backgroundColor?: string;
}

const Container = styled.View<ContainerProps>`
  height: ${props => props.height}px;
  background-color: ${props => props.backgroundColor || props.theme.colors.border};
  border-radius: ${props => props.height / 2}px;
  overflow: hidden;
`;

interface ProgressProps {
  width: number;
  color?: string;
}

const Progress = styled.View<ProgressProps>`
  height: 100%;
  width: ${props => props.width}%;
  background-color: ${props => props.color || props.theme.colors.primary};
`;

export default ProgressBar;