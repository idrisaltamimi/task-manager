export interface SubTaskType {
  _id?: string,
  title: string,
  isCompleted: boolean
}

export interface TaskType {
  _id?: string,
  title: string,
  description: string,
  status: string,
  subtasks: SubTaskType[]
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