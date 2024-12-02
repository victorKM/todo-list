import { Subject } from '../subjects/subjects';

export interface Task {
  id: number;
  title: string;
  description: string;
  taskStatus: string;
  subject: Subject;
}
