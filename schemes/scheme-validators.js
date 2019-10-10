module.exports = {
    isValidScheme,
};

function isValidScheme(scheme){
    return !! scheme.scheme_name;
}