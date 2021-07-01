# ETC HTTP AWS API Gateway Wrapper

## Description
This package offers two Wrappers that can be used in order to log messages to specially configured AWS Gateway APIs.  Instantiation of a Wrapper involves providing 3 required arguments: the URL to the AWS API Gateway, the name of the S3 Bucket, and the path that messages should be saved to in the S3 bucket.

There are two Wrappers: `AWSAPIGatewayWrapperAsync` allows for you to perform error handling asynchronously. `AWSAPIGatewayWrapper` allows for errors to be logged using a callback function e.g., console.error.

Both Wrappers log errors to console.error by default.

Both Wrappers contain a single `request` method that will accept a JavaScript object or primitive as an argument.  The argument is serialized into JSON and sent to the S3 bucket and path specified in the constructor.

Each logged S3 object is named by the AWS Gateway server using a combination of timestamp and UUID.  E.g., `1625155259384-9a47660f-3ffe-469d-b1d5-2de875a6a022`. In this example, `1625155259384` is the timestamp and `9a47660f-3ffe-469d-b1d5-2de875a6a022` is the UUID.

## Installation Instructions

First change directory into the base directory of your repository.

Install the dependency and add it to your package.json file.
```bash
npm add @educational-technology-collective/etc_http_aws_api_gateway_wrapper
```

## Usage

Import the Wrappers.

```js
import { AWSAPIGatewayWrapperAsync, AWSAPIGatewayWrapper } from "@educational-technology-collective/etc_http_aws_api_gateway_wrapper"
```

### Instantiating AWSAPIGatewayWrapperAsync

constructor

 * options \<Object\>
   * url \<string\> The URL for the AWS API.
   * bucket \<string\> The name of the AWS S3 Bucket.
   * path \<string\> The path of the object that will be saved into the S3 bucket.
   * retry \<number\> An optional number of seconds to wait before retrying after an error. Default: 1000

AWSAPIGatewayWrapperAsync#request(data)
 * data \<any\> The object or primitive that will be JSON serialized and logged to the S3 Bucket.
 * Returns: \<Promise\<Response\>\>

Example:
```js
let awsAPIGatewayWrapperAsync: AWSAPIGatewayWrapperAsync = new AWSAPIGatewayWrapper(
    {
        url: "https://example.com",
        bucket: "the-buket-name",
        path: "the-path-in-bucket",
        retry: 1000
    });
```

### Instantiating AWSAPIGatewayWrapper

constructor

 * options \<Object\>
   * url \<string\> The URL for the AWS API.
   * bucket \<string\> The name of the AWS S3 Bucket.
   * path \<string\> The path of the object that will be saved into the S3 bucket.
   * retry \<number\> An optional number of seconds to wait before retrying after an error. Default: 1000
   * errorHandler \<Function\> An optional error handler.  Default: console.error.

AWSAPIGatewayWrapper#request(data)
 * data \<any\> The object or primitive that will be JSON serialized and logged to the S3 Bucket.
 * Returns: \<undefined\>

Example:

```js
let awsAPIGatewayWrapper: AWSAPIGatewayWrapper = new AWSAPIGatewayWrapper(
    {
        url: "https://example.com",
        bucket: "the-buket-name",
        path: "the-path-in-the-bucket",
        retry: 1000,
        errorHandler: console.error
    });
```

### Complete Example

This is an example of instantiating a Wrapper and logging a message to an S3 bucket.

```js
import { AWSAPIGatewayWrapperAsync, AWSAPIGatewayWrapper } from "@educational-technology-collective/etc_http_aws_api_gateway_wrapper";

let awsAPIGatewayWrapper: AWSAPIGatewayWrapper = new AWSAPIGatewayWrapper(
    {
        url: "https://example.com",
        bucket: "the-buket-name",
        path: "the-path-in-the-bucket",
        retry: 1000,
        errorHandler: console.error
    });

let timestamp: number = Date.now();

awsAPIGatewayWrapper.request(timestamp);
```