const { expect } = require('@jest/globals');
const resultData = require('./__test__/getPairLatest.json');

const candlesSince = 1642235760;
const pair = {
    exchange: 'kraken',
    pair: 'btcusd',
};

const getContext = () => ({
    candlesSince,
    pair,
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

    const { process, API_KEY_HEADER, PERIOD_INDICATOR } = require('./getPairLatest');

    const expectedData = resultData.result[60];

    const actual = await process(getData(), getContext());

    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith(expect.objectContaining({
        url: expect.stringContaining(`${pair.exchange}/${pair.pair}`),
        params: {
            after: candlesSince,
            periods: PERIOD_INDICATOR,
        },
        headers: expect.objectContaining({
            [API_KEY_HEADER]: expect.any(String),
        })
    }))

    expect(actual.context.pair.newCandles).toEqual(expectedData);
});