const createComponent = (component, props) => {
  const instance = component(props);
  return instance;
};

export default createComponent;
