'use strict';
import { S3Client, PutObjectCommand, GetObjectCommand, GetObjectCommandInput, PutObjectCommandInput, HeadObjectCommand, HeadObjectCommandInput } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Upload } from "@aws-sdk/lib-storage";
import { PassThrough } from 'node:stream';
const client = new S3Client();

export default class S3 {

    async getObject(params: GetObjectCommandInput) {
        return client.send(new GetObjectCommand(params))
    }
    async putObject(param: PutObjectCommandInput) {
        return client.send(new PutObjectCommand(param))
    }

    createStreamUpload(Bucket: string, Key: string, ContentType: string) {
        const passThrough = new PassThrough()
        const uploadPromise = new Upload({
            client,
            params: {
                Bucket,
                Key,
                ContentType,
                Body: passThrough
            }
        })
        return { passThrough, uploadPromise: uploadPromise.done() }
    }

    async checkIfFileExists(params: HeadObjectCommandInput) {
        try {
            await client.send(new HeadObjectCommand(params));
            return true;
        } catch (error: any) {
            if (error.name != "NotFound") {
                console.log(error);

            }
            return false;
        }
    }

    async getPreSignedUrl(param: GetObjectCommandInput, expiresIn = 3600) {
        return getSignedUrl(client, new GetObjectCommand(param), { expiresIn })
    }

    async getPreSignedUrlIfExists(params: HeadObjectCommandInput, expiresIn = 3600) {
        const isExist = await this.checkIfFileExists(params)
        if (isExist) return await this.getPreSignedUrl(params, expiresIn)
        return null;
    }

}