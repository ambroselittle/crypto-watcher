// We store data based in minute increments, but we only need to surface hourly acc. to spec

module.exports = {
    process: async (data, context) => {
        data.pair = context.pair;
        return { data, context };
    }
}