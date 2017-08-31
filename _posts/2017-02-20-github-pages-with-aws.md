---
title: Github pages with AWS route 53
date: 2017-02-15 23:00:00
categories: [github, git, github-pages, aws, route53]
---

    DESCRIPTION: This post will describe how to set up your own personal jekyll website with github pages and route it to an amazon AWS Route53 DNS provider for a cost-effective solution to launching your website live.

[GitHub](https://github.com/)
[AWS](https://aws.amazon.com/console/)
[Jekyll](https://jekyllrb.com/docs/github-pages/)

Launching a website can potentially be a costly exercise if going through one of the Content Management Service providers, or even through SquareSpace or WordPress. One of the most cost-effective solutions I found was to host the code on GitHub (which you should be doing anyway for version control), and to host the domain with Amazon Web Services. The cost of the domain varies depending on what you go for, but mine costs c. $10 per annum. On top of that Amazon charges for traffic to the site. With me using my own site this ranges from $3 - $6 per month.

## Step 1: Set up your GitHub repo

GitHub has a special service it calls [Pages](https://pages.github.com/). This is when they allow you to have one free personal website. I find it fantastically easy to use where any code pushes to the repository are instantly live, and while using usual workflow of `git add`, `git commit`, `git push`.

The first step to having access to your GitHub pages account is to set up a new repository like so: `username.github.io`. Of course change `username` with your github username.

Open the repository, and click the settings tab. Scroll down the pages and ensure the GitHub Pages Source is on masterbranch. Also below this change custom domain to your domainname, for example mine is `samyounger.com` - note do not put in the http:// reference, or www (which is a subdomain reference).

You are now done with github and can move onto AWS.

## Step 2: Purchase your domain name

Setting up an AWS account is fairly self explanatory, just make sure you set it up on the `basic` user account which is free, and not as `developer` which is a minimum of $25 per month. It effectively means you do not get any direct support if anything goes wrong.

In the AWS console, select `Route 53`. You will see in the middle of the page `Register Domain`. Here type in the domain name you want, choose a suitable ending `.com` `.co.uk` `.org` etc. and buy it.

## Step 3: Set up the Hosted Zone

In the menu bar in the left select `Hosted zones`.

    NOTE: If AWS did not automatically create a hosted zone upon buying the domain name, create one. So for example if you bought the domain name username.com, you create the hosted zone name username.com. Once created open it up.

    Once you have created the hosted zone, open it up, click the Type NS, and copy the values on the right (4x url's to awsdns addresses). Then go to the registered domains from the left menu, and in the Name Servers section on the right, click `Add or edit name servers`, delete any contents in there, and add the 4x lines you just copied one by one. This gives your domain name the address to the hosted zone.

If AWS did create a hosted zone for the domain name, then click the link to open the hosted zone. Here select `Create Record Set`. Leave the name box empty, Type is `A`, and in the value box put:

```
192.30.252.153
192.30.252.154
```

Then `Save Record Set`.

Next select `Create Record Set` again, in the name box type in `www`, type `A`, alias should be `Yes`, and in the Alias Target type in the main domain name e.g. `username.com`. Then `Save Record Set`.

### Second domain name

If you bought a second domain name, for example `username.co.uk` as well as `username.com`, then you will likely want to route the second address to the first address.

To do this in AWS, you will need to create an `S3 bucket`. In the AWS Services menu dropdown, select S3, then select `Create Bucket` and name the bucket identially to your second domain name, in my case `username.co.uk`. Once this is done, select `Properties > Static website hosting`, and click `Redirect all requests`, and in the box for target bucket or domain put your root address `username.com`. If you want to create a root for a `www` subdomain, then set up a second bucket for `www.username.com` and put the same redirect in.

Once this is done, you will need to go back to the AWS `Route 53` service, set up a second `Hosted Zone` for `username.co.uk`. Ensure the domain has the same `Name Servers` as the hosted zone. Here set up the two `A` Record Sets, for `username.co.uk` and `www.username.com`, the alias target should be the `S3 bucket`.

## Summary

You have now connected the GitHub username repository to AWS Route 53, and your website will be live assuming you have added content to your github repository.

## Follow up

Learn about Jekyll which GitHub Pages runs off.

[Jekyll Guidance Notes](https://jekyllrb.com/docs/github-pages/)

Finally in the project folder, create a `CNAME` file. In the file simply type the name of your domain, for example `username.com`. No HTTP:// reference.
