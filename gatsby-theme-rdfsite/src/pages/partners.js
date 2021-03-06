import { graphql } from 'gatsby';
import _ from 'lodash';
import React from 'react';
import Layout from '../components/layout';
import Partner from '../components/partner';
import SEO from '../components/seo';

export default function Partners({
  data: {
    allRdf: { edges },
  },
}) {
  const partnersByType = _.groupBy(edges, p => p.node.data.kind);

  return (
    <Layout>
      <SEO title="Partners" />

      <div className="container content">
        <h1>Partners</h1>

        {Object.keys(partnersByType)
          .sort((a, b) => b.localeCompare(a))
          .map(type => (
            <div key={type}>
              <h2 className="mb-1">{type}</h2>
              <div className="columns">
                {partnersByType[type]
                  .sort((a, b) =>
                    a.node.data.name.localeCompare(b.node.data.name)
                  )
                  .map(({ node }) => (
                    <div className="column is-one-quarter" key={node.id}>
                      <Partner partner={node} />
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    allRdf(
      filter: {
        data: {
          rdf_type: {
            elemMatch: {
              id: { eq: "https://schema.dice-research.org/Partner" }
            }
          }
        }
      }
    ) {
      edges {
        node {
          id
          data {
            name
            country
            url
            logo
            kind
          }
        }
      }
    }
  }
`;
