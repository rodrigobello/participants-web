# Participants Dashboard

The application consists of a panel where the user can enter a specific endpoint `/participants` and view the response information, i.e., information about Open Banking Brasil participants registered on the company's directory platform.

### 👉  [Check the live demo here](https://rodrigobello.github.io/participants-web/)

## Getting Started

### Running Locally
```
git clone git@github.com:rodrigobello/participants-web.git

yarn install
yarn dev
```

### Running Tests
```
yarn run test:unit 
yarn run test:e2e
```

### Deployment to GH Pages
```
yarn build
git add dist -f
git commit -m "..."
git subtree push --prefix dist origin gh-pages
```

## Used libraries and frameworks

- [Vue 3 + Typescript](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/) for state management
- [TailwindCSS](https://tailwindcss.com/) with components from [TailwindUI](https://tailwindui.com/) **(not open-source - check license section)**
- [Vitest](https://vitest.dev/) and [Cypress](https://www.cypress.io/) for unit, components and e2e tests

## License

This project uses a commercial template and is therefore not licensed under any open-source license. Forking this project as a base for your own projects is not permitted under the license of the original template ([more information here](https://github.com/tailwindlabs/tailwindcss/discussions/8810)).
