import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

export function initializeKeycloak(keycloak: KeycloakService) {
  
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloakUrl,
        realm: 'auraDOCS',
        clientId: 'auradocs'
      },
      initOptions: {
        onLoad: 'check-sso', // allowed values 'login-required' 'check-sso'
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
      shouldAddToken: (request) => {
        const { method, url } = request;

        const isGetRequest = 'GET' === method.toUpperCase();
        const acceptablePaths = ['/assets', '/clients/public'];
        const isAcceptablePathMatch = acceptablePaths.some((path) =>
          url.includes(path)
        );

        return !(isGetRequest && isAcceptablePathMatch);
      }
    });
}
