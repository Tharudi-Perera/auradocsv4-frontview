import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';
import {JwtService} from 'src/app/auth/jwt.service';
import {UserService} from 'src/app/services/user/user.service';
import {User} from 'src/app/models/AppUser.model';
import {
  EMAIL,
  IS_MAIL_VERIFIED,
  JWT,
  NAME,
  ROLES,
  SESSION_ID,
  USERNAME,
  USER_ID,
  KEYCLOCK_UUID
} from '../utility/constants.utility';
import {NoOfPendingDocsService} from "../services/noOfPendingDocs/no-of-pending-docs.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService,
    protected readonly jwtService: JwtService,
    protected readonly userService: UserService,
    private noOfPendingDocsService:NoOfPendingDocsService
  ) {
    super(router, keycloak);
  }

  async updateToken() {
    var isTokeUpdated: boolean = await this.keycloak.updateToken();
    if (isTokeUpdated) {
      this.getToken();
    } else {
      this.keycloak.login();
    }
  }

  async getToken(): Promise<string> {
    try {
      // Redirect to login of token expired
      if (this.keycloak.isTokenExpired()) {
        await this.keycloak.login();
      }
      localStorage.clear(); // clear storage on call

      const token = await this.keycloak.getToken();
      this.jwtService.setToken(token);
      const decodedToken: any = this.jwtService.getDecodeToken();
      localStorage.setItem(USERNAME, decodedToken.preferred_username);
      localStorage.setItem(NAME, decodedToken.name);
      localStorage.setItem(EMAIL, decodedToken.email);
      localStorage.setItem(IS_MAIL_VERIFIED, decodedToken.email_verified);
      localStorage.setItem(ROLES, decodedToken.groups);
      localStorage.setItem(SESSION_ID, decodedToken.sid);
      localStorage.setItem(KEYCLOCK_UUID, decodedToken.sub.toString()); //uuid
      localStorage.setItem(JWT, token);
      let user: User = {
        firstName: decodedToken.given_name,
        lastName: decodedToken.family_name,
        username: decodedToken.preferred_username,
        dlNumber: decodedToken.iat,
        email: decodedToken.email,
        roles: decodedToken.groups,
        sessionId: decodedToken.sid,
        departments: decodedToken.department ? decodedToken.department[0].split(', ') : [],
      }
      this.userService.saveUser(user).subscribe({
        next: data => {
          localStorage.setItem(USER_ID, data.data.id)
        }, //data.id is an integer value not a uuid value
        error: error => console.error(error),
        complete:()=>{
          this.noOfPendingDocsService.getPendingDocStats();
          this.noOfPendingDocsService.findNoOfDocs();
        }
      })

      return token;
    } catch (error) {
      console.error('Failed to obtain access token:', error);
      return '';
    }
  }


  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url
      });
    }

    if (this.authenticated) {
      this.getToken();
    }
    // Get the roles required from the route.
    const requiredRoles = route.data[ROLES];

    // Allow the user to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    // Allow the user to proceed if all the required roles are present.

    return requiredRoles.every((role) => this.roles.includes(role));


  }
}
