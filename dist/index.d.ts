export declare class AWSAPIGatewayWrapperAsync {
    private _url;
    private _bucket;
    private _path;
    private _retry;
    constructor({ url, bucket, path, retry }: {
        url: string;
        bucket: string;
        path: string;
        retry: number;
    });
    request(data: any): Promise<any>;
}
export declare class AWSAPIGatewayWrapper extends AWSAPIGatewayWrapperAsync {
    private _errorHandler;
    constructor({ url, bucket, path, retry, errorHandler }: {
        url: string;
        bucket: string;
        path: string;
        retry: number;
        errorHandler?: (e: any) => void;
    });
    request(data: any): any | void;
}
//# sourceMappingURL=index.d.ts.map