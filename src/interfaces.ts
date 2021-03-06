export interface IFormControlConfig {
  [key: string]: IFormControlConfigValue;
}

export interface IFormControlConfigValue {
  disabled?: boolean;
  errorMsg?: string;
  required?: boolean;
  validators?: ((value: any) => IFormControlValidatorReturnValue)[];
  valid?: boolean;
  value?: any;
}

export interface IFormControlValidatorReturnValue {
  valid?: boolean;
  errorMsg?: string;
}

export interface IFormControlValues {
  [key: string]: any;
}

export interface IFormControlAPI {
  getValues: () => IFormControlValues;
  getFields: () => IFormControlConfig;
  handleBlur: (e: any) => void;
  handleChange: (e: any) => void;
  reset: () => void;
  setFields: (data: Record<string, IFormControlConfigValue>) => void;
  valid: boolean;
  validate: () => boolean;
}
