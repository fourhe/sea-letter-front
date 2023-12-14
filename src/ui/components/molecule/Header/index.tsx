import Center, {type HeaderCenterProps} from './Center';
import Container, {type HeaderContainerProps} from './Container';
import Left, {type HeaderLeftProps} from './Left';
import Right, {type HeaderRightProps} from './Right';

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
