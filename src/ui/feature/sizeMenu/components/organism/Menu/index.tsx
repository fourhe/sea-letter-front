'use client';

import {useRouter} from 'next/navigation';
import styled, {useTheme} from 'styled-components';

import {Box, Icon, Link} from '@components/atom';
import {Button} from '@components/molecule';
import {useDrawer} from '@components/organism/Drawer/hook';
import {useToast} from '@components/organism/Toast/hook';
import AuthenticationService from '@services/auth';

const Menu = () => {
  const theme = useTheme();
  const route = useRouter();

  const {handleClose} = useDrawer();
  const logout = async () => {
    await AuthenticationService.logOut();
    handleClose();
    route.push('/');
  };

  const goToTrash = () => {
    handleClose();
    route.push('/main/trash-box');
  };

  const {showToast} = useToast();

  const handleCopyClipBoard = () => {
    const text = window.location.host;
    try {
      navigator.clipboard.writeText(text).then(() => {
        showToast({
          message: '클립보드에 링크가 복사되었습니다.',
        });
      });
    } catch (e) {
      showToast({
        message: '복사에 실패 하였습니다.',
      });
    }
  };

  return (
    <Container>
      <SettingContainer>
        <Button size="small" color="pink" onClick={logout}>
          로그아웃
        </Button>
      </SettingContainer>
      <TextContainer>
        <h2 style={{margin: '0 auto', whiteSpace: 'pre-wrap'}}>
          {`안녕하세요!\n  소라게님`}
        </h2>
      </TextContainer>
      <MusicContainer>
        <Box style={{boxShadow: 'none'}} backgroundColor={theme.color.white}>
          <DashboardContainer>
            <DashboardText>받은 감사</DashboardText>
            <DashboardNumber>5</DashboardNumber>
          </DashboardContainer>
          <DashboardContainer $line>
            <DashboardText>보낸 편지</DashboardText>
            <DashboardNumber>7</DashboardNumber>
          </DashboardContainer>
          <DashboardContainer>
            <DashboardText>보낸 답장</DashboardText>
            <DashboardNumber>10</DashboardNumber>
          </DashboardContainer>
        </Box>
        <Ol>
          <li>
            <Li href="/main/notice" onClick={handleClose}>
              <Icon.Announcement height={theme.size[6]} width={theme.size[6]} />
              공지사항
            </Li>
          </li>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <li
            onClick={handleCopyClipBoard}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              cursor: 'pointer',
              color: theme.color.text[700],
            }}>
            <Icon.Share height={theme.size[6]} width={theme.size[6]} />
            공유하기
          </li>
          <li>
            <Li href="/main/notice" onClick={handleCopyClipBoard}>
              <Icon.Star height={theme.size[6]} width={theme.size[6]} />
              리뷰와 별점주기
            </Li>
          </li>
          <li>
            <Li href="/main/notice" onClick={handleClose}>
              <Icon.Settings height={theme.size[6]} width={theme.size[6]} />
              설정
            </Li>
          </li>
        </Ol>
      </MusicContainer>
      <TrashContainer>
        <TrashIconContainer onClick={goToTrash}>
          <Icon.Trash height={theme.size[6]} width={theme.size[6]} />
          휴지통
        </TrashIconContainer>
        0
      </TrashContainer>
    </Container>
  );
};

export default Menu;

const Container = styled.div`
  height: 100vh;
  padding: 18px;
`;

const SettingContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 15vh;
  gap: 5px;
`;

const MusicContainer = styled.div`
  border-bottom: 2px solid;
  margin-top: 20px;
  height: 65%;
`;
const Ol = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 10px;
`;

const Li = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TrashIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const TrashContainer = styled.div`
  padding: 20px 5px;
  display: flex;
  justify-content: space-between;
`;

const DashboardContainer = styled.div<{$line?: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex: 1;
  border-right: ${({$line, theme}) =>
    $line ? `1px solid ${theme.color.neutral[100]}` : 'none'};
  border-left: ${({$line, theme}) =>
    $line ? `1px solid ${theme.color.neutral[100]}` : 'none'};
`;

const DashboardText = styled.span`
  font-size: ${({theme}) => theme.typography.fontSizes.xs}px;
  font-weight: ${({theme}) => theme.typography.fontWeights.normal};
  line-height: ${({theme}) => theme.typography.lineHeights.xs}px;
`;

const DashboardNumber = styled.span`
  text-align: center;
  font-size: ${({theme}) => theme.typography.fontSizes.xl}px;
  font-weight: ${({theme}) => theme.typography.fontWeights.medium};
  line-height: ${({theme}) => theme.typography.lineHeights.xl}px;
`;
