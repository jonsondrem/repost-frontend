# Repost Front-end
This is the front-end [Vue.js](https://vuejs.org/) web server for Repost API.

## Installation
[Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) are required
for building.

1. Clone the repository
```bash
git clone https://github.com/jonsondrem/repost-frontend.git
```

2. Navigate to the `repost-frontend` directory and install npm packages
```bash
cd repost-fastapi
npm install
```

3. Make changes to the .env file as needed. See [Configuration](#configuration)
for details

4. Build the project
```bash
npm run build
```

## Configuration
Configurations are made with environment variables before building. The easiest is
using the provided `.env` file for further configuration. The following environment 
variables can be used.

- **VUE_APP_CLIENT_ID** - The OAuth2 client_id
- **VUE_APP_APIS** - Name of all APIs separated by `;`
- **VUE_APP_API_0** - URL to the first API in the list defined in `VUE_APP_APIS`. 
Add more APIs by using `VUE_APP_API_1` etc

## Distribution
Use your favorite web server to host the files in the `/dist` directory.
