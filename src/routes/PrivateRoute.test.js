import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { Redirect, Route } from 'react-router';
import Adapter from 'enzyme-adapter-react-16';
import { PrivateRoute } from './PrivateRoute';


Enzyme.configure({ adapter: new Adapter() });

function setup(customProps) {
  const props = {
    component: () => <h1>Hyperspace tracker</h1>,
    isLoggedIn: false,
    redirect: '/login',
    ...customProps,
  };

  const wrapper = shallow(<PrivateRoute {...props} />);

  return {
    wrapper,
    props,
  };
}

describe('<PrivateRoute/>', () => {
  it('passes props to Route component', () => {
    const { wrapper } = setup({ path: '/scarif' });
    expect(wrapper.find(Route).prop('path')).toBe('/scarif');
  });

  it('redirects unauthenticated users to login', () => {
    const { wrapper } = setup();
    const ComponentToRender = wrapper.prop('render');
    const redirectWrapper = shallow(<ComponentToRender location="/scarif"/>);
    expect(redirectWrapper.find(Redirect).props()).toEqual({
      to: {
        pathname: '/login',
        state: { from: '/scarif' },
      },
    });
  });

  it('displays passed component to authenticated users', () => {
    const { wrapper, props } = setup({ isLoggedIn: true });
    const ComponentToRender = wrapper.prop('render');
    const componentWrapper = shallow(<ComponentToRender location="/scarif"/>);
    expect(componentWrapper.is(props.component)).toBe(true);
    expect(componentWrapper.props()).toEqual({
      location: '/scarif',
    });
  });
});
