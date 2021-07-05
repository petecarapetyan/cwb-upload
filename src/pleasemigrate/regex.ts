export const replaceControlChars = (str: string) => {
  let val = str;
  val = val.toLowerCase();
  const searchRegExp = /[^\w\d\-\_]+/g;
  const replaceWith = "";
  val = val.replace(searchRegExp, replaceWith);
  return val;
};

export const dash4space = (str: string) => {
  let val = str;
  val = val.toLowerCase();
  const searchRegExp = / /g;
  const replaceWith = "-";
  val = val.replace(searchRegExp, replaceWith);
  return val;
};

// already freshened
export const underscore4space = (str: string) => {
  const searchRegExp = / /g;
  const replaceWith = "_";
  return str.replace(searchRegExp, replaceWith);
};

export const nameAsId = (str: string) => {
  let val = str;
  val = dash4space(val);
  val = replaceControlChars(val);
  val = cleanStartingUnderscore(val);
  return val;
};

export const underscore4slash = (str: string) => {
  let val = str;
  val = val.toLowerCase();
  const searchRegExp = /\//g;
  const replaceWith = "_";
  val = val.replace(searchRegExp, replaceWith);
  return val;
};

export const slash4underscore = (str: string) => {
  let val = str;
  val = val.toLowerCase();
  const searchRegExp = /_/g;
  const replaceWith = "/";
  val = val.replace(searchRegExp, replaceWith);
  return val;
};

export const dash4underscore = (str: string) => {
  let val = str;
  val = val.toLowerCase();
  const searchRegExp = /_/g;
  const replaceWith = "-";
  val = val.replace(searchRegExp, replaceWith);
  return val;
};

export const endConditionOne = (str: string) => {
  let val = str;
  val = val.toLowerCase();
  const searchRegExp = /.*\/(.*)$/;
  const replaceWith = "/";
  val = val.replace(searchRegExp, replaceWith);
  return val;
};

export const cleanStartingUnderscore = (str: string) => {
  let val = str;
  val = val.toLowerCase();
  const searchRegExp = /^_/;
  const replaceWith = "";
  val = val.replace(searchRegExp, replaceWith);
  return val;
};
