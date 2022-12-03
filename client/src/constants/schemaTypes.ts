export interface SubTaskType {
  title: string,
  isCompleted: Boolean
}

export interface TaskType {
  title: string,
  description: string,
  status: string,
  subtasks?: SubTaskType[]
}

export interface ColumnType {
  _id?: string,
  name: string,
  tasks?: TaskType[]
}

export interface BoardType {
  createdAt?: string,
  _id?: string
  name: string
  columns: ColumnType[]
}