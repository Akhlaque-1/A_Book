import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
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
