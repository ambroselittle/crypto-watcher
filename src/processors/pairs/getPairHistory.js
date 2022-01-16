const { sql, query } = require('../../lib/db');

module.exports = {
    prerequisites: ['determineRecency'],
    process: async (data, context) => {

        const { exchange, pair } = context.pair || context.params || {}; // could come from straight context or via API params

        const select = sql`
SELECT
        pv.close_time,
        pv.volume
FROM    pair_ohlc pv
JOIN    pair p ON p.id = pv.pair_id
WHERE   p.exchange = ${exchange}
        AND p.pair_name = ${pair}
        AND pv.close_time >= ${parseInt(context.candlesSince / 1000)}
`;


        const rows = await query(select.text, select.values);

        // TODO: Get deviation and ranking for pair; hard code for now:
        context.pair = {
            exchange,
            pair,
            stdDev: 23.13,
            rank: 3,
            candles: rows.map(row => ({
                close_time: parseInt(row.close_time),
                volume: parseFloat(row.volume),
            })),
        }

        return { data, context };
    },
}