'use client'

import type {ReactNode} from "react";

import {button} from './button.css'

type ButtonProps = {
    children: ReactNode
}

const Button = ({children}: ButtonProps) => (
    <button onClick={() => {
        console.log(navigator.userAgent)

    }} className={button}>
        {children}
    </button>
);

export default Button;
