const candles = require('./__test__/groupHistoryHourly.json');

const getContext = () => ({
    pair: {
        exchange: 'kraken',
        pair: 'btcusd',
        candles,
    },
});

const getData = () => ({});


it('should calculate deviation as expected', async () => {
    const { process } = require('./calculateDeviation');
    const expectedDeviation = 23.13; // what it should be based on the test hourly data

    const actual = await process(getData(), getContext());

    expect(actual.context.pair.stdDev).toEqual(expectedDeviation);
});