const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSchemeSteps,
    add,
    update,
    remove
}


function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes')
    .where({id})
    .first();
}

function findSchemeSteps(schemeId){
    return db('steps as w')
    .join('schemes as s', 's.id', 'w.scheme_id')
    .select('w.id', 'w.step_number', 'w.instructions', 's.scheme_name')
    .where({scheme_id: schemeId})
}

function add(scheme){
    return db('schemes')
        .insert(scheme, 'id')
        .then(([id]) => {
            return findById(id)
        });     
}

function update(id, changes) {
    return db('schemes')
    .where({id})
    .update(changes, '*')
}

function remove(id) {
    return db('schemes')
    .where({id})
    .del();
}


