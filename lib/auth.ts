export const DEMO_CREDENTIALS = {
  username: "Ravithabura",
  password: "Habura4123",
};

export const AUTH_STORAGE_KEY = "fintech_demo_authenticated";

export function checkIsAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function setAuthenticated(status: boolean): void {
  if (typeof window === "undefined") return;
  if (status) {
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}