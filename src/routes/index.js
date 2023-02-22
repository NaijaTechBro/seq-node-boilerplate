const router = require('express').Router();

const routes = [{ path: '/users', route: require('./users/user.routes') }];

for (const route of routes) {
  router.use(route.path, route.route);
}

module.exports = router;
