import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/robot-system/chatbot/',
    component: ComponentCreator('/robot-system/chatbot/', '5c5'),
    exact: true
  },
  {
    path: '/robot-system/docs',
    component: ComponentCreator('/robot-system/docs', '3d6'),
    routes: [
      {
        path: '/robot-system/docs',
        component: ComponentCreator('/robot-system/docs', '18e'),
        routes: [
          {
            path: '/robot-system/docs',
            component: ComponentCreator('/robot-system/docs', '49c'),
            routes: [
              {
                path: '/robot-system/docs/getting-started/installation',
                component: ComponentCreator('/robot-system/docs/getting-started/installation', '1e8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/robot-system/docs/getting-started/quick-start',
                component: ComponentCreator('/robot-system/docs/getting-started/quick-start', '3c6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/robot-system/docs/intro/',
                component: ComponentCreator('/robot-system/docs/intro/', '68a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/robot-system/docs/modules/ai-robot-brain',
                component: ComponentCreator('/robot-system/docs/modules/ai-robot-brain', '5e7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/robot-system/docs/modules/digital-twin',
                component: ComponentCreator('/robot-system/docs/modules/digital-twin', 'b51'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/robot-system/docs/modules/ros2-nervous-system',
                component: ComponentCreator('/robot-system/docs/modules/ros2-nervous-system', 'd97'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/robot-system/docs/modules/vla-module',
                component: ComponentCreator('/robot-system/docs/modules/vla-module', '346'),
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
    path: '/robot-system/',
    component: ComponentCreator('/robot-system/', 'cfa'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
