const rawData = require('./__test__/getPairLatest.json');
const formatted = require('./__test__/formatPairData.json');


const getContext = () => ({
    pair: {
        exchange: 'kraken',
        pair: 'btcusd',
        candles: rawData.result[60],
    },
});

const getData = () => ({});


it('should convert from raw pairs to formatted', async () => {
    const { process } = require('./formatPairData');
    const expectedData = formatted;

    const actual = await process(getData(), getContext());

    expect(actual.context.pair.candles).toEqual(expectedData);
});