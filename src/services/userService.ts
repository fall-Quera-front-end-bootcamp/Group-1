import http from "./httpService";
import { JwtPayload, jwtDecode } from "jwt-decode";
import {
  ForgetPasswordData,
  LoginFormData,
  ProfileData,
  SignupFormData,
  TokenProps,
} from "../types/types";

export function register(payload: SignupFormData) {
  return http.post("accounts/", payload);
}

export function login(payload: LoginFormData) {
  return http.post("accounts/login/", payload);
}

export function forgetPassword(payload: ForgetPasswordData) {
  return http.post("accounts/reset-password/", payload);
}

export function profileEdit(payload: ProfileData, id: string) {
  return http.patch(`accounts/${id}/`, payload);
}

export function auth(id: number) {
  console.log("id", id);
  return http.get(`/accounts/${id}`);

  // return http.get(`accounts/${id}/`);
}

export default {
  register,
  login,
};
