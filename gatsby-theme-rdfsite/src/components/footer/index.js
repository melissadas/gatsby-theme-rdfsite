import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import Social from '../social';
import Logo from './logo';

const links = [
  { url: '/team/', text: 'Team' },
  { url: '/publications/', text: 'Publications' },
  { url: '/news/', text: 'News' },
  { url: '/partners/', text: 'Partners' },
  { url: '/contact/', text: 'Contact' },
  { url: '/imprint', text: 'Imprint' },
  { url: '/privacy', text: 'Privacy Policy' },
];

const Footer = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            footer
          }
        }
      }
    `
  );

  return (
    <div className="footer">
      <div className="columns" style={{ flex: 1 }}>
        <div className="column">
          <Logo />
        </div>
        <div className="column dice-footer">
          {links.map(l => (
            <Link key={l.url} to={l.url}>
              {l.text}
            </Link>
          ))}
        </div>
        <Social hiddenMobile={false} />
      </div>

      <div className="horizontal-separator" />

      <div className="flex justify-center footer-note">
        {site.siteMetadata.footer}
      </div>
    </div>
  );
};

export default Footer;
