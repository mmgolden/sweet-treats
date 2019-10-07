import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
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
            {data.users.map((user) => <User user={user} key={user.id} />)}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

const User = ({ user: { id, name, email } }) => (
  <tr>
    <td>{name}</td>
    <td>{email}</td>
    {possiblePermissions.map((permission) => (
      <td key={`${id}-permission-${permission}`}>
        <label htmlFor={`${id}-permission-${permission}`}>
          <input type="checkbox" />
        </label>
      </td>
    ))}
    <td>
      <button type="button">Update</button>
    </td>
  </tr>
);

export default Permissions;
