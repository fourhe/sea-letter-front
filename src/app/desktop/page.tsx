import Image from 'next/image';
import './desktop.css';

const Page = () => (
  <section className="wrapper">
    <Image alt="desktop-image" src="/image/pc.png" fill />
    <div className="container">
      {`바다편지 서비스는 모바일 화면에 최적화 된 서비스예요.
      모바일 기기를 이용하여 재접속 해주세요!`}
    </div>
  </section>
);

export default Page;
