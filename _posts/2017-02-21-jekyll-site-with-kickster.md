---
title: Jekyll kickster pre-build experiment
date: 2017-02-21 12:00
categories: [jekyll, kickster]
---

    DESCRIPTION: In my pursuit to build a better personal blogging website and learning more about Jekyll, I am going to build a site using Kickster, recommended on Jekyll's Docs "for easy (automated) deploys to GitHub Pages when using unsupported plugins on GitHub Pages."

[Kickster](http://kickster.nielsenramon.com/)

## About

Kickster describes itself as being ideal for fast prototyping so developers can focus on the fun parts.

## Setup

The setup instructions are clear and simple. In the terminal type:

```sh
# Installation
~ $ gem install kickster
~ $ kickster new site_name
~ $ cd site_name
~ $ bin/setup

# Deployment
~ $ bin/deploy # this deploys to github
```

## Conclusions

The initial setup of the project was incredibly easy. There was a distinct lack of documentation for how everything worked which was a considerable hinderance.

While the creator Nielson Ramon claims this framework makes the setup of a Jekyll project easy enabling users to focus on content creation, if you want to target a particular tech setup I found this framework horrible to work with. Admittedly when I started out using Kickster my knowledge of Jekyll was functional, but I lacked a good understanding of Jekyll plugins and Jekyll Assets which this framework uses in abundance.

When I initially converted my profile project to this framework, I had to completely change the setup of the project. Moving all files across, tailoring the SCSS asset paths to fit into Jekyll Assets, and indeed learn what Jekyll Assets was. I went down the rabbit hole in a bit way on this project. It has helped me gain a much greater understanding of how Jekyll works, however it became clear to me that this was not a framework I wanted to work with going forward. I store the projects code repository on GitHub, and deploy it from the same repository master branch on GitHub Pages. The deploy process of this was hard coded. Using this deploy process I managed to overwrite the repository several times and had to roll back -> and this is the main reason I do not want to use this framework again.
