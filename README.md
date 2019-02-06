# Cirque Library

The online lightweight variant of Cirquel. This will soon replace the normal website of cirquelapp.com.

## Build for Server side rendering (Angular Universal)

Currently this still has to be done manually, because I'm happy I got angular universal to work, and can't spend the cognitive effort to automate this right now.

### Manually

1. `npm run build:ssr`
2. Copy the folders `node_modules` and `dist` to the server.
3. Restart forever

### Automatically

0. Install pubsy: `npm i -g pubsy`
1. run `pubsy build`

Note on automated deployments: Currently we create the symlinks before running npm install... That's kinda shitty.