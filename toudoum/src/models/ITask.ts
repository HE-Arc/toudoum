export interface ITask {
    created_at: string;
    description: string;
    end_date: string;
    id: number;
    name: string;
    priority: number;
    updated_at: string;
    workbook_id: number | null;
}