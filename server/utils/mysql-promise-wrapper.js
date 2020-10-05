exports.queryPromise = (pool, sql) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, (error, results) => {
            console.log(error);
            if (error) {

                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
}