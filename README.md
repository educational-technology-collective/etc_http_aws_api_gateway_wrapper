# ETC HTTP AWS API Gateway Wrapper

## Description
This package offers a Wrapper that can be used to log messages to specially configured AWS Gateway APIs.  Instantiation of a Wrapper involves providing 3 required arguments: the URL to the AWS API Gateway, the name of the S3 Bucket, and the path that messages should be saved to in the S3 bucket.

The Wrapper logs errors to console.error by default.

The Wrapper has two methods: `AWSAPIGatewayWrapper#request` and `AWSAPIGatewayWrapper#requestAsync`.

`AWSAPIGatewayWrapper#request` will handle errors by logging the error to the `errorHandler` specified in the constructor.  In the event of an error, it will then continue to retry the request after the number of seconds specified by the constructor's `retry` argument.

`AWSAPIGatewayWrapper#requestAsync` will return a Promise that will resolve with a `Response` object or reject with an error.  This method does not automatically retry the request if an error happens.  It gives you more control over error handling.

Each logged S3 object is named by the AWS Gateway server using a combination of timestamp and UUID.  E.g., `1625155259384-9a47660f-3ffe-469d-b1d5-2de875a6a022`. In that example, `1625155259384` is the timestamp and `9a47660f-3ffe-469d-b1d5-2de875a6a022` is the UUID.

## Installation Instructions

First change directory into the base directory of your repository.

Install the dependency and add it to your package.json file.
```bash
npm add @educational-technology-collective/etc_http_aws_api_gateway_wrapper
```

## Usage

Import the Wrapper.

```js
import { AWSAPIGatewayWrapper } from "@educational-technology-collective/etc_http_aws_api_gateway_wrapper"
```

### Instantiating AWSAPIGatewayWrapper

**constructor**
 * options \<Object\>
   * url \<string\> The URL for the AWS API.
   * bucket \<string\> The name of the AWS S3 Bucket.
   * path \<string\> The path of the object that will be saved into the S3 bucket.
   * retry \<number\> An optional number of seconds to wait before retrying after an error. This argument is relevant only when using the AWSAPIGatewayWrapper#request method.  It is ignored by AWSAPIGatewayWrapper#requestAsync.  Set this to null for no retry.  Default: 1000
   * errorHandler \<Function\> An optional error handler.  Set this to null in order to disable it.  Default: console.error.

**AWSAPIGatewayWrapper#requestAsync(data)**
 * data \<any\> The object or primitive that will be JSON serialized and logged to the S3 Bucket.
 * Returns: \<Promise\<Response\>\>

**AWSAPIGatewayWrapper#request(data)**
 * data \<any\> The object or primitive that will be JSON serialized and logged to the S3 Bucket.
 * Returns: \<void\>

Example:
```js
let awsAPIGatewayWrapper: AWSAPIGatewayWrapper = new AWSAPIGatewayWrapper(
    {
        url: "https://exmaple.com",
        bucket: "the-name-of-the-bucket",
        path: "the-path", // e.g., path/to/resource
        retry: 1000,
        errorHandler: console.error
    });
```

### Complete Example

This is an example of making a `synchronous` HTTP request to an S3 bucket.

```js

import { AWSAPIGatewayWrapper } from "@educational-technology-collective/etc_http_aws_api_gateway_wrapper";

let timestamp: number = Date.now();

let awsAPIGatewayWrapper: AWSAPIGatewayWrapper = new AWSAPIGatewayWrapper(
    {
        url: "https://exmaple.com",
        bucket: "the-name-of-the-bucket",
        path: "the-path", // e.g., path/to/resource
        retry: 1000,
        errorHandler: console.error
    });

awsAPIGatewayWrapper.request(["This request was made by AWSAPIGatewayWrapper#request.", timestamp]);
```

This is an example of making an `asynchronous` HTTP request to an S3 bucket.

```js

import { AWSAPIGatewayWrapper } from "@educational-technology-collective/etc_http_aws_api_gateway_wrapper";

let awsAPIGatewayWrapper: AWSAPIGatewayWrapper = new AWSAPIGatewayWrapper(
    {
        url: "https://exmaple.com",
        bucket: "the-name-of-the-bucket",
        path: "the-path", // e.g., path/to/resource
        errorHandler: console.error
    });

(async function () {

    try {

        let timestamp: number = Date.now();

        await awsAPIGatewayWrapper.requestAsync(["This request was made by AWSAPIGatewayWrapper#requestAsync.", timestamp]);
    }
    catch (e) {
        console.error(e);
    }
})();
```