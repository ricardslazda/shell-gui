export class Dao {
    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            window.sqlite3.run(sql, params, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve()
                }
            })
        })
    }

    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            window.sqlite3.get(sql, params, (err, result) => {
                if (err) {
                    console.log('Error running sql: ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            window.sqlite3.all(sql, params, (err, rows) => {
                if (err) {
                    console.log('Error running sql: ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
}