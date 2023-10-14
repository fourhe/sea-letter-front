import type {FC} from 'react';

import withIconProps from './withIconProps';
import type {IconProps} from './withIconProps';

import * as svgs from '@assets/svgs';

export type IconName = keyof typeof svgs;
const svgNameList = Object.keys(svgs) as IconName[];

const SvgMap = {} as {
  [k in IconName]: FC<IconProps>;
};

svgNameList.forEach((svgName: IconName) => {
  SvgMap[svgName] = withIconProps(svgs[svgName]);
});

export default SvgMap;
