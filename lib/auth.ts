export const DEMO_CREDENTIALS: Record<string, { pass: string; accountId: string }> = {
  ravithabura: { pass: "Habura4123", accountId: "ravit" },
  peterlarin1: { pass: "peter4334", accountId: "peter" },
};

export const AUTH_STORAGE_KEY = "nexusbank_authenticated";
export const ACTIVE_ACCOUNT_KEY = "nexus_active_account";

export function authenticateUser(username: string, pass: string): string | null {
  if (typeof window === "undefined") return null;
  const cleanUser = username.toLowerCase().trim();
  const account = DEMO_CREDENTIALS[cleanUser];

  if (account && account.pass === pass) {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
      localStorage.setItem("fintech_demo_authenticated", "true");
      localStorage.setItem(ACTIVE_ACCOUNT_KEY, account.accountId);
    } catch {
      // Fallback for storage restrictions
    }
    return account.accountId;
  }
  return null;
}

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
      localStorage.removeItem(ACTIVE_ACCOUNT_KEY);
    }
  } catch {
    // Fallback for private browsing mode storage restrictions
  }
}