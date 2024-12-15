// uncontrollable.js - example for uncontrolled components in React

export const uncontrollable = (Component, propNames) => {
  return class Uncontrollable extends React.Component {
    constructor(props) {
      super(props);
      this.state = propNames.reduce((state, prop) => {
        state[prop] = props[prop] || undefined;
        return state;
      }, {});
    }

    render() {
      const { ...props } = this.props;
      propNames.forEach((prop) => {
        if (this.state[prop] !== undefined) {
          props[prop] = this.state[prop];
        }
      });
      return <Component {...props} />;
    }
  };
};
