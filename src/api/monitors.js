const { Router } = require('express');
const monitors = require('../monitors');

const router = new Router();

router.route('/')
    .get(async (req, res) => {
        try {
            res.json({
                monitors: monitors.getConfiguredMonitors(),
            });
        } catch (ex) {
            console.log('ERROR: Getting monitors.', ex);
        }
    });

router.route('/start')
    .get(async (req, res) => {
        try {
            await monitors.startAll();

            res.json({
                monitors: monitors.getConfiguredMonitors(),
            });
        } catch (ex) {
            console.log('ERROR: Starting monitors.', ex);
        }
    });

router.route('/stop')
    .get(async (req, res) => {
        try {
            await monitors.stopAll();

            res.json({
                monitors: monitors.getConfiguredMonitors(),
            });
        } catch (ex) {
            console.log('ERROR: Stopping monitors.', ex);
        }
    });

module.exports = router;