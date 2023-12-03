import type {CSSProperties} from 'react';
import styled from 'styled-components';

type MainTextProps = {
  text: string;
  style?: CSSProperties;
};

const MainText = (props: MainTextProps) => {
  const {text, style} = props;
  return <TextContainer style={style}>{text}</TextContainer>;
};

export default MainText;

const TextContainer = styled.div`
  color: ${({theme}) => theme.color.white};
  white-space: pre-wrap;
  font-size: ${({theme}) => theme.typography.fontSizes.sm}px;
  font-weight: ${({theme}) => theme.typography.fontWeights.medium};
  line-height: ${({theme}) => theme.typography.lineHeights.sm}px;
  padding-left: ${({theme}) => theme.size[3]}px;
`;