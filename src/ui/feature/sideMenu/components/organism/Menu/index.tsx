'use client';

import {useRouter} from 'next/navigation';
import {useTheme} from 'styled-components';

import * as S from './style';

import {Icon, Progress} from '@components/atom';
import {Button} from '@components/molecule';
import {useDrawer} from '@components/organism/Drawer/hook';
import {useToast} from '@components/organism/Toast/hook';
import {useMenu} from '@feature/sideMenu/hook';
import AuthenticationService from '@services/auth';

const Menu = () => {
  const theme = useTheme();
  const route = useRouter();
  const {handleClose, open} = useDrawer();
  const {menuInfo} = useMenu(open);
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

  const goToEmail = () => {
    handleClose();
    route.push('/main/setting/email');
  };

  return (
    <aside>
      <S.SettingContainer>
        <Button
          size="xSmall"
          color="lightPink"
          style={{fontSize: 14}}
          onClick={logout}>
          로그아웃
        </Button>
      </S.SettingContainer>
      <S.TextContainer>
        <S.ButtonContainer>
          <S.Text>{`안녕하세요!\n익명의 소라게님`}</S.Text>
          <S.EmailButton
            onClick={goToEmail}
            iconName="ChevronRight"
            color="pink"
            iconProps={{
              width: 20,
              height: 20,
              fill: theme.color.primary.pointPink,
            }}
            size="xSmall">
            이메일 변경하기
          </S.EmailButton>
        </S.ButtonContainer>
        <Icon.HermitCrab width={70} height={90} style={{marginRight: 10}} />
      </S.TextContainer>
      <S.Half>
        <S.Dashboard>
          <S.DashboardTitle>Lv1. 도전! 감사인사 50개 받기</S.DashboardTitle>
          <Progress max={50} value={menuInfo?.receivedThankCount} />
          <S.DashboardSubTitle>
            다음 단계까지 {50 - (menuInfo?.receivedThankCount || 0)}개 남았어요
          </S.DashboardSubTitle>
        </S.Dashboard>
      </S.Half>
      <S.Ol>
        <S.Li href="/main/notice" onClick={handleClose}>
          <Icon.Announcement height={theme.size[6]} width={theme.size[6]} />
          공지사항
        </S.Li>
        <S.ShareLi onClick={handleCopyClipBoard}>
          <Icon.Share height={theme.size[6]} width={theme.size[6]} />
          공유하기
        </S.ShareLi>
        <S.Li href="/main/notice">
          <Icon.Star height={theme.size[6]} width={theme.size[6]} />
          리뷰와 별점주기
        </S.Li>
        <S.Li href="/main/setting" onClick={handleClose}>
          <Icon.Settings height={theme.size[6]} width={theme.size[6]} />
          설정
        </S.Li>
      </S.Ol>
      <S.TrashPosition>
        <S.TrashContainer>
          <S.TrashIconContainer onClick={goToTrash}>
            <Icon.Trash height={theme.size[6]} width={theme.size[6]} />
            휴지통
          </S.TrashIconContainer>
          0
        </S.TrashContainer>
      </S.TrashPosition>
    </aside>
  );
};

export default Menu;
