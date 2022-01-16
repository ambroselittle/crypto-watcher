const { sql, query } = require('../../lib/db');

module.exports = {
    process: async (data, context) => {

        const select = sql`
SELECT
    id,
    exchange,
    pair_name,
    last_poll_timestamp,
    day_std_dev
FROM pair`;

        data.pairs = await query(select.text, select.values);
        return { data, context };
    },
}