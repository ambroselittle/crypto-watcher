const { mockDb } = require('../../__test__/db');

beforeEach(() => {
    jest.dontMock('../../db');
})

const getContext = () => ({});

const getData = () => ({});

it('should get a list of pairs', async () => {
    //const { query } = mockDb([]);
    const data = getData();
    const context = getContext();

    const { process } = require('./getPairs');

    const actual = await process(data, context);

    expect(actual.data).toEqual({
        pairs: [],
    });

    //expect(query).toHaveBeenCalledTimes(1);
});