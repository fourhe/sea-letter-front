import type {NextPage} from 'next';

const AboutPage: NextPage = (props, context) => {
  console.log('about page', props, context);
  return (
    <div>
      <h1>Test Page</h1>
    </div>
  );
};
export default AboutPage;
