const rawData = require('./__test__/getPairLatest.json');
const formatted = require('./__test__/formatPairData.json');


const getContext = () => ({
    pair: {
        exchange: 'kraken',
        pair: 'btcusd',
        newCandles: rawData.result[60],
    },
});

const getData = () => ({});


it('should convert from raw pairs to formatted', async () => {
    const { process } = require('./formatPairData');
    const expectedData = formatted;

    const actual = await process(getData(), getContext());

    expect(actual.context.pair.newCandles).toEqual(expectedData);
});