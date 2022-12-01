export interface SubTaskType {
  title: string,
  isCompleted: Boolean
}

export interface TaskType {
  title: string,
  description: string,
  status: string,
  subtasks?: [SubTaskType]
}

export interface ColumnType {
  name: string,
  tasks?: [TaskType]
}

export interface BoardType {
  name: string,
  columns?: [ColumnType]
}