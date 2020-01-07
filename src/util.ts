import { IFormControlConfig } from "./interfaces";

export const isEmpty = (value: any): boolean => {
  const isArray: boolean = Array.isArray(value);
  let empty: boolean = false;
  if (isArray) {
    empty = !value.length;
  } else {
    empty = !Object.keys(value).length;
  }
  return empty;
};

export const generateInitialData = (config: IFormControlConfig) => {
  let formData: Record<string, any> = {};

  for (let prop in config) {
    const fieldState = config[prop];
    const hasValue = fieldState.hasOwnProperty("value");

    formData[prop] = {
      value: hasValue ? fieldState.value : ""
    };

    if (fieldState.hasOwnProperty("valid")) {
      formData[prop].valid = fieldState.valid;
    }

    if (fieldState.hasOwnProperty("disabled")) {
      formData[prop].disabled = fieldState.disabled;
    }

    if (fieldState.hasOwnProperty("required")) {
      formData[prop].required = fieldState.required;
    }
  }

  return formData;
};

export const checkForFalsyValues = (value: any): boolean => {
  let invalid: boolean = false;
  switch (typeof value) {
    case "number":
      invalid = value < 0;
      break;
    case "string":
      invalid = !value.length;
      break;
    default:
      invalid =
        typeof value === undefined || typeof value === null || isEmpty(value);
      break;
  }

  return invalid;
};
