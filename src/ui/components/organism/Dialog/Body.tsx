import type {ComponentPropsWithRef} from 'react';

type BodyProps = ComponentPropsWithRef<'main'>;

const Body = (props: BodyProps) => <main {...props} />;
export default Body;

Body.displayName = 'DialogBody';
