import {
  IFormControlAPI,
  IFormControlConfig,
  IFormControlConfigValue,
  IFormControlValidatorReturnValue,
  IFormControlValues
} from "./interfaces";
import { useEffect, useState } from "react";
import { checkForFalsyValues, generateInitialData } from "./util";

export const useForm = (
  config: IFormControlConfig,
  initialValidation: boolean = false
): IFormControlAPI => {
  const [valid, setValid] = useState(false);
  const [data, setData] = useState(generateInitialData(config));

  /**
   * Run full form validation on mount when initialValidation is true
   */
  useEffect(() => {
    if (initialValidation) {
      runFullValidation();
    }
  }, []);

  /**
   * Validate the form without checking each field's validity
   * *** only already validated fields will be counted ***
   */
  useEffect(() => {
    runShallowValidation();
  }, [data]);

  /**
   * On blur delete the value of an invalid field if it's not required
   */
  const handleBlur = (e: any) => {
    const { name } = e.target;
    let event = { ...e };
    event.target.value = event.target.value.trim();

    const fieldState: IFormControlConfigValue = config[name];
    const validity: IFormControlConfigValue = validateField(
      name,
      event.target.value
    );
    if (!fieldState.required && validity.valid === false) {
      event.target.value = "";
    }

    handleChange(event);
  };

  /**
   * Update the form data when input's value changes
   */
  const handleChange = (e: any) => {
    let { name, value } = e.target;
    if (name) {
      const validity: IFormControlValidatorReturnValue = validateField(
        name,
        value
      );

      setData({
        ...data,
        [name]: {
          value,
          ...validity
        }
      });
    }
  };

  const getValues = (): IFormControlValues => {
    let formValues: IFormControlConfig = {};
    for (let prop in data) {
      formValues[prop] = data[prop].value;
    }
    return formValues;
  };

  const getFields = (): IFormControlConfig => {
    return data;
  };

  const reset = (): void => {
    const newData = generateInitialData(config);
    setData(newData);
  };

  /**
   * Validate each field's rules and update global validity state
   */
  const runFullValidation = (): boolean => {
    const currentData: IFormControlConfig = data;
    let validatedData: Record<string, IFormControlConfigValue> = {};

    for (let prop in currentData) {
      const value: any = currentData[prop].value;
      const validity: IFormControlValidatorReturnValue = validateField(
        prop,
        value
      );

      validatedData[prop] = {
        ...currentData[prop],
        ...validity
      };
    }

    const valid: boolean = validateAllFields(validatedData);
    setData(validatedData);
    setValid(valid);

    return valid;
  };

  /**
   * Update global validity state with validation values from the state
   */
  const runShallowValidation = (): void => {
    const valid: boolean = validateAllFields();
    setValid(valid);
  };

  /**
   * Update each field's values
   */
  const setFields = (data: Record<string, IFormControlConfigValue>) => {
    let newData = { ...data };

    for (let prop in data) {
      const validity: IFormControlValidatorReturnValue = validateField(
        prop,
        data[prop]
      );

      if (newData[prop]) {
        newData[prop] = {
          ...validity,
          value: data[prop]
        };
      }
    }

    setData(newData);
  };

  /**
   * Shallow validate all fields and return global valid property
   */
  const validateAllFields = (DATA?: IFormControlConfig): boolean => {
    let fields: IFormControlConfigValue[];
    if (DATA) {
      fields = Object.values(DATA);
    } else {
      fields = Object.values(data);
    }
    return !fields.some(
      (field: IFormControlConfigValue) => field.valid === false
    );
  };

  /**
   * Validate a single field
   */
  const validateField = (
    name: string,
    value: any
  ): IFormControlValidatorReturnValue => {
    let { validators, required } = config[name];
    let validity: IFormControlValidatorReturnValue = {};
    const isFalsyValue: boolean = checkForFalsyValues(value);

    if (validators && !!value) {
      const errors: Function[] = validators.filter(
        (rule: Function) => !rule(value).valid
      );
      if (errors.length) {
        validity = errors[0](value);
      }
    } else if (required && isFalsyValue) {
      validity = {
        errorMsg: "This field is required",
        valid: false
      };
    }
    return validity;
  };

  return {
    getValues,
    getFields,
    handleBlur,
    handleChange,
    reset,
    setFields,
    valid,
    validate: runFullValidation
  };
};
