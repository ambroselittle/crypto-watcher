const { sql, query } = require('../../lib/db');

module.exports = {
    process: async (data, context) => {

        // TODO: Get deviation and ranking

        const select = sql`
SELECT
        pv.close_time,
        pv.volume
FROM    pair_ohlc pv
JOIN    pair p ON p.id = pv.pair_id
WHERE   p.exchange = ${context.params.exchange}
        AND p.pair_name = ${context.params.pair}
`;

        const candles = await query(select.text, select.values);

        context.pair = {
            exchange: context.params.exchange,
            pair: context.params.pair,
            candles,
        }

        return { data, context };
    },
}