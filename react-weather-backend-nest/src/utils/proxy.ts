import appConfig from "../config";
import * as tunnel from 'tunnel';
import {AxiosRequestConfig} from "axios";

const proxyTunnel = tunnel.httpsOverHttp({
    proxy: {
        host: appConfig.proxyHost,
        port: +appConfig.proxyPort,
    },
});

export function createRequestConfigWithProxy() : AxiosRequestConfig {
    return appConfig.proxyHost ? { httpsAgent: proxyTunnel } : {};
}
