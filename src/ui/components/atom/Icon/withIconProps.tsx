import type {FC, SVGProps, ComponentPropsWithRef} from 'react';
import {useTheme} from 'styled-components';

export type IconProps = SVGProps<ComponentPropsWithRef<'svg'>>;
const withIconProps =
  (Icon: FC<IconProps>) =>
  // eslint-disable-next-line react/display-name
  (iconProps: IconProps) => {
    const theme = useTheme();
    const defaultFill = theme.color.white;
    const defaultSize = theme.size[8];
    const {fill, width, height, ...restProps} = iconProps;
    return (
      <Icon
        fill={fill ?? defaultFill}
        width={width ?? defaultSize}
        height={height ?? defaultSize}
        {...restProps}
      />
    );
  };

export default withIconProps;
