const getCallbackParams = (string) => {
  let params = {};
  let paramString;

  if (string.includes('?')) {
    const [callback, paramsList] = string.split('?');

    const paramsArray = paramsList.split('&');
    paramsArray.forEach((v) => {
      const [key, val] = v.split('=');
      params[key] = val;
      paramString = callback;
    });
  } else {
    paramString = string;
  }
  return { callback: paramString, params };
};

module.exports = { getCallbackParams };
