const { mockDb, unMockDb } = require('../../__test__/db');
const allEntries = require('./__test__/formatPairData.json');

beforeEach(unMockDb);

const getContext = () => ({
    params: {
        exchange: 'bitmix',
        pair: 'btceur',
    }
});

const getData = () => ({});

it('should get recent pair history', async () => {
    const expectedCandles = allEntries;

    const { query } = mockDb(expectedCandles);
    const data = getData();
    const context = getContext();

    const { process } = require('./getPairHistory');

    const actual = await process(data, context);

    expect(actual.context.pair.candles).toEqual(expectedCandles);
    expect(query).toHaveBeenCalledTimes(1);
});