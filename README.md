# React app seed

This project a simple configuration and app started using minimal approach and dependencies. to allow a faster bundle and build process this project is configured to use [esbuild] for client and server side.

The project configuration uses the following dependencies:

- PostCSS; to allow css insolation for react components CSSModules along with other PostCSS plugins are configured, css modules. example: `import styles from 'style.module.css'`

- ESLint; to ensure all code is readable a minimal setup of react using eslint is configured you can run it using `npm run lint`.

- Esbuild; a minimal configuration of esbuild can be found in the `/scripts` folder. you can also find plugins `/scripts/plugins` to enable importing SVG and PostCSS.

```sh
# generate build for production
npm run build
# start project using distribution files
npm start
# using watch and development mode
npm run dev
```

## Running Docker
```sh
# generate build
npm run build
# start docker instance
docker compose up --build -d
# stop instance
docker compose down
# build
docker compose build
```
