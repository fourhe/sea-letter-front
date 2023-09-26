import {link, footer, details} from './Footer.css';

const Footer = () => (
  <footer className={footer}>
    <div className={details}>
      <p>
        Built with{' '}
        <a
          className={link}
          target="_blank"
          href="https://nextjs.org"
          rel="noreferrer">
          Next.js
        </a>{' '}
        and{' '}
        <a
          className={link}
          target="_blank"
          href="https://vanilla-extract.style/"
          rel="noreferrer">
          Vanilla Extract
        </a>{' '}
      </p>
    </div>
  </footer>
);

export default Footer;
