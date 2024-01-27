import React from 'react';
import styled from 'styled-components';

type ProgressBarProps = {
  value: number;
  max: number;
  backgroundColor?: string;
  activeColor?: string;
};

const ProgressBarContainer = styled.div<
  TDollarPrefix<{
    backgroundColor?: string;
  }>
>`
  width: 100%;
  height: 10px;
  background-color: ${({$backgroundColor, theme}) =>
    $backgroundColor || theme.color.neutral[200]};
  border-radius: 5px;
  overflow: hidden;
`;

const Progress = styled.div<
  TDollarPrefix<{
    value: number;
    max: number;
    activeColor?: string;
  }>
>`
  height: 100%;
  width: ${({$value, $max}) => ($value / $max) * 100}%;
  transition: width 0.5s ease-in-out;
  background-color: ${({$activeColor, theme}) =>
    $activeColor || theme.color.primary.pointPink};
`;

const ProgressBar = (props: ProgressBarProps) => {
  const {value, max, backgroundColor, activeColor} = props;
  return (
    <ProgressBarContainer $backgroundColor={backgroundColor}>
      <Progress $value={value} $max={max} $activeColor={activeColor} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
