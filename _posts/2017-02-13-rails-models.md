---
title: Rails models
date: 2017-02-13 12:00
categories: [rails, ruby]
---

    DESCRIPTION: The model controls what is required when putting data into your database.

## Scope

Scope is used for commonly used queries in the model where you want to filter the data. For example:

```ruby
class Article < ApplicationRecord
  scope :published, where(published: true)
end
```

This example would only show data sets where published equals true, all false published articles will not be shown.

It is good practice to put this filtering into the model rather than the controller to keep the controller cleaner.

You can also filter the database by ordering the database, and filtering out above/below certain integers or letters. For example:

``` ruby
class Arcticle < ApplicationRecord
  scope: :fresh, where("age < 20")
  scope: :recent, where("created_at desc").limit(3)
end
```

This will filter out any age which is above 20, and it will take the created_at column, filter the dates in descending order, and only display the top 3.

Then in the controller if we want to call these methods from the model we can chain queries together:

`Article.published.fresh.recent`

This query would display articles which have been published, have an age of less than 20, and only the 3 most recent articles.

## Callbacks

Callbacks are used within the model to run some check before any of the other methods are run.

```ruby
class Article < ApplicationRecord
  before_save :recent_publish_check

  def recent_publish_check
    self.fresh_article = true if age < 20
  end
end
```

This will check before any article is saved to the database whether the age is less than 20, and if so it will change the fresh_article attribute from false to true if necessary.

It is also possible to stop data being saved to the database with a before_save check.

```ruby
class Article < ApplicationRecord
  before_save :already_published

  def already_published
    return false
  end
end
```

This will simply return false for any call to Article. With false being returned, the method immediately stops running and nothing is saved to the database. Be careful not to do this unless you have a good reason to do so.

Here are all the callbacks available:

```ruby
class Article < ApplicationRecord
  before_validation
  after_validation

  before_save
  after_save

  before_create
  after_create

  before_update
  after_update

  before_destroy
  after_destroy
end
```
