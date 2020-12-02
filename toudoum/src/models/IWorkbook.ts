/**
 * Workbook Interface that represent workbooks table in Back-End
 *
 * @author Julien Dos Santos Ferreira <julien.dossantosferreira@he-arc.ch>
 * @export
 * @interface IWorkbook
 */
export interface IWorkbook {
    created_at: string;
    id: number;
    name: string;
    group_id: number;
    updated_at: string;
}