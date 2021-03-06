export const remoteApiUrlBase = 'https://sirmo-api.herokuapp.com/api';
export const localApiUrlBase = 'http://localhost:3000/api/v1';

export const apiUrlBase = localApiUrlBase;

export const resourcesUrl = apiUrlBase + '/resources';

export const endpoints = {
  localApiUrlBase: localApiUrlBase,
  remoteApiUrlBase: remoteApiUrlBase,
  loginUrl: `${apiUrlBase}/users/auth/signin`,
  registerUserUrl: `${apiUrlBase}/users/auth/signup`,
  passwordResetUrl: `${apiUrlBase}/users/auth/password/reset`,
  agentRolesUrl: `${apiUrlBase}/agent-roles`,
  agentRoleCreateUrl: `${apiUrlBase}/agent-roles/create`,
  companyCategoriesUrl: `${apiUrlBase}/companies-categories`,
  companyCategoriesCreateUrl: `${apiUrlBase}/companies-categories/create`,
  companiesCreateUrl: `${apiUrlBase}/companies/create`,
  companiesUrl: `${apiUrlBase}/companies`,
  workfieldsUrl: `${apiUrlBase}/workfields`,
  workfieldsCreateUrl: `${apiUrlBase}/workfields/create`,
  operationTypesUrl: `${apiUrlBase}/operations-types`,
  operationTypesCreateUrl: `${apiUrlBase}/operations-types/create`,
  usersUrl: `${apiUrlBase}/users`,
  filesUrl: `${apiUrlBase}/files/upload`
};

export const rest = {
  endpoints: endpoints,
  authHeaders: {
    'content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('user_token')}`,
  },
};
