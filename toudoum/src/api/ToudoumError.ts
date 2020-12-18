/**
 * Toudoum API Error
 *
 * @author Lucas Fridez <lucas.fridez@he-arc.ch>
 * @export
 * @class ToudoumError
 * @extends {Error}
 */
export class ToudoumError extends Error {
    // Properties
    public code: number;
    public status: number;

    /**
     * Creates an instance of ToudoumError.
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @param {number} code Error code in Back-Office
     * @param {string} message Message sent from server
     * @param {number} status Http Response statusCode
     */
    public constructor(code: number, message: string, status: number) {
        super(message);

        this.code = code;
        this.message = message;
        this.status = status;
    }
}