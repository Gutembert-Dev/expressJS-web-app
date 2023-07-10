async function execute(className, query) {
    if(typeof className !== "function"){
        throw new Error("Wrong input/s. Please ensure the proper class name is given.");
    }
    try {
        const tx = await className.transaction(async trx => {
            let toQuery = "className." + query +";";
            console.log('To query: ', toQuery);
            const queryResult = await eval(toQuery);
            console.log('Query result: ', queryResult);
            return queryResult;
        });
    } catch (err) {
        // Here transaction has already been rolled back
        console.log(err);
    }
}

async function insert(className, json) {
    if(typeof className !== "function" || typeof json !== "object"){
        throw new Error("Wrong input/s. Please ensure the proper class name, and an json are given.");
    }
    try {
        const tx = await className.transaction(async trx => {
            const inserted = await className.query(trx).insertGraph(json);
            return inserted;
        });
    } catch (err) {
        // Here transaction has already been rolled back
        console.log(err);
    }
}

async function fetch(className, array) {
    if(typeof className !== "function" || typeof array !== "object" || !(array.length <= 1)){
        throw new Error("Wrong input/s. Please ensure the proper class name, and an array has a length less or equal to 1 are given.");
    }
    try {
        if(array.length == 0){
            const tx = await className.transaction(async trx => {
                const fetched = await className.query(trx);
                return fetched;
            });
        }
        if(array.length == 1){
            const tx = await className.transaction(async trx => {
                const fetched = await className.query(trx).where('id', array[0]);
                return fetched;
            });
        }
    } catch (err) {
        // Here transaction has already been rolled back
        console.log(err);
    }
}

async function update(className, json) {
    if(typeof className !== "function" || typeof json !== "object"){
        throw new Error("Wrong input/s. Please ensure the proper class name, and json are given.");
    }
    try {
        const tx = await className.transaction(async trx => {
            const updated = await className.query(trx).upsertGraph(json, { insertMissing: true });
            return updated;
        });
    } catch (err) {
        // Here transaction has already been rolled back
        console.log(err);
    }
}

async function remove(className, array) {
    if(typeof className !== "function" || typeof array !== "object" || !(array.length <= 1)){
        throw new Error("Wrong input/s. Please ensure the proper class name, and an array has a length less or equal to 1 are given.");
    }
    try {
        if(array.length == 0){
            const tx = await className.transaction(async trx => {
                const deleted = await className.query(trx).delete();
                return deleted;
            });
        }
        if(array.length == 1){
            const tx = await className.transaction(async trx => {
                const deleted = await className.query(trx).delete().where('id', array[0]);
                return deleted;
            });
        }
    } catch (err) {
        // Here transaction has already been rolled back
        console.log(err);
    }
}

module.exports = {
    insert,
    fetch,
    update,
    remove,
    execute
}

