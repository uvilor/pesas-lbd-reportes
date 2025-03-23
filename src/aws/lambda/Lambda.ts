'use strict';
import { LambdaClient, InvokeCommand, InvocationType, InvokeCommandInput } from '@aws-sdk/client-lambda'

const client = new LambdaClient();
export default class Lambda {

    async lambdaInvoke(params: InvokeCommandInput & { ObjectPayload: { [k: string]: any } }) {
        params.InvocationType = params.InvocationType ?? InvocationType.RequestResponse;
        params.LogType = 'None';
        params.Payload = JSON.stringify(params.ObjectPayload)
        const { Payload } = await client.send(new InvokeCommand(params));
        const result = Payload ? JSON.parse(Buffer.from(Payload).toString()) : {};
        if (result.errorType) {
            throw new Error(result.errorMessage)
        }
        return result;
    }

    async invokeIncludeHeader(FunctionName: string, Payload = {} as { [k: string]: any }, invocationType = InvocationType.RequestResponse) {
        const defaultHeaders = {
            'X-Forwarded-For': 'cce-transfer-setup',
            'Content-Type': 'application/json',
            'User-Agent': 'Lambda Call',
            ...(Payload?.headers || {})
        }
        Payload.headers = defaultHeaders;
        return this.lambdaInvoke({ FunctionName, ObjectPayload: Payload, InvocationType: invocationType });
    }
}