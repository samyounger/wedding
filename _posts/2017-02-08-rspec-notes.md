---
title: RSpec notes
date: 2017-02-07 10:00
categories: [rspec, ruby, rails]
---

    DESCRIPTION: RSpec is a testing GEM for Ruby, supposedly easier to read for non-developers.

Its documentation is located here:

<http://rspec.info/>

## Install

To install:
`$ gem install rspec`

This gives you access to `$ rspec` from the terminal.

To initialize in the project:
`$ rspec --init`

To install rspec into the current rails project:
`$ rails g rspec:install`

To add color and formatting to the rspec testing code:
`$ rspec --color --format documentation` and then the file path.

  - or in the `.rspec` file put the formatting for color and format.

## Run tests

Run the command in the terminal `$ bundle exec rspec`

  - this will run every file with `_spec.rb` names in the `spec` file by default. To change the test file to run at the end of the command write the path e.g. `$ bundle exec rspec spec/models/test.rb`
