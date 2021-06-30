"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSAPIGatewayWrapper = exports.AWSAPIGatewayWrapperAsync = void 0;
class AWSAPIGatewayWrapperAsync {
    constructor({ url, bucket, path, retry = 1000 }) {
        this._url = url;
        this._bucket = bucket;
        this._path = path;
        this._retry = retry;
        this.request = this.request.bind(this);
    }
    async request(data) {
        let response;
        try {
            response = await fetch([this._url, this._bucket, this._path].join("/"), {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json"
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify({ data: data })
            });
            if (response.status !== 200) {
                throw new Error(JSON.stringify({
                    "response.status": response.status,
                    "response.statusText": response.statusText,
                    "response.text": await response.text()
                }));
            }
            return response;
        }
        catch (e) {
            if (typeof this._retry == "number") {
                //setTimeout(this.request, this._retry, data);
            }
            throw e;
        }
    }
}
exports.AWSAPIGatewayWrapperAsync = AWSAPIGatewayWrapperAsync;
class AWSAPIGatewayWrapper extends AWSAPIGatewayWrapperAsync {
    constructor({ url, bucket, path, retry = 0, errorHandler = console.error }) {
        super({ url, bucket, path, retry });
        this._errorHandler = errorHandler;
    }
    request(data) {
        (async () => {
            try {
                await super.request(data);
            }
            catch (e) {
                if (typeof this._errorHandler == "function") {
                    this._errorHandler(e);
                }
            }
        })();
    }
}
exports.AWSAPIGatewayWrapper = AWSAPIGatewayWrapper;
