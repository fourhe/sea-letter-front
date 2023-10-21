import type {FC, SVGProps} from 'react';
import {useTheme} from 'styled-components';

export type IconProps = SVGProps<SVGSVGElement>;

const withIconProps =
  (Icon: FC<IconProps>) =>
  // eslint-disable-next-line react/display-name
  (iconProps: IconProps) => {
    const theme = useTheme();
    const defaultFill = theme.color.text[700];
    const defaultSize = theme.size[6];
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
