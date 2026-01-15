// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro/intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: ['getting-started/installation', 'getting-started/quick-start'],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'modules/ros2-nervous-system',
        'modules/digital-twin',
        'modules/ai-robot-brain',
        'modules/vla-module'
      ],
    },
    {
      type: 'link',
      label: 'Chat with Book',
      href: '/chatbot',
    },
  ],
};

module.exports = sidebars;