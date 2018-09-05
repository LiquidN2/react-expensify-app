import React from 'react';
import {shallow} from 'enzyme';
import NotfoundPage from './../../components/NotfoundPage';

test('it should render NotFoundPage', () => {
    const wrapper = shallow(<NotfoundPage />);
    expect(wrapper).toMatchSnapshot();
});