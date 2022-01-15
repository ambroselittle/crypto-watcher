
const mockDb = (expectedResult) => {
    const query = jest.fn(() => expectedResult);
    jest.doMock('../lib/db', () => ({
        ...jest.requireActual('../lib/db'),
        query,
    }));
    return { query };
}

module.exports = {
    mockDb,
}