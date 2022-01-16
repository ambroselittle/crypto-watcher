const stDev = require('node-stdev');

module.exports = {
    prerequisites: ['getPairLatest'],

    process: async (data, context) => {
        console.log('Calculate Deviation:', context.pair);


        return { data, context };
    },
}