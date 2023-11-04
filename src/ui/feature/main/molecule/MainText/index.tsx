import styled, {keyframes} from 'styled-components';

import {Icon} from '@/ui/components/atom';

type MainTextProps = {
  text: string;
  showIcon?: boolean;
};

const MainText = (props: MainTextProps) => {
  const {showIcon, text} = props;
  return (
    <TextContainer>
      {showIcon && (
        <IconContainer>
          <Icon.VectorDown width={36} height={77} />
        </IconContainer>
      )}
      {text}
    </TextContainer>
  );
};

export default MainText;

const moveUpDown = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0);
  }
`;

const IconContainer = styled.div`
  animation: ${moveUpDown} 2s linear infinite;
  padding-bottom: 20px;
`;

const TextContainer = styled.div`
  color: ${({theme}) => theme.color.white};
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 33%;
  left: 30%;
  white-space: pre-wrap;
  font-size: ${({theme}) => theme.typography.fontSizes.sm}px;
  font-weight: ${({theme}) => theme.typography.fontWeights.medium};
  line-height: ${({theme}) => theme.typography.lineHeights.sm}px;
`;
