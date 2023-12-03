import {useMemo} from 'react';
import styled, {useTheme} from 'styled-components';

import {Box, Icon as Icons} from '@components/atom';

type LetterContainerProps = {
  id: number;
  title: string;
  hasNewReply: boolean;
  onClick: (id: number) => void;
};

const LetterContainer = (props: LetterContainerProps) => {
  const {title, hasNewReply, onClick, id} = props;
  const theme = useTheme();
  const Icon = useMemo(
    () => Icons[hasNewReply ? 'NewMessage' : 'Message'],
    [hasNewReply],
  );

  return (
    <Container onClick={() => onClick(id)}>
      {title}
      <Icon width={theme.size.icon.normal} height={theme.size.icon.normal} />
    </Container>
  );
};

export default LetterContainer;

const Container = styled(Box)`
  justify-content: space-between;
  border-right: 11px;
  background-color: ${({theme}) => theme.color.white};
  font-size: ${({theme}) => theme.typography.fontSizes.lg}px;
  line-height: ${({theme}) => theme.typography.lineHeights.lg}px;
  padding: 0 16px;
`;
