## II - Questions

There are no wrong answers, only good opportunities to learn something new.

1. What metrics are essential in term of Speed ?

- Bundle Time
- highly CPU-used function execution duration and amount of rerenders
- According hardware related to the app you want to run
- Api Calls latency
- Memory usage and leaks

2. Can you name ways to increase speed (perceived or actual load time) ?

- Lazy Load images
- Use Webpack or some tool to create bundles, compress files to minimize its size
- Caching files which are highly used

3. Could you tell me what are SSR, pre-rendering and Dynamic rendering ?

SSR: It's a feature that entails converting HTML files on the server into a fully rendered HTML page.
So when a user submits a request the server will instantly retrieve the fully rendered page to the client.

Pre-rendering: Means to render the HTML of all our pages when the site is built.
This avoids to render the HTML when the user navigates to that page.

Dynamic Rendering: Is the process of serving content based on the user agent that calls it.
It is recommended to be used when:

- you have a large site with rapidly changing content that requires quick indexing.
- your website relies on modern javascript functionality.
- your website relies on social media sharing and chat applications that require access to page content.

4. You have a bug to fix, you find the file(s) where the bug occurs, the code is a mess, what do you do ?

Firstly, I try to identify different behaviours and abstract them into functions.
Then, create unit tests for the recently created functions and check that the results returns what I they should return.
Finally, create different files and folders and move the functions to one of them organizing them by behaviour.

5. What represent FrontEnd to you ?

FrontEnd is what i've done in my last project with React.js so it represents an environment where I feel really comfortable with.

6. What was the last technical challenge you faced and how you did you handle it ?

The last technical challenge i faced was a schedule app (https://github.com/guidopj/schedule-app) written in React.js. I've created an infrastructure
conformed by executing redux actions, calling fake endpoints, receiving and storing the data in reducers, obtaining that data from selectors and
using them in containers to pass the data to the view.

7. What is the next language/framework/stack you want to learn this year and why ?

I've been working a while with React.js and I think it would be a good idea, focusing on frontend, to start with Angular
and in regards of backend start working with Nest. I have chosen those frameworks being both typed oriented since I don't have any professional
experience with them and also with any typed language / framework.
