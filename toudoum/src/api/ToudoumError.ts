export class ToudoumError extends Error {
    public code: number;
    public status: number;

    public constructor(code: number, message: string, status: number) {
        super(message);

        this.code = code;
        this.message = message;
        this.status = status;
    }
}