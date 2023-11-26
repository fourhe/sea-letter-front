'use client';

import {useRouter} from 'next/navigation';
import styled, {useTheme} from 'styled-components';

import {Box, Icon, Link} from '@components/atom';
import {Button} from '@components/molecule';
import {useDrawer} from '@components/organism/Drawer/hook';
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

  return (
    <Container>
      <SettingContainer>
        <Button size="small" color="pink" onClick={logout}>
          로그아웃
        </Button>
      </SettingContainer>
      <TextContainer>
        <h2 style={{margin: '0 auto'}}>안녕하세요!</h2>
        <h2 style={{margin: '0 auto'}}>소라게님</h2>
      </TextContainer>
      <MusicContainer>
        <Box backgroundColor={theme.color.white}>
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
        <Ul>
          <li>
            <Li href="/main/notice" onClick={handleClose}>
              <Icon.Announcement height={theme.size[6]} width={theme.size[6]} />
              공지사항
            </Li>
          </li>
          <li>
            <Li href="/main/notice" onClick={handleClose}>
              <Icon.Share height={theme.size[6]} width={theme.size[6]} />
              공유하기
            </Li>
          </li>
          <li>
            <Li href="/main/notice" onClick={handleClose}>
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
        </Ul>
      </MusicContainer>
      <TrashContainer>
        <TrashIconContainer>
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
const Ul = styled.ul`
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
