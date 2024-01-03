import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "@testing-library/react";
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { mount, configure } from 'enzyme'
import { store } from "@/redux/store";
import { Provider } from "react-redux";

import AlbumCard from "@/components/album/AlbumCard";

configure({ adapter: new Adapter() });

let container: any = null;
let root: any;

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    root = createRoot(container);
    document.body.appendChild(container);
})

afterEach(() => {
    // cleanup on exiting
    container.remove();
    container = null;
});

it("renders AlbumCard", () => {
    const info = {
        _id: Date.now().toLocaleString(),
        name: "test name",
        image: {
            public_id: Date.now().toString(),
            url: 'https://loremflickr.com/cache/resized/65535_52551195881_287edc4796_b_640_360_nofilter.jpg'
        },
        owner: "shogoyoshie0325@outlook.com",
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString()
    }

    const wrapper = mount(<Provider store={store}><AlbumCard info={info} /></Provider>);

    expect(wrapper.find(`h2`).first().text()).toBe("test name");
    expect(wrapper.find(`button`).first().text()).toBe("view");
})