import React from 'react';
import { renderHook } from "@testing-library/react-hooks";
import useClock from "./customHooks/useClock";
import '@testing-library/jest-dom/extend-expect';
import { mount, configure } from "enzyme";
import { act } from 'react-dom/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import TimeArrow from "./components/TimeArrow";
import App from "./App";

configure({adapter: new Adapter()});

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

describe('Test minute arrow', () => {
  it("should not update minutes after 1 second and update only seconds", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useClock());
    await waitForNextUpdate();
    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(1);
  })
});


describe('Test seconds arrow angle', () => {
  it("should increment by 6 every second", async () => {
    const wrapper = mount(<App/>);
    await whenStable();
    wrapper.update();
    const secondsArrowProps = wrapper.find(TimeArrow).first().props();
    const secondsAngle = secondsArrowProps.angle;
    expect(secondsAngle).toBe(6);
  })
});




