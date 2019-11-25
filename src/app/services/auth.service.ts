import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor() {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !!token;
  }

  public login({ login, password }) {
    return new Promise((resolve, reject) =>
      setTimeout(
        () => {
          if (login === "example@mail.com" && password === "hello world") {
            return resolve({
              token: "hello"
            });
          }
          return reject("error");
        },

        1000
      )
    ).then(({ token }) => localStorage.setItem("token", token));
  }
}
