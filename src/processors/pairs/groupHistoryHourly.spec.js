const candles = require('./__test__/formatPairData.json');
const hourlyCandles = require('./__test__/groupHistoryHourly.json');

const getContext = () => ({
    pair: {
        exchange: 'kraken',
        pair: 'btcusd',
        candles,
    },
});

const getData = () => ({});

it('should reduce to only hourly entries', async () => {
    const { process } = require('./groupHistoryHourly');
    const expectedData = hourlyCandles;

    const actual = await process(getData(), getContext());

    expect(actual.context.pair.candles).toEqual(expectedData);
});