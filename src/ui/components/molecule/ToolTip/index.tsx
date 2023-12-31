import styled from 'styled-components';

import {Icon} from '@components/atom';

type ToolTipProps = {message: string};

const ToolTip = (props: ToolTipProps) => {
  const {message} = props;

  return (
    <TooltipContainer>
      <Icon.Ellipse width={24} height={24} />
      <QuestionMark>?</QuestionMark>
      <TooltipText>{message}</TooltipText>
    </TooltipContainer>
  );
};

export default ToolTip;

const QuestionMark = styled.span`
  position: absolute;
  font-size: 14px;
  font-weight: 600;
  color: ${({theme}) => theme.color.white};
`;

const TooltipContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TooltipText = styled.span`
  width: 205px;
  visibility: hidden;
  background-color: ${({theme}) => theme.color.white};
  color: ${({theme}) => theme.color.neutral[400]};
  padding: 10px;
  border-radius: 10px;
  border: 1px solid ${({theme}) => theme.color.neutral[400]};
  position: absolute;
  top: 0;
  left: 30px;
  opacity: 0;
  transition:
    opacity 0.5s,
    visibility 0.5s;
  white-space: pre-wrap;

  ${TooltipContainer}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;
