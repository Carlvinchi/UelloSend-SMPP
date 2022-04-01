module.exports = {
  apps : [{
    name      : "smpp-app",
    script    : "../index.js", // path needs to be relative from ecosystem.config.js
    watch     : true, // any changes to app folder will get pm2 to restart app
    env       : {
      "PORT": 3500,
      "NODE_ENV": "development" // define env variables here
    },
    env_production: {
      "PORT": 5000,
      "NODE_ENV": "production"
    }
  }]
}
