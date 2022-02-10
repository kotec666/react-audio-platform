import { UserInstance } from '../models/interfaces'

interface IUser extends Omit<UserInstance, 'password'> {}

class UserDto {
  id: number
  login: string
  email: string
  role: string
  pseudonym: string
  isActivated: boolean
  activationLink: string

  constructor(model: IUser) {
      this.id = model.id
      this.login = model.login
      this.email = model.email
      this.role = model.role
      this.pseudonym = model.pseudonym
      this.isActivated = model.isActivated
      this.activationLink = model.activationLink
  }

}

export default UserDto
