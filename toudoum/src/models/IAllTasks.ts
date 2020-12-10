import { ITask } from './ITask';

/**
 * All User's Tasks
 *
 * @author Julien Dos Santos Ferreira <julien.dossantosferreira@he-arc.ch>
 * @export
 * @interface IGroup
 */
export interface IAllTasks {
    today: ITask[];
    week: ITask[];
    rest: ITask[];
}