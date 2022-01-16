// We store data based in minute increments, but we only need to surface hourly acc. to spec

module.exports = {
    process: async (data, context) => {
        // thinking will just filter to the "start" minute for each hour from the history set
        context.pair.candles = context.pair.candles.filter(candle => {
            const close_time = new Date(candle.close_time * 1000);
            const isHourMark = close_time.getMinutes() === 0;
            return isHourMark;
        });

        // to save hourly: require('fs').writeFileSync(require('path').join(__dirname, './__test__/groupHistoryHourly.json'), JSON.stringify(context.pair.candles));


        return { data, context };
    }
}