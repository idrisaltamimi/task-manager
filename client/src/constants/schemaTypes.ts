export interface SubTaskType {
  _id?: string,
  name: string,
  isCompleted: boolean
}

export interface TaskType {
  _id?: string,
  name: string,
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
  userId: string,
  createdAt?: string,
  _id?: string
  name: string
  columns: ColumnType[]
}