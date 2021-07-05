"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSAPIGatewayWrapper = void 0;
class AWSAPIGatewayWrapper {
    constructor({ url, bucket, path, retry = 1000, errorHandler = console.error }) {
        this._url = url;
        this._bucket = bucket;
        this._path = path;
        this._retry = retry;
        this._errorHandler = errorHandler;
        this.request = this.request.bind(this);
    }
    request(data) {
        (async () => {
            try {
                await this.requestAsync(data);
            }
            catch (e) {
                if (typeof this._errorHandler == "function") {
                    this._errorHandler(e);
                }
                if (typeof this._retry == "number") {
                    setTimeout(this.request, this._retry, data);
                }
            }
        })();
    }
    async requestAsync(data) {
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
            if (typeof this._errorHandler == "function") {
                this._errorHandler(e);
            }
            throw e;
        }
    }
}
exports.AWSAPIGatewayWrapper = AWSAPIGatewayWrapper;
