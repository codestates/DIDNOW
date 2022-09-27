//ecosystem.config.js
module.exports = {
    apps: [{
    name: 'Issuer-Server',
    script: './index.js',
    instances: 0,
    exec_mode: 'cluster',
    wait_ready: true,
    listen_timeout: 50000
    }]
  }