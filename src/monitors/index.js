
const monitors = [
    require('./pairs'),
];

const MINIMUM_INTERVAL = Number(process.env.MINIMUM_INTERVAL) || 1000;

const validateMonitor = async (monitor) => {
    const badConfig = (reason) => {
        console.log(`ERROR: Monitor configuration for '${monitor.name}' is bad.`, reason, monitor);
        monitor.isValid = false;
    }

    monitor.isValid = true;
    if (typeof monitor.name !== 'string') {
        return badConfig('Missing monitor name.');
    }
    if (typeof monitor.start !== 'function') {
        return badConfig('Missing monitor func.');
    }
    monitor.interval = Number(monitor.interval);
    if (Number.isNaN(monitor.interval) || monitor.interval < MINIMUM_INTERVAL) {
        return badConfig(`Invalid monitor interval. Must be number greather than ${MINIMUM_INTERVAL}.`);
    }
}


const startMonitor = async (monitor) => {
    if (typeof monitor.isValid === 'undefined') { await validateMonitor(monitor); }
    if (!monitor.isValid) { return; }

    if (monitor.started || monitor.intervalRef !== undefined) {
        await stopMonitor(monitor);
    }

    monitor.intervalRef = setInterval(async () => {
        console.log('Running Monitor:', monitor.name);
        await monitor.start();
    }, monitor.interval);
    monitor.started = true;
}

/**
 * Starts any configured monitors we have. Use {@link stopMonitors} to end monitoring.
 */
const startAll = async () => {
    for await (const monitor of monitors) {
        await startMonitor(monitor);
    }
}

const stopMonitor = async (monitor) => {
    try {
        if (monitor.intervalRef) {
            clearInterval(monitor.intervalRef);
            delete monitor.intervalRef;
        }
        monitor.started = false;
    } catch (ex) {
        console.log('ERROR: Stopping monitor.', monitor, require('util').inspect(ex, { depth: 10 }));
    }
}

const stopAll = async () => {
    for await (const monitor of monitors) {
        await stopMonitor(monitor);
    }
}

const getConfiguredMonitors = () => monitors.map(monitor => ({
    name: monitor.name,
    isValid: monitor.isValid === undefined ? 'Unknown' : monitor.isValid,
    started: !!monitor.started,
}))

module.exports = {
    getConfiguredMonitors,
    startMonitor,
    stopMonitor,
    startAll,
    stopAll,
}