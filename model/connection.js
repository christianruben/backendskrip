const mysql = require("mysql2");
const config = require('./config.js');

const connection = mysql.createConnection(config.def);

async function select (query, value, callback){
    const result = {
        res: null,
        field: null,
        err: null
    }
    try{
        const con = mysql.createConnection(config.def);
        const [res, field] = await con.promise().query(query, value || []);
        result.res = res;
        result.field = field;
        con.end();
    }catch(err){
        result.err = err;
    }

    callback(result);
}

async function manipulate(query, value, callback){
    const result = {
        res: null,
        err: null
    }
    try{
        const con = mysql.createConnection(config.def);
        const [res] = await con.promise().query(query, value || []);
        result.res = res;
        con.end();
    }catch(err){
        result.err = err;
    }

    callback(result);
}
const pool = mysql.createPool(config.pool);

async function poolSelect(query, value, callback){
    const result = {
        res: null,
        field: null,
        err: null
    }
    try{
        const promisePool = pool.promise();
        const [res, field] = await promisePool.query(query, value);
        console.log(res);
        result.res = res;
        result.field = field;
    }catch(err){
        result.err = err;
    }
    callback(result);
}

async function poolManipulate(query, value, callback){
    const result = {
        res: null,
        err: null
    }
    try{
        const promisePool = pool.promise();
        const [res] = await promisePool.query(query, value);
        result.res = res;
    }catch(err){
        result.err = err;
    }
    callback(result);
}

module.exports = {
    connection,
    select,
    manipulate,
    poolSelect,
    poolManipulate
};