import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'https://sso.sexycoders.org/auth',
  realm: 'sexycoders',
  clientId: '',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;

