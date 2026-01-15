import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

// Since we're on Windows and SVG imports might cause issues, we'll use inline SVG
const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
        <rect width="24" height="24" fill="#25c2a0"/>
        <text x="12" y="16" text-anchor="middle" fill="white" font-size="10">A_Book</text>
      </svg>
    ),
    description: (
      <>
        A_Book is designed to be intuitive and accessible for everyone.
        Our comprehensive documentation makes it easy to find what you need.
      </>
    ),
  },
  {
    title: 'Focus on Learning',
    Svg: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
        <rect width="24" height="24" fill="#25c2a0"/>
        <text x="12" y="16" text-anchor="middle" fill="white" font-size="10">A_Book</text>
      </svg>
    ),
    description: (
      <>
        Spend less time searching and more time learning with our
        well-organized and comprehensive documentation.
      </>
    ),
  },
  {
    title: 'Powered by Docusaurus',
    Svg: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
        <rect width="24" height="24" fill="#25c2a0"/>
        <text x="12" y="16" text-anchor="middle" fill="white" font-size="10">Docusaurus</text>
      </svg>
    ),
    description: (
      <>
        Built with Docusaurus, providing a robust and scalable
        documentation platform with excellent search capabilities.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}