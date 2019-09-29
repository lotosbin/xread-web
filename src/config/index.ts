interface TConfig {
    websocketEndpoint: string
}

const config: TConfig = {
    websocketEndpoint: process.env.REACT_APP_WEBSOCKET_URL || ""
};
export default config
