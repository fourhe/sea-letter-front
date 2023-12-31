import {type ReactNode, useMemo} from 'react';
import styled from 'styled-components';

import Button, {type ButtonProps} from '../Button';

import {Icon as Icons} from '@components/atom';
import type {IconName} from '@components/atom/Icon';
import type {IconProps} from '@components/atom/Icon/withIconProps';

type IconButtonProps = {
  iconName: IconName;
  iconProps?: IconProps;
  children: ReactNode;
} & ButtonProps;

const IconButton = (props: IconButtonProps) => {
  const {iconName, children, iconProps, ...restProps} = props;

  const Icon = useMemo(() => Icons[iconName], [iconName]);

  return (
    <SIconButton {...restProps}>
      <Container>
        {children}
        <Icon {...iconProps} />
      </Container>
    </SIconButton>
  );
};

export default IconButton;

const SIconButton = styled(Button)`
  padding: 0;
`;

const Container = styled.div`
  padding: 4px 8px 4px 12px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
