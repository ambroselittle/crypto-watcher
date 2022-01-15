// borrowed from https://node-postgres.com/guides/project-structure
const { Pool } = require('pg')
const pool = new Pool()

function sql(
    pieces,
    ...substitutions
) {
    let text = "";
    let values = [];
    let placeholdersIndex = 1;

    substitutions.forEach((item, piecesIndex) => {
        text += pieces[piecesIndex];

        if (Array.isArray(item)) {
            const placeholders = item.map(
                (x, innerIndex) => "$" + (placeholdersIndex + innerIndex)
            );
            text += placeholders.join(", ");
            values = values.concat(item);
            placeholdersIndex += item.length;
        } else {
            text += "$" + placeholdersIndex;
            values.push(item);
            placeholdersIndex++;
        }
    });

    text += pieces[substitutions.length];
    // Replacing newlines and tabs with a single space, for readability in logging
    text = text.replace(/(\t|\n)+/g, " ");

    return {
        text,
        values,
    };
}

module.exports = {
    sql,
    async query(text, params) {
        //        const start = Date.now()
        const res = await pool.query(text, params)
        // const duration = Date.now() - start
        // console.log('executed query', { text, duration, rows: res.rowCount })
        return res.rows;
    },
    async getClient() {
        const client = await pool.connect()
        const query = client.query
        const release = client.release
        // set a timeout of 5 seconds, after which we will log this client's last query
        const timeout = setTimeout(() => {
            console.error('A client has been checked out for more than 5 seconds!')
            console.error(`The last executed query on this client was: ${client.lastQuery}`)
        }, 5000)
        // monkey patch the query method to keep track of the last query executed
        client.query = (...args) => {
            client.lastQuery = args
            return query.apply(client, args)
        }
        client.release = () => {
            // clear our timeout
            clearTimeout(timeout)
            // set the methods back to their old un-monkey-patched version
            client.query = query
            client.release = release
            return release.apply(client)
        }
        return client
    }
}