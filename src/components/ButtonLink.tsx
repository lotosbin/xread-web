import Button, {ButtonProps} from "@material-ui/core/Button";
import {LocationDescriptor} from "history";
import {Link} from "react-router-dom";
import React from "react";

interface ButtonLinkProps extends ButtonProps {
    to: LocationDescriptor;
}

const ButtonLink = ({to, ...props}: ButtonLinkProps) => {
    // @ts-ignore: see https://github.com/mui-org/material-ui/issues/7877
    return <Button component={Link} to={to} {...props} />;
};
export default ButtonLink;
