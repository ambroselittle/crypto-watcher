
const mockDb = (expectedResult) => {
    const query = jest.fn(() => expectedResult);
    jest.doMock('../lib/db', () => ({
        ...jest.requireActual('../lib/db'),
        query,
    }));
    return { query };
}

const unMockDb = () => {
    jest.dontMock('../lib/db');
}

module.exports = {
    mockDb,
    unMockDb,
}