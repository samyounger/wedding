---
title: Rails Engine
date: 2017-03-3 12:00
categories: [rails, ruby, engine]
---
    DESCRIPTION: A rails engine is a miniature application within a host application. This post will describe how to set up a rails engine within a rails app.

[DOCUMENTATION](http://guides.rubyonrails.org/engines.html)

## Generate the engine

The engine is created like everything else in rails - from the terminal. The below command will set up an engine called 'my_engine'

`$ rails plugin new my_engine --mountable`

This creates a new file in your root application directory called `my_engine` (or whatever you called your engine). If you intend to have more than one engine, you should move this file into an umbrella directory. It so, create a new file called `engines`, and move the newly created engine into there.

### Gemspec file

You will see when you generate the engine an error appear:

```sh
The gemspec at /Users/samyounger/development/myapp/my_engine/my_engine.gemspec is not valid.
Please fix this gemspec.
The validation error was '"FIXME" or "TODO" is not a description'
```

To fix this error, go into your engine, ours is located at `/myapp/engines/my_engine/` and open the file in your text-editor `my_engine.gemspec`. The file should look like this:

```rb
$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "my_engine/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "my_engine"
  s.version     = MyEngine::VERSION
  s.authors     = ["samyounger"]
  s.email       = ["sam.younger@gmail.com"]
  s.homepage    = "TODO"
  s.summary     = "TODO: Summary of MyEngine."
  s.description = "TODO: Description of MyEngine."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", "~> 5.0.0", ">= 5.0.0.1"

  s.add_development_dependency "sqlite3"
end
```

Change it to look something like this:

```rb
$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "my_engine/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "my_engine"
  s.version     = MyEngine::VERSION
  s.authors     = ["samyounger"]
  s.email       = ["sam.younger@gmail.com"]
  s.homepage    = ""
  s.summary     = ""
  s.description = ""
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", "~> 5.0.0", ">= 5.0.0.1"

  s.add_development_dependency "sqlite3"
end
```

## Add the engine to the application

To make the engine you've just created available to the application you need to open the applications `Gemfile`, and add the line:

```rb
gem 'my_engine', path: 'engines/my_engine'
```

Run `bundle install` as usual to update your application. This requires the `engines/my_engine/my_engine.gemspec`, which in turn requires a file within the `lib` directory called `lib/my_engine.rb`. This file in turn requires the file `lib/my_engine/engine.rb` and defines a base module called `MyEngine`.

In the engine app directory are the usual directories:

```
.
|-- assets
|-- controllers
|-- helpers
|-- jobs
|-- mailers
|-- models
|-- views
```

## Set up controllers

In your engine application controller put in any any common code which you want any of your controllers you are going to make inherit.

Create a new file in the controller, choose a suitable name such as `my_engine/posts_controller.rb` (it should be pluralized). Ensure you describe the path to the the controller with `MyEngine::PostsController`.

```rb
class MyEngine::PostsController < MyEngine::ApplicationController

end
```

## Set up views

In the engines views directory, there is are the directories `layouts/my_engine/application.html.erb`. If you do not intend to serve any localised views from the engine, then you can delete the `application.html.erb` file, and in the controller reference a different layout from your main application or another engine.

If however you want to give users access to a localised view in the engine, then create a directories for the controller in the views directory: `my_engine/posts`, and then add whichever views you want to.

Remember the 7 RESTful routes in the controller available to use are `index | show | new | create | edit | update | destroy`. Therefore the views you can create are:

- `index.html.erb`
- `show.html.erb`
- `new.html.erb`
- `edit.html.erb`

**FYI: if you're using HAML, make sure you include the `gem "haml"`**

## Set up routes

In the engines `/config/routes.rb` file, add resources to give users access to the posts controller you've created. You may also want to add a root to the controllers index action.

```rb
MyEngine::Engine.routes.draw do
  root to: 'posts#index'
  resource :posts
end
```

## Mount the engine

You need to mount the engine in your main app's `routes.rb` file.

```rb
mount MyEngine::Engine, at: '/myengine', as: 'my_engine'
# Engine::Path, at: url route, as: engine name in app
```

## Complete set up

Now that you have included the engine in your app gemfile, mounted it for authentication, created a home root in the engine, and created a controller in the engine, with required actions and related views, your engine should now be set up and ready to view in the browser.
