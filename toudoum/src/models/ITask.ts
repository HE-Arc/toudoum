/**
 * Task Interface that represent tasks table in Back-End
 *
 * @author Lucas Fridez <lucas.fridez@he-arc.ch>
 * @export
 * @interface ITask
 */
export interface ITask {
    created_at: string;
    checked: boolean;
    description: string;
    end_date: string;
    id: number;
    name: string;
    priority: number;
    updated_at: string;
    workbook_id: number | null;
    pivot?: {
        checked: boolean;
        task_id: number;
        user_id: number;
    };
}