import styled from 'styled-components';

import {Box} from '@components/atom';
import {Button} from '@components/molecule';

type TrashContainerProps = {
  id: number;
  title: string;
  deletedAt: string;
  onClick: (id: number) => void;
};

const TrashContainer = (props: TrashContainerProps) => {
  const {title, onClick, id, deletedAt} = props;
  return (
    <Container onClick={() => onClick(id)}>
      <div style={{display: 'grid', gap: 5}}>
        {title}
        <DeletedAt>{deletedAt}</DeletedAt>
      </div>
      <Button color="pink" onClick={() => onClick(id)}>
        복구
      </Button>
    </Container>
  );
};

export default TrashContainer;

const Container = styled(Box)`
  justify-content: space-between;
  background-color: ${({theme}) => theme.color.white};
  font-size: ${({theme}) => theme.typography.fontSizes.lg}px;
  line-height: ${({theme}) => theme.typography.lineHeights.xs}px;
  padding: 0 16px;
`;

const DeletedAt = styled.p`
  color: ${({theme}) => theme.color.neutral[500]};
  font-size: ${({theme}) => theme.typography.fontSizes.xs}px;
  line-height: ${({theme}) => theme.typography.lineHeights.md}px;
`;
