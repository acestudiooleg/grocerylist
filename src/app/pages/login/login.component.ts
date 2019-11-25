import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

interface AuthForm {
  login: string;
  password: string;
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [AuthService]
})
export class LoginComponent {
  public authForm: FormGroup;
  public loading: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.authForm = new FormGroup({
      login: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required)
    });
  }

  public async login() {
    const { login, password } = this.authForm.value as AuthForm;

    try {
      this.loading = true;
      await this.auth.login({ login, password });
      this.router.navigate(["home"]);
    } catch (e) {
      this.snackBar.open("Login or Password is incorect", "Error", {
        duration: 5000
      });
    } finally {
      this.loading = false;
    }
  }
}
