---
title: Rails router
date: 2017-02-15 12:00:00
categories: [rails, ruby]
---


    DESCRIPTION: The rails router recognises the URL's passed to the app and channels to a controller's action. It can also generate paths and URL's, so the path does not need to be hard coded into the app's view.


Documentation can be found here:

[Rails Routes](http://guides.rubyonrails.org/routing.html)

## Basics

When the app receives an incoming URL `GET /blogs/5`, the router needs to match the incoming URL with a controller. This is a `:show` get HTTP method, and so it would be channelled as follows

```ruby
get '/bogs/:id', to: 'blogs#show'
```

In the blogs controller show action, you can then access the `:id` being passed in the URL like so:

```ruby
class BlogsController < ApplicationController
  def show
    @blog = Blog.find(params[:id])
  end
end
```

This then saves the blog object with an id of 5 to the variable `@blog`.

If you then edit the route to look like this:

```ruby
get '/blogs/:id', to: 'blogs#show', as: 'blog'
```

This enables us to use the route helper in the view when using `link_to`:

```erb
<%= link_to 'Blog Five', blog_path(@blog) %>
```

**NOTE:** the `as:` is what you refer to the link_to helper path as. It can be called anything. So in our example if I wanted to change the path_helper name from `blog` to `article`, I could do and the link_to helper would be `article_path(@blog)`.

### Resource routing

There are ***SEVEN*** RESTful routes `INDEX, SHOW, NEW, EDIT, CREATE, UPDATE, DESTROY`. Rails has **FIVE** HTTP methods to channel to these RESTful routes `GET, POST, PATCH, PUT, DELETE`. So in practice, if the router receives an incoming request like so:

```rb
DELETE /blogs/5
```

If the first matching resource is `resources :blogs`, then router accesses the `BlogsController`, the `show` action, and runs whatever code is in there. The code in the destroy controller would usually be something like this:

```rb
def destroy
  Blog.find(params[:id]).destroy
  flash[:success] = "Blog deleted"
  redirect_to_blogs_url
end
```

### CRUD (Create, Read, Update, Delete)
**IMPORTANT:** The `resources :blogs` creates seven different routes in the application, all mapping to the BlogsController

| HTTP Verb     | Path            | Controller#Action | Used for |
| ------------- | --------------- | ----------------- | ---------|
| GET           | /blogs          | blogs#index       | display a list of all blogs |
| GET           | /blogs/new      | blogs#new         | return an HTML form for creating a new blog |
| POST          | /blogs          | blogs#creates     | create a new blog |
| GET           | /blogs/:id      | blogs#show        | display a specific blog |
| GET           | /blogs/:id/edit | blogs#edit        | return an HTML form for editing a blog |
| PATCH/PUT     | /blogs/:id      | blogs#update      | update a specific blog |
| DELETE        | /blogs/:id      | blogs#destroy     | delete a specific blog |
