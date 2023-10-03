import Center from './Center';
import type {HeaderCenterProps} from './Center';
import Container from './Container';
import type {HeaderContainerProps} from './Container';
import Left from './Left';
import type {HeaderLeftProps} from './Left';
import Right from './Right';
import type {HeaderRightProps} from './Right';

const Header = {
  Container,
  Center,
  Left,
  Right,
};

export default Header;
export type {
  HeaderRightProps,
  HeaderLeftProps,
  HeaderContainerProps,
  HeaderCenterProps,
};
