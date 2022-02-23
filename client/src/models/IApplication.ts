export interface IApplication {
  applications: IApplicationRows[]
}

export interface IApplicationRows {
  id: number
  createdAt: string
  updatedAt: string
  userId: number
  pseudonym: string
}
