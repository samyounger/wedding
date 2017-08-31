---
title: Google prediction API setup
date: 2017-04-10
categories: [ big-data, google, prediction, api ]
---

    DESCRIPTION: I am setting up an application which is using historic data of restaurant deliveries per hour to predict on any given hour and day what order volume should be expected. I am going to pass the data to the google prediction api to do the regression analysis.

[Google Prediction API](https://cloud.google.com/prediction/docs/)

## Overview

The Google Prediction API very simply takes a CSV file as input which is calls training data, and it outputs its prediction.


## Quick start

A Google cloud storage account needs to be set up:

[Google Cloud Storage](https://console.cloud.google.com/)

### Enable prediction API

To enable the prediction API, in the left menu go to API manager, and top center click `Enable API`. In the search box type 'Prediction' and it should appear. Click on this an follow the instructions to enable it.

### Enable billing

You also need to enable billing for your project. To do this, in the left column menu, select billing and follow the instructions.

Also ensure the Google cloud storage API is enabled.

### Cloud storage

Open the cloud `storage > storage` section from the left menu, and create a storage bucket. The name you choose must be globally unique. In the other fields leave as default values, and `create`.

Once the bucket is created, click 'upload file' and upload your data file you want the prediction-APi to analyse. This should be a `.txt` file, it should not have any column headers, and the first column data type [string, integer] determines whether the analysis is regression (for integers) or categorisation (for strings).

### Train the model

Pass in the data csv file to the prediction API as follows:

``` javascript
POST https://www.googleapis.com/prediction/v1.6/projects/[PROJECT_ID]/trainedmodels
{
  "id": "language-identifier",
  "storageDataLocation": "quickstart-1465256213/language_id.txt"
}
```

The `[PROJECT_ID]` is the name of your project, and the storageDataLocation is the location of your project with the csv file name.

Successful reponses look like this

``` json
{
  "kind": "prediction#training",
  "id": "language-identifier",
  "selfLink": "https://www.googleapis.com/prediction/v1.6/projects/prediction-docs/trainedmodels/language-identifier",
  "storageDataLocation": "quickstart-1465256213/language_id.txt"
}
```

To confirm completion of the training, call this method:

``` javascript
GET https://www.googleapis.com/prediction/v1.6/projects/[PROJECT_ID]/trainedmodels/language-identifier
```

Replace the `[PROJECT_ID]` with your projects name.

In response take a look at the `trainingStatus` status:

``` json
{
  "kind": "prediction#training",
  "id": "language-identifier",
  "selfLink": "https://www.googleapis.com/prediction/v1.6/projects/prediction-docs/trainedmodels/language-identifier",
  "created": "2016-06-07T22:51:13.702Z",
  "trainingComplete": "2016-06-07T22:51:32.468Z",
  "modelInfo": {
    "numberInstances": "406",
    "modelType": "classification",
    "numberLabels": "3",
    "classificationAccuracy": "0.99"
  },
  "trainingStatus": "DONE"
}
```

### Submit fresh data

Once the model has been trained, you can submit data as frequently as you like for analysis as long as it remains in the same format as in the trained model.

``` javascript
POST https://www.googleapis.com/prediction/v1.6/projects/prediction-docs/trainedmodels/language-identifier/predict

{
  "input": {
    "csvInstance": [
      "Sont des mots qui vont tres bien ensemble"
    ]
  }
}
```

In reponse for the language prediction API we should get data which looks like this:

``` json
{
  "kind": "prediction#output",
  "id": "language-identifier",
  "selfLink": "https://www.googleapis.com/prediction/v1.6/projects/prediction-docs/trainedmodels/language-identifier/predict",
  "outputLabel": "French",
  "outputMulti": [
    {
      "label": "English",
      "score": "0.000000"
    },
    {
      "label": "French",
      "score": "1.000000"
    },
    {
      "label": "Spanish",
      "score": "0.000000"
    }
  ]
}
```

And you're done. FYI - the above instructions were taken from the google docs on the prediction api link provided at the top of this post. For more in depth instruction I would recommend going to the actual Google page and following.

The next step for me is to use these instructions above to create an order prediction service in a Ruby on Rails API.
