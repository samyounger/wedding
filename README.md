My personal profile site
=========================

Run the site on your local host: in the console `$ jekyll serve` and it will start up on `localhost:4000`.

This page was produced using Jekyll.

## Background

I had not used Jekyll before this site other than a rudimentary introduction. While Jekyll is not overly complicated, I found the file layout, yaml file, and the layouts & includes take a bit of getting used to. Once mastered however it's very useful.

## Design origin

I started by using the theme by Jerome Lachaud, the original template located [here](https://jeromelachaud.github.io/grayscale-theme) which I liked for its simplicity and clear look.

Jerome's site was built using bootstrap and some basic css. Initially I converted all CSS to SCSS and tidied up the file layout after much research to a setup which I was happy with.

## Site evolution

I also dabbled with a Jekyll pre-build [kickster](http://kickster.nielsenramon.com/). This ended up being a complete disaster with lots of erroneous code I wasn't using, and ended up being more work than necessary editing it to a simple minimal but functional code base. I also tried out [Jekyll Assets](https://github.com/jekyll/jekyll-assets). I did quite like this for a simpler file layout at root directory level and `asset_path`. However this site is published using GitHub Pages, and this doesn't work with Jekyll Assets so I had to reverse this (annoyingly).

After I had the directory structure I liked, with the right technology plugins, and site layout, I built the entire site from scratch from the ground up, especially without Bootstrap.

Site comment functionality was been added using [Disqus](http://disqus.com/).
