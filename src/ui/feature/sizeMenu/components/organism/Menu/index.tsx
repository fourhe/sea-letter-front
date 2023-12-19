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
    <aside>
      <SettingContainer>
        <Button
          size="xSmall"
          color="lightPink"
          style={{fontSize: 14}}
          onClick={logout}>
          로그아웃
        </Button>
      </SettingContainer>
      <TextContainer>
        <Text>{`안녕하세요!\n익명의 소라게님`}</Text>
      </TextContainer>
      <Half>
        <Dashboard>
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
        </Dashboard>
      </Half>
      <Ol>
        <Li href="/main/notice" onClick={handleClose}>
          <Icon.Announcement height={theme.size[6]} width={theme.size[6]} />
          공지사항
        </Li>
        <ShareLi onClick={handleCopyClipBoard}>
          <Icon.Share height={theme.size[6]} width={theme.size[6]} />
          공유하기
        </ShareLi>
        <Li href="/main/notice">
          <Icon.Star height={theme.size[6]} width={theme.size[6]} />
          리뷰와 별점주기
        </Li>
        <Li href="/main/setting" onClick={handleClose}>
          <Icon.Settings height={theme.size[6]} width={theme.size[6]} />
          설정
        </Li>
      </Ol>
      <TrashPosition>
        <TrashContainer>
          <TrashIconContainer onClick={goToTrash}>
            <Icon.Trash height={theme.size[6]} width={theme.size[6]} />
            휴지통
          </TrashIconContainer>
          0
        </TrashContainer>
      </TrashPosition>
    </aside>
  );
};

export default Menu;

const SettingContainer = styled.div`
  display: flex;
  background-color: ${({theme}) => theme.color.primary.lightPink};
  padding: 18px 18px 0;
`;

const Half = styled.div`
  padding: 20px 18px;
  background: linear-gradient(
    to bottom,
    ${({theme}) => theme.color.primary.lightPink} 50%,
    white 50%
  );
`;
const Ol = styled.ol`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 18px;
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

const TrashPosition = styled.div`
  position: absolute;
  bottom: 40px;
  width: 100%;
`;

const TrashContainer = styled.div`
  margin: 0 18px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${({theme}) => theme.color.black};
  padding: 16px 0 8px 0;
`;

const Dashboard = styled(Box)`
  background-color: ${({theme}) => theme.color.white};
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
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

const Text = styled.h2`
  white-space: pre-line;
  font-size: 24px;
  font-weight: ${({theme}) => theme.typography.fontWeights.bold};
  line-height: 34px;
`;

const TextContainer = styled.div`
  display: flex;
  color: ${({theme}) => theme.color.neutral[800]};
  align-items: flex-end;
  height: 15vh;
  background-color: ${({theme}) => theme.color.primary.lightPink};
  padding: 0 18px;
`;

const ShareLi = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: ${({theme}) => theme.color.text[700]};
`;
