"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import GoogleButton from 'react-google-button'

type Props = ComponentProps<"button"> & {
    onClick?: () => void;
};

export function GButton({ children, onClick, ...props }: Props) {
    const { pending, action } = useFormStatus();

    const isPending = pending && action === props.formAction;

    return (
            <GoogleButton
                onClick={e => {
                    e.preventDefault();
                    if (onClick) {
                        onClick();
                    }
                }}
            />
    );
}