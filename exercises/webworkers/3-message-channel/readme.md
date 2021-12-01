# Swap Starter

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/stackblitz/ng-be-workshop/tree/main/exercises/webworkers/3-message-channel?file=src%2Findex.html)

The idea of this exercise is to create two WebWorkers that communicate with each other over a 
[`MessageChannel`](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel).

The main thread spins up 2 workers, and sends each worker a different value. Worker 1 will receive value `a`, 
and Worker 2 will receive value `b`. The workers send their value over the `MessageChannel` to the other worker 
which will return the value back to the main thread. In this case, Worker 1 will send back `b` and Worker 2 
will send back `a`.


```
┌────────────────────────────────────────────────────────────┐
│                         Main Thread                        │
│                        b ▲      ▲ a                        │
│                          │      │                          │
│           ┌──────────────┘      └──────────────┐           │
│         a ▼                                    ▼ b         │
│  ┌─────────────────┐                  ┌─────────────────┐  │
│  │                 │                  │                 │  │
│  │                 │                  │                 │  │
│  │    Worker 1     │◄────────────────►│    Worker 2     │  │
│  │                 │  MessageChannel  │                 │  │
│  │                 │                  │                 │  │
│  └─────────────────┘                  └─────────────────┘  │
└────────────────────────────────────────────────────────────┘
```
