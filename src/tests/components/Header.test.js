import React from 'react';
// import ReactShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
// import toJSON from 'enzyme-to-json';

import { Header } from './../../components/Header';

test('should render Header correctly', () => {
    // ---- using react-test-render to test ----
    // const renderer = new ReactShallowRenderer();
    // renderer.render(<Header />);
    // expect(renderer.getRenderOutput()).toMatchSnapshot();

    // ---- using enzyme to test -----
    const wrapper = shallow(<Header startLogout={() => {}}/>);
    // expect(wrapper.find('h1').length).toBe(1);
    // expect(wrapper.find('h1').text()).toBe('Expensify');
    expect(wrapper).toMatchSnapshot();
});

it('should call startLogout on button click', () => {
    const onStartLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={onStartLogout} />);
    wrapper.find('button').simulate('click');
    expect(onStartLogout).toHaveBeenCalled();
});