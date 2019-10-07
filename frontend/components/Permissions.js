import { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';
import Table from './styles/Table';

const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE',
];

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const Permissions = () => {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY);

  if (loading) return 'Loading...';

  return (
    <div>
      <ErrorMessage error={error} />
      <div>
        <h2>Manage permissions</h2>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {possiblePermissions.map((permission) => <th key={permission}>{permission}</th>)}
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user) => <UserPermissions user={user} key={user.id} />)}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

const handleChange = (e, userPermissions, setUserPermissions) => {
  const checkbox = e.target;
  let updatedPermissions = [...userPermissions];

  if (checkbox.checked) {
    updatedPermissions.push(checkbox.value);
  } else {
    updatedPermissions = updatedPermissions
      .filter((updatedPermission) => updatedPermission !== checkbox.value);
  }

  setUserPermissions(updatedPermissions);
};

const UserPermissions = ({
  user: {
    id,
    name,
    email,
    permissions,
  },
}) => {
  const [userPermissions, setUserPermissions] = useState([...permissions]);

  const [updatePermissions, { loading, error }] = useMutation(UPDATE_PERMISSIONS_MUTATION);

  return (
    <>
      {error && <tr><td colSpan="9"><ErrorMessage error={error} /></td></tr>}
      <tr>
        <td>{name}</td>
        <td>{email}</td>
        {possiblePermissions.map((permission) => {
          const key = `${id}-permission-${permission}`;

          return (
            <td key={key}>
              <label htmlFor={key}>
                <input
                  id={key}
                  type="checkbox"
                  checked={userPermissions.includes(permission)}
                  value={permission}
                  onChange={(e) => handleChange(e, userPermissions, setUserPermissions)}
                />
              </label>
            </td>
          );
        })}
        <td>
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              updatePermissions({
                variables: {
                  permissions: userPermissions,
                  userId: id,
                },
              });
            }}
          >
            Update
          </button>
        </td>
      </tr>
    </>
  );
};

UserPermissions.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
    permissions: PropTypes.array,
  }).isRequired,
};

export default Permissions;
