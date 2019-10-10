const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSchemeSteps,

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

