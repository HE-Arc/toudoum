/**
 * Toudoum API Response Interface
 *
 * @author Lucas Fridez <lucas.fridez@he-arc.ch>
 * @export
 * @interface IToudoumResponse
 */
export interface IToudoumResponse {
    status: number;
    message: string;
    data: any;
}