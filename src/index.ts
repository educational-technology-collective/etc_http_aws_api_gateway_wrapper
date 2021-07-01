export class AWSAPIGatewayWrapperAsync {

    private _url: string;
    private _bucket: string;
    private _path: string;
    private _retry: number | null;

    constructor(
        { url, bucket, path, retry = 1000 }:
            { url: string, bucket: string, path: string, retry: number | null }) {

        this._url = url;
        this._bucket = bucket;
        this._path = path;
        this._retry = retry;

        this.request = this.request.bind(this);
    }

    async request(data: any): Promise<Response> {

        let response: Response;

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
                setTimeout(this.request, this._retry, data);
            }

            throw e;
        }
    }
}

export class AWSAPIGatewayWrapper extends AWSAPIGatewayWrapperAsync {
    private _errorHandler: ((e: any) => void) | undefined | null;

    constructor(
        { url, bucket, path, retry = 1000, errorHandler = console.error }:
            { url: string, bucket: string, path: string, retry: number | null, errorHandler?: (e: any) => void }) {
        super({ url, bucket, path, retry });

        this._errorHandler = errorHandler;
    }

    request(data: any): any | void {
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
