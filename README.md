# Infinite Scroll

## Unsplash API

Using the unsplash API, we can get two photos at a time, and specify a new batch of ten photos to get.

```javascript
`https://api.unsplash.com/photos/${clientID}&page=${page}`;
```

- Supply the client id and the page number of photos you want to get.

## Scrolling event

### Setting up useEffect

We can detect whenever the user scrolls using the `scroll` event. And then we have to put this inside a `useEffect` that adds the event listener and a cleanup function that removes the event listener.

**useEffect with DOM event rules**

1. Add the event in the `useEffect`
2. Remove the event in the returned cleanup function that will run before every `useEffect` call.

```javascript
React.useEffect(() => {
  const event = window.addEventListener("scroll", () => {});
  return () => window.removeEventListener("scroll", event);
}, []);
```

### Detecting scroll at end of page

```javascript
window.innerHeight + window.scrollY >= document.body.scrollHeight;
```

If the above condition is true, the user has scrolled all the way to the end of the page.

- You can also subtract a little from the scroll height if you want this condition to activate earlier, often making for a smoother experience.

## What I Learned from this project

One bug that gave me an immense source of grief is when my state variable wouldn't update in a string, even though every time I console logged it, the value seemed to be updating. I later found out that due to the asynchronous nature of the state setter functions, you can't use the state and set the state in close proximity to each other, no matter what.

- If you set a count using `setCount()` and then immediately use `count`, `count` won't update ever to be the value that you want.
- A gotcha in a `useEffect` was abstracting away the details in another function, but as long as referencing a state and setting the state are in the same `useEffect`, it won't work.

> A more concrete ruleset

- Have one `useEffect()` where you set some state
- Have another `useEffect()` where you listen for that state.

You should never have a `useEffect()` where you both use the state and set the state in the same function call(s).

> **Good**

```javascript
React.useEffect(() => {
  const event = window.addEventListener("scroll", () => {
    let scrollTime =
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;

    if (scrollTime) {
      setPage((p) => p + 1);
    }
  });
  return () => window.removeEventListener("scroll", event);
}, []);

React.useEffect(() => {
  fetchPhotos();
}, [page]);
```

> **Bad**

```javascript
React.useEffect(() => {
  const event = window.addEventListener("scroll", () => {
    let scrollTime =
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;

    if (scrollTime) {
      setPage((p) => p + 1);
      fetchPhotos(); // uses the page variable
    }
  });
  return () => window.removeEventListener("scroll", event);
}, []);
```
