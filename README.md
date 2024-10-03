## to run this install following dependency

### fronten

yarn create vite
yarn
yarn add axios
yarn add react-icons
yarn dev -- to run

### backedend

yarn init
yarn add express
yarn add typescript ts-node @types/node @types/express --dev
yarn add nodemon --dev
npx tsc --init
yarn add mongoose
yarn add @types/mongoose --dev

**_in package.json _**

```js
 "scripts": {
    "start": "node dist/index.js",
    "build": "tsc",
    "dev": "nodemon src/index.ts"
  },
```
