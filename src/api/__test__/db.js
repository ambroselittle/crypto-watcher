
const mockDb = (expectedResult) => {
    const query = jest.fn(() => expectedResult);
    jest.doMock('../db', () => ({
        ...jest.requireActual('../db'),
        query,
    }));
    return { query };
}

module.exports = {
    mockDb,
}