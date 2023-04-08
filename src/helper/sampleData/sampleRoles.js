const sampleRoles = [
  {
    roleId: 1,
    name: 'Admin',
    color: 'primary'
  },
  {
    roleId: 2,
    name: 'Reporter',
    color: 'info'
  },
  {
    roleId: 3,
    name: 'Encoder',
    color: 'warning'
  }
];

export const getRole = (id) =>
  sampleRoles.find((role) => role.roleId === Number(id)) || {};

export default sampleRoles;
