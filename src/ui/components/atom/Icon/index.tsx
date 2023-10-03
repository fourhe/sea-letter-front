import type {FC} from 'react';

import withIconProps from './withIconProps';
import type {IconProps} from './withIconProps';

import * as svgs from '@assets/svgs';

type SvgName = keyof typeof svgs;
const svgNameList = Object.keys(svgs) as SvgName[];

const SvgMap = {} as {
  [k in SvgName]: FC<IconProps>;
};

svgNameList.forEach((svgName: SvgName) => {
  SvgMap[svgName] = withIconProps(svgs[svgName]);
});

export default SvgMap;
