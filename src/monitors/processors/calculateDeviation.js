module.exports = {
    prerequisites: ['getPairLatest'],

    process: async (data, context) => {
        console.log('Calculate Deviation');

        return { data, context };
    },
}