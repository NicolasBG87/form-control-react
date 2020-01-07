export const config = {
  firstName: {
    required: true,
    validators: [
      value => ({
        valid: value.length > 2,
        errorMsg: "Must be at least 3 characters long"
      })
    ]
  },
  lastName: {
    required: true,
    validators: [
      value => ({
        valid: value.length > 2,
        errorMsg: "Must be at least 3 characters long"
      })
    ]
  },
  age: {
    required: true,
    validators: [
      value => ({
        valid: value > 17,
        errorMsg: "Must be at least 18 years old"
      })
    ]
  }
};
