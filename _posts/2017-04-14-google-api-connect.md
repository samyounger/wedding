---
title: Connect Rails API to Google API
date: 2017-04-14
categories: [ google, api, rails, oauth, auth ]
published: false
---

    DESCRIPTION: I want to connect a Ruby on Rails API to a google storage bucket, and pass data to the google prediction api to spot patterns. For completeness of instruction I will describe the set up of the rails API also so we are working with exactly the same data.

## Google storage

I had previously never used Google storage, having only used amazon's aws s3 bucket service to store website contents for static web pages. This week I have a project which requires the google prediction api service to identify patterns in a data packet. The previous post I wrote:

[link](http://samyounger.com/big-data/google/prediction/api/2017/04/10/google-prediction-api.html)

contains instructions of how to quickly set up the Google Prediction api service manually uploading data through the browser interface. I now want to send a data csv file to a google storage bucket, then call the google prediction api and pass the google storage file you've just uploaded to the prediction api.

## Rails API

I currently work as a ruby on rails developer. As such I am going to build the back-end api out of rails. It is a framework that can set websites up fast, and I am a big fan of ruby as a tidy language to write.

### Rails setup

Lets call our rails api `language_identifier`.

In your terminal write

```bash
$ rails new language_identifier --api
```

Check your app has been set up by running in the browser `http://localhost:3000` and you should see the standard welcome page with 'Yay! You’re on Rails!'.

### Rails controller setup

Lets call out controller `languages_controller`.

In the app go to `app/controllers` and add a new file called `languages_controller.rb`.

In this new file copy in the code:

```rb
class LanguagesController < ApplicationController

  def index
  end

end
```

### Rails route setup

Go to the routes file in `app/config/routes.rb`. Here copy in the code replacing what is already there:

```rb
Rails.application.routes.draw do

  root to: "languages#index"

end
```
