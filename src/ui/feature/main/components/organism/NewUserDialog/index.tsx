import styled, {useTheme} from 'styled-components';

import {NewUserLetter} from '@/ui/assets/svgs';
import {Portal} from '@components/atom';
import {PortalId} from '@components/atom/Portal/portal.enum';
import {Button} from '@components/molecule';
import {Dialog} from '@components/organism';
import {useDialog} from '@components/organism/Dialog/hook';

type NewUserDialogProps = {
  ok: () => void;
  title: string;
  subTitle: string;
};

const NewUserDialog = (props: NewUserDialogProps) => {
  const {subTitle, title, ok} = props;
  const {color} = useTheme();
  const {handleClose} = useDialog();

  return (
    <Portal portalId={PortalId.Dialog}>
      <Dialog.Container>
        <Dialog.Body
          style={{
            width: '65vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 20,
          }}>
          <NewUserLetter />
          <Title>{title}</Title>
          <SubTitle>{subTitle}</SubTitle>
        </Dialog.Body>
        <Dialog.Footer type="vertical">
          <Button color="brown" onClick={ok}>
            이메일 변경하러 가기
          </Button>
          <Button
            color="white"
            style={{
              color: color.secondary.brown,
            }}
            onClick={handleClose}>
            현재 이메일 유지하기
          </Button>
        </Dialog.Footer>
      </Dialog.Container>
    </Portal>
  );
};

export default NewUserDialog;

const Title = styled.h4`
  font-size: ${({theme}) => theme.typography.fontSizes.lg}px;
  font-weight: ${({theme}) => theme.typography.fontWeights.bold};
  line-height: ${({theme}) => theme.typography.lineHeights.lg}px;
  text-align: center;
  white-space: pre-wrap;
`;

const SubTitle = styled.p`
  font-size: ${({theme}) => theme.typography.fontSizes.sm}px;
  line-height: ${({theme}) => theme.typography.lineHeights.sm}px;
  text-align: center;
  white-space: pre-wrap;
  margin-bottom: 10px;
`;
