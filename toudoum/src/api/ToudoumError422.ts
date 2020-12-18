import { ToudoumError } from './ToudoumError';

/**
 * Error 422 (When data error occured) like duplicate or missing parameters
 *
 * @author Lucas Fridez <lucas.fridez@he-arc.ch>
 * @export
 * @class ToudoumError422
 * @extends {ToudoumError}
 */
export class ToudoumError422 extends ToudoumError {
    public data: any;

    /**
     * Creates an instance of ToudoumError422.
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @param {number} code Error code in Back-Office
     * @param {string} message Message sent from server
     * @param {number} status Http Response statusCode 
     * @param {Array<any>} data data given from error
     */
    public constructor(code: number, message: string, status: number, data: Array<any>) {
        super(code, message, status);

        this.code = code;
        this.message = message;
        this.status = status;
        this.data = data;
    }
}