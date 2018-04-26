let result = { statusCode : null, body: null };


async function main(e, ctx, cb) {
    try {
        console.log(e);
        if(e.key1 == "value1"){
            result.statusCode = 200;
            result.body = { "test": "lof"};
        }else {
            throw(new Error("Test"));
        }
        result.body = JSON.stringify(result.body);
        cb(null, result);
        
    }catch (err){
        cb(null, {statusCode: 500, body: err.message});
    }
}

module.exports = {
    default: main
}