import styled from 'styled-components';

type LineProps = {
  type: 'horizontal' | 'vertical';
  length: string;
  color?: string;
};

const HorizontalLine = styled.div<Pick<LineProps, 'length' | 'color'>>`
  width: ${({length}) => length};
  height: ${({theme}) => theme.size.px};
  background-color: ${({theme, color}) => color || theme.color.content[800]};
`;

const VerticalLine = styled.div<Pick<LineProps, 'length' | 'color'>>`
  width: ${({theme}) => theme.size.px};
  height: ${({length}) => length};
  background-color: ${({theme, color}) => color || theme.color.content[800]};
`;

const Line = (props: LineProps) => {
  const {type, length, color} = props;
  return type === 'horizontal' ? (
    <HorizontalLine length={length} color={color} />
  ) : (
    <VerticalLine length={length} color={color} />
  );
};

export default Line;
