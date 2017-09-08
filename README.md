# hipchat-vue

## Introduction

This project is based on [hipchat-code-test](https://github.com/zero0Halo/hipchat-code-test), with the major exception being that it is written in Vue.js to make it more modular.

## Setup

Clone the repo, then from the terminal run `npm install`. The project uses gulp for its build processes with the following options:

* `gulp`: The default option runs the project in development mode. The CSS and JS both include sourcemaps and are unminified. The rendered files can be found in the `dev` folder.

* `gulp dist`: Prepares the project for distribution. The CSS and JS files are minified, and do not include sourcemaps. The rendered files can be found in the `dist` folder.

With both options, go to `http://localhost:8080` to view the output.

The original source code for the project can be found in the `src` folder. There is also a webtask that was used; more on that can be found below.

## Libraries/Tech of note

* **Bootstrap**: I didn't want to spend a lot of time putting together the UI, so I opted to go with Bootstrap to have something presentable. I should note that I only utilized its CSS libraries, and none of its JavaScript modules.

* **jQuery**: Although a very commonly used library, I have a tendency to not use it if I don't have to. My previous job put an emphasis on vanilla JavaScript, and in most situations using jQuery was unnecessary. However there are a few things this library offers that are incredibly useful, one of those being XHR requests. I used that for making calls to a webtask. That being said...

* **webtask.io**: I recently had the opportunity to start using webtasks, and I find them very useful. In this case, I wrote a webtask specifically for this project that would return the title of a page based on a given URL. I included the code for [the task](https://github.com/zero0Halo/hipchat-code-test/blob/master/getTitle.webtask.js) in this repo.

* **Vue**: Vue is a component based framework with similarities to React. As I have more experience with Vue, I decided to use it instead.
