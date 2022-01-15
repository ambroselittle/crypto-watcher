const { mockDb } = require('../../__test__/db');

beforeEach(() => {
    jest.dontMock('../../db');
})

const getContext = (pair = 'btcusd') => ({
    params: {
        pair,
    },
});

const getData = () => ({});

it('should get the recent history for a pair', async () => {
    const { query } = mockDb([]);
    const data = getData();
    const context = getContext();

    const { process } = require('./getPairHistory');

    const actual = await process(data, context);

    expect(actual.data).toEqual({
        history: {
            entries: [],
        },
    });

    expect(query).toHaveBeenCalledTimes(1);
});