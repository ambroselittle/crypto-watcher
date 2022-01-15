const { sql, query } = require('../../../lib/db');

module.exports = {
    process: async (data, context) => {

        const select = sql`
SELECT
    id,
    exchange,
    pair_name
FROM pair`;

        data.pairs = await query(select.text, select.values);
        return { data, context };
    },
}