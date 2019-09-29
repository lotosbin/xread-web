import React from 'react';
import OButton, {ButtonProps} from "@material-ui/core/Button";

interface TProps extends ButtonProps {
    onClick: any
}

const Button = (props: TProps) => (
    <OButton {...props}>{props.children}</OButton>
);

export default Button;
