interface TConfig {
    apiEndpoint: string;
    websocketEndpoint: string;
}

const config: TConfig = {
    apiEndpoint: process.env.REACT_APP_API_URL || "",
    websocketEndpoint: process.env.REACT_APP_WEBSOCKET_URL || "",
};
console.log(`config:${JSON.stringify(config)}`);
export default config
