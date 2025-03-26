import { LAMBDA } from "../../utility/constants";
import Lambda from "./Lambda";
import { PesosRp } from "./type";
type props = Record<string, string>
export default class LambdaProvider extends Lambda {
    async getPesos(authorizer: props, queryStringParameters: props, headers: props) {
        queryStringParameters.offset = '0'
        queryStringParameters.limit = '0'
        const data = await this.invokeIncludeHeader(LAMBDA.GET_PESOS, {
            httpMethod: "GET",
            headers,
            queryStringParameters,
            requestContext: { authorizer }
        })
        return data as PesosRp
    }
}