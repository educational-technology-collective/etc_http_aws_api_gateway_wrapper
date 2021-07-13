export declare class AWSAPIGatewayWrapper {
    private _url;
    private _bucket;
    private _path;
    private _retry;
    private _errorHandler;
    constructor({ url, bucket, path, retry, errorHandler }: {
        url: string;
        bucket: string;
        path: string;
        retry?: number | null;
        errorHandler?: (e: any) => void | null;
    });
    request(data: any): void;
    requestAsync(data: any): Promise<Response>;
}
//# sourceMappingURL=index.d.ts.map