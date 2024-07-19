export type ApiError = {
    Data: null;
    HttpStatus: number;
    Messages: string[];
}

export type ErrorMessages = {
    [key: string]: string
}