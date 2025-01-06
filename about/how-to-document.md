---
title: How To Document Code
next:
  text: "Markdown Examples"
  link: "about/markdown-examples"
prev:
  text: "About"
  link: "about/about"
---

# How To Document Code

Please make sure you are able to make changes and push to [this](https://github.com/CU-Robosub/software-doc-website) repository in order to publish new documentation. All you need to do is push to main with your changes.

## Sidebar Config

To document a piece of code you've written, simply create a markdown file in the corresponding folder. Linking to that file is done through the `config.mts` file within the `.vitepress` folder.

For example, if I create a new file and want to add it to the sidebar, I can add the following section in the sidebar list:

```ts
{
        text: 'Example',
        items: [
          { text: 'Ex 1', link: 'example_folder/ex1' },
          { text: 'Ex 2', link: 'example_folder/ex2' } // the new page
        ]
      }
```

## In the new page markdown

At the very start of the new markdown file, there should be a brief section that tells VitePress how to organize the previous and next pages. An Example is shown below:

```md
---
title: Markdown Extension Examples
prev:
  text: "How To Document"
  link: "about/how-to-document"
next: false // to hide the next page button
---
```

Generally, each markdown file should have a `#` to denote a title, `##` to denote a section heading, and so on. Code blocks can be written with ` ``` ` wrapped around some text. Please be thorough with your documentation, and be sure to note down anything that is not immidiately obvious!

If you wish to add more features to the main page, you will need to edit `index.md`, and follow the same format that is currently on the cards.

Note, some VitePress specific markdown stuff has been noted in [Markdown Examples](markdown-examples.md)
