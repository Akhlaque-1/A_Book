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
        <text x="12" y="16" text-anchor="middle" fill="white" font-size="10">Docusaurus</text>
      </svg>
    ),
    description: (
      <>
        The Autonomous Humanoid Robot System is designed to be intuitive for both
        researchers and developers. The modular architecture allows for easy
        customization and extension.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
        <rect width="24" height="24" fill="#25c2a0"/>
        <text x="12" y="16" text-anchor="middle" fill="white" font-size="10">Docusaurus</text>
      </svg>
    ),
    description: (
      <>
        The system handles complex robotics tasks like perception, navigation,
        and human-robot interaction, so you can focus on your specific research
        or application.
      </>
    ),
  },
  {
    title: 'Powered by ROS2',
    Svg: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
        <rect width="24" height="24" fill="#25c2a0"/>
        <text x="12" y="16" text-anchor="middle" fill="white" font-size="10">Docusaurus</text>
      </svg>
    ),
    description: (
      <>
        Built on top of ROS2 and NVIDIA Isaac, providing a robust foundation
        for robotics applications with extensive community support.
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