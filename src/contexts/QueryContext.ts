import * as React from "react";

interface TValue {
    query: any;
    variables: any;
}

const defaultValue: TValue = {
    query: null,
    variables: null,
};
const QueryContext = React.createContext(defaultValue);
export default QueryContext
