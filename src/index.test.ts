import { useForm } from "./";
import { renderHook, act } from "@testing-library/react-hooks";
import { checkForFalsyValues, generateInitialData, isEmpty } from "./util";

let config = {
  name: {
    value: "John",
    required: true,
    rules: [
      (value: string) => ({
        valid: value.length > 2,
        errorMsg: "Must be at least 3 characters long"
      })
    ]
  }
};

describe("useForm", () => {
  const { result } = renderHook(() => useForm(config));
  it("generates initial state", () => {
    const data = result.current.getFields();
    const expectedResult = { name: { value: "John", required: true } };
    expect(data).toStrictEqual(expectedResult);
  });

  it("returns field values", () => {
    const data = result.current.getValues();
    const expectedResult = { name: "John" };
    expect(data).toStrictEqual(expectedResult);
  });

  it("handles blur event", () => {
    const event = {
      target: {
        name: "name",
        value: "John"
      }
    };

    const handleBlurSpy = spyOn(result.current, "handleBlur");

    act(() => {
      result.current.handleBlur(event);
    });

    expect(handleBlurSpy).toHaveBeenCalledWith(event);
  });

  it("handles change event", () => {
    const event = {
      target: {
        name: "name",
        value: "John"
      }
    };

    const handleChangeSpy = spyOn(result.current, "handleChange");

    act(() => {
      result.current.handleChange(event);
    });

    expect(handleChangeSpy).toHaveBeenCalledWith(event);
  });

  it("resets the form", () => {
    let data;
    act(() => {
      result.current.reset();
    });
    act(() => {
      data = result.current.getFields();
    });
    const expectedResult = { name: { value: "John", required: true } };
    expect(data).toStrictEqual(expectedResult);
  });

  it("runs full validation", () => {
    let data;
    act(() => {
      data = result.current.validate();
    });
    const expectedResult = true;
    expect(data).toStrictEqual(expectedResult);
  });

  it("returns global valid switch", () => {
    const data = result.current.valid;
    const expectedResult = true;
    expect(data).toStrictEqual(expectedResult);
  });
});

describe("checkForFalsyValues", () => {
  it("falsy number", () => {
    const data = checkForFalsyValues(-5);
    const result = true;
    expect(data).toBe(result);
  });

  it("truthy number", () => {
    const data = checkForFalsyValues(5);
    const result = false;
    expect(data).toBe(result);
  });

  it("falsy string", () => {
    const data = checkForFalsyValues("");
    const result = true;
    expect(data).toBe(result);
  });

  it("truthy string", () => {
    const data = checkForFalsyValues("John Doe");
    const result = false;
    expect(data).toBe(result);
  });
});

describe("generateInitialData", () => {
  it("returns correct data", () => {
    const data = generateInitialData(config);
    const result = {
      name: { value: "John", required: true }
    };
    expect(data).toStrictEqual(result);
  });
});

describe("isEmpty", () => {
  it("object is empty", () => {
    const data = isEmpty({});
    const result = true;
    expect(data).toBe(result);
  });

  it("object is not empty", () => {
    const data = isEmpty({ name: "John Doe" });
    const result = false;
    expect(data).toBe(result);
  });

  it("array is empty", () => {
    const data = isEmpty([]);
    const result = true;
    expect(data).toBe(result);
  });

  it("array is not empty", () => {
    const data = isEmpty(["John Doe"]);
    const result = false;
    expect(data).toBe(result);
  });
});
