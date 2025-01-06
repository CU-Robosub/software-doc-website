import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CU RoboSub Software",
  base: '/software-doc-website/',
  description: "Documentation for the Colorado RoboSub software team. Includes software and driver setup, as well as information regarding ROS nodes and accompanying files.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Software Setup', link: 'software-setup/software-setup-intro' },
      { text: 'Code Documentation', link: 'code-documentation/code-documentation-intro' },
      { text: 'About', link: 'about/about' }
    ],

    sidebar: [
      {
        text: 'Software Setup',
        items: [
          { text: 'Intro', link: 'software-setup/software-setup-intro' },
          { text: 'Docker Container', link: 'software-setup/docker-container-setup' },
          { text: 'DVL', link: 'software-setup/dvl-setup' }
        ]
      },
      {
        text: 'Code Documentation',
        items: [
          { text: 'Intro', link: 'code-documentation/code-documentation-intro' },
          { text: 'Motor Drivers', link: 'code-documentation/motor-driver' },
          { text: 'DVL Drivers', link: 'code-documentation/dvl-node' },
          { text: 'Camera Drivers', link: 'code-documentation/camera-node' },
        ]
      },
      {
        text: 'About',
        items: [
          { text: 'About', link: 'about/about' },
          { text: 'How to document', link: 'about/how-to-document' },
          { text: 'Markdown Examples', link: 'about/markdown-examples' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/CU-Robosub/cusub2.1' }
    ]
  }
})
