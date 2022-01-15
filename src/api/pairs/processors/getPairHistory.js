const { sql, query } = require('../../../lib/db');

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

        const entries = await query(select.text, select.values);

        data.history = {
            entries,
        };

        return { data, context };
    },
}