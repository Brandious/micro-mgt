import { getUser } from '@renderer/store/user-store'
import { Roles, hasAccess } from '@renderer/utils'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({
  children,
  requiredRole
}: {
  children: JSX.Element
  requiredRole: Roles
}) => {
  const user = getUser()

  if (!user || !hasAccess(user, requiredRole)) {
    return <Navigate to="/" />
  }

  return children
}
