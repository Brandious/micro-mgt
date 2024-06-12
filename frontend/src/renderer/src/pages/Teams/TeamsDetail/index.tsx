import { Roles, hasAccess } from '@renderer/utils'
import { ManagerTeamsDetail } from './ManagerTeamsDetail'
import { useUser } from '@renderer/store/user-store'
import { UserTeamsDetail } from './UserTeamsDetail'

export const TeamsDetail = (): JSX.Element => {
  const user = useUser()
  console.log('Access', hasAccess({ roles: user?.roles! }, Roles.MANAGER))
  return hasAccess({ roles: user?.roles! }, Roles.MANAGER) ? (
    <ManagerTeamsDetail />
  ) : (
    <UserTeamsDetail />
  )
}
