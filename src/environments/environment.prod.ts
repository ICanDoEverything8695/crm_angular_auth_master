export const environment = {
  production: true,
  localStorage: {
    prefix: 'KHSR', // prefix
    token: 'AUTH_TOKEN', // token storage
    refresh_token: 'REFRESH_TOKEN', // token storage refresh token
    user_info: 'ME' // authenticated user info
  },
  cookie: {
    storage: 'KHSR', // cookie storage
    value: 'DK4674352NVM', // cookie key
    life: 5 // life cycle of cookie days
  },
  idleTimer: 3530,
  baseAPIUrl: '/api/',
  googleMapAPIKey: 'xxx'
};
