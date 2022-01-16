const resultData = require('./__test__/getPairLatest.json');


const getContext = () => ({
    pair: {
        exchange: 'kraken',
        pair: 'btcusd',
    },
});

const getData = () => ({});

const mockAxios = (data = resultData) => {
    const axios = jest.fn(() => ({
        data,
    }));
    jest.doMock('axios', () => axios);
    return axios;
}

it('should pull latest ohlc data for a pair', async () => {
    const axios = mockAxios();

    const { process } = require('./getPairLatest');

    const expectedData = resultData.result[60];

    const actual = await process(getData(), getContext());

    expect(axios).toHaveBeenCalledTimes(1);

    expect(actual.context.pair.candles).toEqual(expectedData);
});