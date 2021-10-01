import { Maybe } from "../types";

// ------------------------------------
// ~ Url reader
// ------------------------------------

export function option(key: string, defaultValue: Maybe<string> = null) {
  const searchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(searchParams.entries());

  if (params[key] && typeof params[key] === 'string') {
    return params[key];
  }

  return defaultValue;
}

option.json = (key: string, defaultValue: any) => {
  const param = option(key);
  if (typeof param === "string" && /^{/i.test(param)) {
    return JSON.parse(param);
  }
  return defaultValue;
}

option.bool = (key: string, defaultValue = false) => {
  const param = option(key);
  return param ? /^true$/i.test(param) : defaultValue;
}

 option.number = (key: string, defaultValue : number) => {
  const param = option(key);

  if (param === null) return defaultValue;

  const num = Number(param);

  return isNaN(num) ? defaultValue : param;
}

option.smart = (key: string, defaultValue : any) => {
  if (typeof defaultValue === "boolean") return option.bool(key, defaultValue);
  if (typeof defaultValue === "number") return option.number(key, defaultValue);
  return option.json(key, option(key, defaultValue));
}

option.set = (key: string, value: any) => {
  const searchParams = new URLSearchParams(window.location.search);
  const serializedValue = typeof value === "string" ? value : JSON.stringify(value);

  searchParams.set(key, serializedValue);

  const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();

  window.history.pushState({path:newurl},'',newurl);
}
