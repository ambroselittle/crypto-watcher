const { mockDb, unMockDb } = require('../../__test__/db');

beforeEach(unMockDb);

const getContext = () => ({});

const getData = () => ({});

it('should get a list of pairs', async () => {
    const expectedData = {
        pairs: [
            { id: 1, exchange: 'bitfinex', pair_name: 'btcusd' },
            { id: 2, exchange: 'bitfinex', pair_name: 'ltcusd' }
        ]
    };

    const { query } = mockDb(expectedData.pairs);
    const data = getData();
    const context = getContext();

    const { process } = require('./getPairs');

    const actual = await process(data, context);

    expect(actual.data).toEqual(expectedData);
    expect(query).toHaveBeenCalledTimes(1);
});