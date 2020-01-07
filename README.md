# form-control-react

> Control and Validate forms in React

[![NPM](https://img.shields.io/npm/v/form-control-react.svg)](https://www.npmjs.com/package/form-control-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save form-control-react
```

## Usage

### Create config object (can be a separate file to increase readability)

```ts
export const config = {
  firstName: {
    required: true,
    validators: [
      value => ({
        valid: value.length > 2,
        errorMsg: "Must be at least 3 characters long"
      })
    ]
  }
};
```

### Implement the hook directly onto native/custom HTML Elements/React Components

```tsx
import React from "react";
import { useForm } from "form-control-react";
import { config } from "./App.config";

export default const App = () => {
  const {getFields,handleChange,valid} = useForm(config);

  const { firstName } = getFields();
  return (
    <>
      <form>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="firstName"
            {...firstName}
          />
          <span>{firstName.errorMsg}</span>
        </div>
      </form>
      <button disabled={!valid}>Submit</button>
    </>
  );
};

export default App;
```

## License

MIT © [NicolasBG87](https://github.com/NicolasBG87)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
