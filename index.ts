import * as yup from "yup";

interface SchemaType {
  [index: number]: string;
}

interface ValidationType {
  params: string[];
  type: string;
}

interface ConfigType {
  id: number;
  validationType: string;
  validations: ValidationType[];
}

export function createYupSchema(schema: SchemaType, config: ConfigType) {
  const { id, validationType, validations = [] } = config;
  if (!yup[validationType]) {
    return schema;
  }
  let validator = yup[validationType]();
  validations.forEach(validation => {
    const { params, type } = validation;
    if (!validator[type]) {
      return;
    }
    console.log(type, params);
    validator = validator[type](...params);
  });
  schema[id] = validator;
  return schema;
}
