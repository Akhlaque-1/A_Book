import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/blog',
    component: ComponentCreator('/blog', '6a7'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '182'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '287'),
    exact: true
  },
  {
    path: '/blog/tags/documentation',
    component: ComponentCreator('/blog/tags/documentation', '667'),
    exact: true
  },
  {
    path: '/blog/tags/welcome',
    component: ComponentCreator('/blog/tags/welcome', '731'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', '23e'),
    exact: true
  },
  {
    path: '/chatbot/',
    component: ComponentCreator('/chatbot/', '5d9'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '20f'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '392'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '532'),
            routes: [
              {
                path: '/docs/getting-started/installation',
                component: ComponentCreator('/docs/getting-started/installation', '267'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/getting-started/quick-start',
                component: ComponentCreator('/docs/getting-started/quick-start', '09c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro/',
                component: ComponentCreator('/docs/intro/', '014'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modules/ai-robot-brain',
                component: ComponentCreator('/docs/modules/ai-robot-brain', 'b4a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modules/digital-twin',
                component: ComponentCreator('/docs/modules/digital-twin', '660'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modules/ros2-nervous-system',
                component: ComponentCreator('/docs/modules/ros2-nervous-system', 'fe8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modules/vla-module',
                component: ComponentCreator('/docs/modules/vla-module', '435'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
