import type {ComponentPropsWithRef} from 'react';

type BodyProps = ComponentPropsWithRef<'main'>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Body = (props: BodyProps) => <main {...props} />;
export default Body;

Body.displayName = 'DialogBody';
