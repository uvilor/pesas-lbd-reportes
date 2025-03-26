export const PDF = {
    PESOS: {
        NAME: 'pesos',
    }

}

export const LAMBDA = {
    GET_PESOS: process.env.LAMBDA_GET_PESOS || ''
}

export const BUCKET = {
    PESAS_REPORT: process.env.BUCKET_PESAS_REPORT,
    DESTINATION_FOLDER: 'pdf/'
}