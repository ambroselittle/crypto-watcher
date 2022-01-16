// We store data based in minute increments, but we only need to surface hourly acc. to spec

module.exports = {
    process: async (data, context) => {
        // thinking will just filter to the "start" minute for each hour from the history set
        const hourlyCandles = [];
        let hourlyVolume = 0;
        const { candles } = context.pair;

        for (let i = 0; i < candles.length; i++) {
            const candle = candles[i];
            // I don't know if this summing of minutes is technically right, but if not, will probably need to refactor to request both minutes and hours
            // I was requesting by minute to prepare for the next feature request do to the minute updates; trying to kill two birds with one request
            // there is definitely a chance for inaccuracy on the first and last hour marks with this approach, so probably do need to go ahead and ask for hourly from service...
            // that or I ensure in the monitor to make the "after" to be an hour mark..
            hourlyVolume += candle.volume;
            const close_time = new Date(candle.close_time * 1000);
            const isHourMark = close_time.getMinutes() === 0;
            if (isHourMark) {
                candle.volume = hourlyVolume;
                hourlyCandles.push(candle);
                hourlyVolume = 0;
            }
        }

        context.pair.candles = hourlyCandles;

        // to save hourly: require('fs').writeFileSync(require('path').join(__dirname, './__test__/groupHistoryHourly.json'), JSON.stringify(context.pair.candles));

        return { data, context };
    }
}