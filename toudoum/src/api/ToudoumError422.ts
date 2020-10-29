import { ToudoumError } from './ToudoumError';

export class ToudoumError422 extends ToudoumError {
    public data: Array<any>;

    public constructor(code: number, message: string, status: number, data: Array<any>) {
        super(code, message, status);

        this.code = code;
        this.message = message;
        this.status = status;
        this.data = data;
    }
}