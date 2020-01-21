"use strict";
exports.__esModule = true;
var yup = require("yup");
function createYupSchema(schema, config) {
    var id = config.id, validationType = config.validationType, _a = config.validations, validations = _a === void 0 ? [] : _a;
    if (!yup[validationType]) {
        return schema;
    }
    var validator = yup[validationType]();
    validations.forEach(function (validation) {
        var params = validation.params, type = validation.type;
        if (!validator[type]) {
            return;
        }
        console.log(type, params);
        validator = validator[type].apply(validator, params);
    });
    schema[id] = validator;
    return schema;
}
exports.createYupSchema = createYupSchema;
