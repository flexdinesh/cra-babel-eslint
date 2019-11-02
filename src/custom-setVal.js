const customSetVal = (setter, cName, sName) => val => {
  if (!global.stateStore) {
    global.stateStore = {};
  }
  const str = global.stateStore;
  if (str[cName]) {
    if (str[cName][sName]) {
      str[cName][sName].push(val);
    } else {
      str[cName][sName] = [val];
    }
  } else {
    str[cName] = {
      [sName]: [val]
    };
  }

  const vals = str[cName][sName];
  if (vals.length > 1) {
    const prevVal = vals[vals.length - 2];
    console.log(`${cName}:${sName}: ${prevVal} => ${val}`);
  } else {
    console.log(`${cName}:${sName}: ${val}`);
  }

  return setter(val);
};

export default customSetVal;
