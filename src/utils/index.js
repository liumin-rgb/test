const componentContext = require.context('./', false, /.js$/);
const modules = componentContext.keys().reduce((result, fileName) => {
  const moduleName = fileName.replace(/\.\/(.*)\.js$/g, '$1');
  if (moduleName !== 'index') result[moduleName] = componentContext(fileName).default;
  return result
}, {});

const utils = {
  ...modules
};
export default utils
