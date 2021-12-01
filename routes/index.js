/*
Define the API routes
*/

const express = require('express');
const router = express.Router();

require('./register')(router);
require('./login')(router);
require('./users')(router);
require('./profile')(router);
require('./chat')(router);
// require('./verify')(router);
// require('./resend')(router);

module.exports = router;