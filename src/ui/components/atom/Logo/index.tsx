import Image from 'next/image';

import {container} from './Logo.css';

const Logo = () => (
  <div className={container}>
    <Image
      priority
      src="/logo.png"
      width={152}
      height={180}
      alt="Vanilla Extract logo"
    />
  </div>
);

export default Logo;
