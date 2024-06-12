type User = {
  roles: string[]
}

export enum Roles {
  MANAGER = 'manager',
  USER = 'user',
  ALL = 'all'
}

export const hasAccess = (user: User, requiredRole: string): boolean => {
  if (requiredRole === Roles.ALL) return true

  return user.roles.includes(requiredRole)
}
