import {type MouseEventHandler, useCallback, useState} from 'react';
import styled, {useTheme} from 'styled-components';

import {Box, Icon} from '@components/atom';
import {useToast} from '@components/organism/Toast/hook';
import {useReply} from '@feature/reply/hook';

type ReplyContainerProps = {
  id: number;
  title: string;
  thanked: boolean;
  onClick: (id: number) => void;
  read: boolean;
};

const ReplyContainer = (props: ReplyContainerProps) => {
  const {thanked: hasThanksProp, title, id, onClick, read} = props;
  const [hasThanks, setHasThanks] = useState(hasThanksProp);
  const {setThank} = useReply();
  const theme = useTheme();
  const {showToast} = useToast();

  const color = hasThanks
    ? theme.color.primary.pointPink
    : theme.color.neutral[400];

  const onClickThanks: MouseEventHandler<HTMLDivElement> = useCallback(
    async e => {
      e.stopPropagation();
      if (!read) {
        showToast({
          message: '편지를 읽은 후 다시 시도해주세요.',
        });
        return;
      }
      if (hasThanks) {
        showToast({
          message: '감사 인사는 한 번만 할 수 있어요.',
        });
        return;
      }
      await setThank(id);
      setHasThanks(pre => !pre);
      if (!hasThanks) {
        showToast({
          message: '감사 인사가 전달되었어요.',
        });
      }
    },
    [hasThanks, id, read, setThank, showToast],
  );

  return (
    <Container onClick={() => onClick(id)}>
      {title}
      {read ? (
        <ThanksContainer onClick={onClickThanks}>
          <Icon.FaceWink width={28} height={28} stroke={color} />
          <ThanksText $color={color}>감사인사</ThanksText>
        </ThanksContainer>
      ) : null}
    </Container>
  );
};

export default ReplyContainer;

const Container = styled(Box)`
  justify-content: space-between;
  border-right: 11px;
  background-color: #fff2f6;
  font-size: ${({theme}) => theme.typography.fontSizes.lg}px;
  line-height: ${({theme}) => theme.typography.lineHeights.lg}px;
  padding: 0 16px;
  border-radius: 11px;
  box-shadow: 2px 2px 8px 0 rgba(177, 135, 147, 0.25);
`;

const ThanksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ThanksText = styled.p<TDollarPrefix<{color: string}>>`
  color: ${({$color}) => $color};
  font-size: 12px;
`;
