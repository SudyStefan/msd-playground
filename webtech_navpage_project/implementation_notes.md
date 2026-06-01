# dynamic dom from json

- loadConfig() function runs once when script is loaded
- uses built in **fetch()** to make **http request** for the json file
- **async** keyword tells js that this function returns a **Promise**
- **await** in front of fetch() tells it to not execute codes that happens after until the http response has arrived

## The Event Loop (The "Game Loop" Analogy)

- **Call Stack:** The "Right Now." Current functions execution. If the stack isn't empty, the engine is busy.
- **The "Tick":** When the Stack is empty, the loop looks at the queues:
  1. **Microtask Queue (FIFO):** High priority. All resolved **Promises** go here. The loop must empty this _entire_ queue before doing anything else.
  2. **Macrotask Queue (FIFO):** Lower priority. `setTimeout`, `setInterval`, and DOM events go here.
- **Non-blocking:** Because `fetch` happens in the background (Web APIs), the Call Stack stays clear, keeping the UI from freezing.

## Introduction to Promises

- **Definition:** A wrapper for a value that will eventually exist.
- **States:** - _Pending_: Request sent, no answer yet.
  - _Fulfilled_: Success! Data is ready.
  - _Rejected_: Error! (e.g., 404 Not Found).
- **The await keyword:** Tells the function to pause and wait for the "Fulfilled" state before assigning the result to a variable.
