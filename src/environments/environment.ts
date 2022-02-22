// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  localStorage: {
    prefix: 'KHSR', // prefix
    token: 'AUTH_TOKEN', // token storage access token
    refresh_token: 'REFRESH_TOKEN', // token storage refresh token
    user_info: 'ME' // authenticated user info
  },
  cookie: {
    storage: 'khsr', // cookie storage
    value: 'DK35763NVM', // cookie key
    life: 5 // life cycle of cookie days
  },
  idleTimer: 3530,
  baseAPIUrl: '/api/',
  googleMapAPIKey: 'xxx'
};
