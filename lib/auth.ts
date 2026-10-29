export const DEMO_CREDENTIALS = {
  username: "Ravithabura",
  password: "Habura4123",
};

export const AUTH_STORAGE_KEY = "nexusbank_authenticated";

export function checkIsAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return (
      localStorage.getItem(AUTH_STORAGE_KEY) === "true" ||
      localStorage.getItem("fintech_demo_authenticated") === "true"
    );
  } catch {
    return false;
  }
}

export function setAuthenticated(status: boolean): void {
  if (typeof window === "undefined") return;
  try {
    if (status) {
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
      localStorage.setItem("fintech_demo_authenticated", "true");
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem("fintech_demo_authenticated");
    }
  } catch {
    // Fallback for private browsing mode storage restrictions
  }
}