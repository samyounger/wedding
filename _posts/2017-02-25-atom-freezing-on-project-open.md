---
title: Atom Freezing On Project Open
date: 2017-02-25 12:00
categories: [atom, ide]
---
    DESCRIPTION: Atom was freezing when opening a Jekyll project. It started happening when opening a jquery.easing.min.js file. It also freezes when opening any other minimised file - like lunr.min.js, or bootstrap.min.js

Atom appears to have an issue of opening up files with long lines of code - in particular the minimised versions as this jquery file was. Atom worked fine with other projects, but this one project it would freeze every time I opened it up. Attempted fixes:

- opening atom up in safe mode: command line: `atom . --safe`. # didn't work
- deleting all files in `~/.atom/storage/*` with the exception of application.json. # didn't work
- deleting the jquery file causing the problem. # didn't work.

## Fix

The fix that worked for me was navigating to the project in the terminal. Here run `atom --clear-window-state`. # FIXED woohoo

## Atom coverage

This issue has been with atom since 2013 by the looks of this discussion board on Atom's github issues board:

[Discussion](https://github.com/atom/atom/issues/979)

I see that FINALLY they have found a fix for this, and should be released in the Atom version 1.16 (currently the production version is 1.14.3). I look forward to this fix.
