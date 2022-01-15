const { mockDb } = require('../../../__test__/db');

beforeEach(() => {
    jest.dontMock('../../../lib/db');
})

const getContext = () => ({
    params: {
        exchange: 'bitmix',
        pair: 'btceur',
    }
});

const getData = () => ({});

it('should get recent pair history', async () => {
    const expectedData = {
        history: {
            entries: [
                // TODO: Get real mock data
            ],
        },
    };

    const { query } = mockDb(expectedData.history.entries);
    const data = getData();
    const context = getContext();

    const { process } = require('./getPairHistory');

    const actual = await process(data, context);

    expect(actual.data).toEqual(expectedData);
    expect(query).toHaveBeenCalledTimes(1);
});