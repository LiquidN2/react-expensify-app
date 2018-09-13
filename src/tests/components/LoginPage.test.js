import React from 'react';
import { shallow } from 'enzyme';

import { LoginPage } from './../../components/LoginPage';

test('should render login page correctly', () => {
    const wrapper = shallow(<LoginPage startLogin={() => {}}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should start login on button click', () => {
    const onStartLogin = jest.fn();
    const wrapper = shallow(<LoginPage startLogin={onStartLogin} />);
    wrapper.find('button').simulate('click');
    expect(onStartLogin).toHaveBeenCalled();
});