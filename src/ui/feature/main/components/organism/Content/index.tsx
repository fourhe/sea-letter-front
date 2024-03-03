import React from 'react';

import {Icon} from '@components/atom';
import {MainText} from '@feature/main/components/molecule';

type ContentProps = {
  message: string | null;
  id?: number | null;
  isUpEvent: boolean;
  openLetter: () => void;
};

const Content = (props: ContentProps) => {
  const {message, id, isUpEvent, openLetter} = props;
  // 메인에서 보여줘야 하는 상황
  if (message) {
    return (
      <MainText
        style={{fontWeight: 700, fontSize: 20, lineHeight: '28px'}}
        text={message}
      />
    );
  }
  // 읽을 편지가 도착 했을 때
  if (id) {
    return (
      <>
        <Icon.Letter width={297} height={297} onClick={openLetter} />
        <MainText
          style={{
            position: 'absolute',
            bottom: '3.5vh',
            left: '55%',
          }}
          text={'유리병을 탭하여\n편지를 확인하세요.'}
        />
      </>
    );
  }
  // 편지가 없을 때
  if (isUpEvent && id === null) {
    return (
      <>
        <Icon.HideLetter
          width={74}
          height={61}
          style={{
            position: 'absolute',
            top: '-2vh',
            right: '50%',
          }}
        />
        <MainText
          style={{
            position: 'absolute',
            bottom: '-15vh',
          }}
          text={
            '아직 편지가 떠내려오지 않았어요!\n누군가 편지를 보내길 기다려 주세요:)'
          }
        />
      </>
    );
  }
  return (
    <>
      <Icon.HideLetter width={74} height={61} />
      <MainText text={'위로 올려\n편지를 주워보세요.'} />
    </>
  );
};

export default React.memo(Content);
