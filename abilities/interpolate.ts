import { get } from "lodash";

//eslint-disable-next-line
export const interpolate = (template: any, vars: any) => {
  if (typeof template !== "string") {
    template = JSON.stringify(template);
  }

  return JSON.parse(template, (_, rawValue) => {
    if (
      typeof rawValue !== "string" ||
      !rawValue.startsWith("${") ||
      !rawValue.endsWith("}")
    ) {
      return rawValue;
    }

    const name = rawValue.slice(2, -1);
    const value = get(vars, name);

    if (typeof value === "undefined") {
      throw new ReferenceError(`Variable "${name}" is not defined`);
    }

    return value;
  });
};
