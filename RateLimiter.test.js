// Test file
import React from 'react';
import { shallow } from 'enzyme';
import RateLimiterApp from './main';

describe('RateLimiterApp', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<RateLimiterApp />);
    expect(wrapper.find('h1').text()).toBe('Rate Limiter App');
  });

  it('updates rate limit correctly', () => {
    const wrapper = shallow(<RateLimiterApp />);
    const newRateLimit = 50;
    wrapper.setState({ rateLimit: newRateLimit });
    expect(wrapper.state().rateLimit).toBe(newRateLimit);
  });

  it('gets stats correctly', () => {
    const wrapper = shallow(<RateLimiterApp />);
    const requests = 10;
    wrapper.setState({ requests: requests });
    expect(wrapper.state().requests).toBe(requests);
  });
});