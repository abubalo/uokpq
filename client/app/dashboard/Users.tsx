import React from 'react'
import UserListPage from './UserList'

const Users: React.FC<{users: Record<string, any>}> = ({users}) => {
  return (
    <div>
      <UserListPage />
    </div>
  )
}

export default Users