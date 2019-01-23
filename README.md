# CirqueLibrary

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.3.

## Build for Server side rendering (Angular Universal)

Currently this still has to be done manually, because I'm happy I got angular universal to work, and can't spend the cognitive effort to automate this right now.

### Manually

1. Copy the folders `node_modules` and `dist` to the server.
2. Restart forever

### Automatically (doesn't work yet)

0. Install pubsy: `npm i -g pubsy`
1. Add build task for Angular Universal to Pubsy
2. Make task that copies `node_modules` and `dist` (Probably better than doing `npm i` on the server)
2. Add task to restart `forever` on the server