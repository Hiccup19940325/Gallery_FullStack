import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "@testing-library/react"

import ViewModal from "@/components/album/viewModal";

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

it("renders viewModal", () => {
    const url = "https://res.cloudinary.com/dhnalz0n9/image/upload/v1703691536/1703691562682.jpg";
    const show = true;
    const handleClose = jest.fn();

    act(() => {
        root.render(<ViewModal url={url} show={show} handleClose={handleClose} />);
    });

    const button = document.querySelector("button");
    act(() => {
        button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    })

    expect(handleClose).toHaveBeenCalledTimes(1);
})