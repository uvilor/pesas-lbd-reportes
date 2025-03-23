import { ProxyRESTApiGatewayEvent } from "@uvilor/uvilor-utils";
import { LAMBDA } from "../../utility/constants";
import Lambda from "./Lambda";
import { PesosRp } from "./type";

export default class LambdaProvider extends Lambda {
    async getPesos(event: ProxyRESTApiGatewayEvent) {
        const { headers, queryStringParameters, requestContext } = event
        queryStringParameters.offset = '0'
        queryStringParameters.limit = '0'      
        const data = await this.invokeIncludeHeader(LAMBDA.GET_PESOS, {
            headers,
            queryStringParameters,
            requestContext
        })
        return data as PesosRp
    }
}