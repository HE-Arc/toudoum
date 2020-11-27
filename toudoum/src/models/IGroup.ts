/**
 * Group Interface that represent groups table in Back-End
 *
 * @author Julien Dos Santos Ferreira <julien.dossantosferreira@he-arc.ch>
 * @export
 * @interface IGroup
 */
export interface IGroup {
    created_at: string;
    id: number;
    name: string;
    updated_at: string;
    users:number[];
}