export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  currency: string;
  status: 'Confirmed' | 'Pending' | 'Failed';
  timestamp: string;
  type: 'credit' | 'debit';
}

export interface UserProfile {
  name: string;
  accountType: string;
  expensesToday: number;
  balance: number;
  currencySymbol: string;
}

export const initialUserData: UserProfile = {
  name: "Ravit Habura",
  accountType: "Available Checking Account",
  expensesToday: 0,
  balance: 63120,
  currencySymbol: "$",
};

export const initialTransactions: Transaction[] = [
  {
    id: "tx-1",
    title: "PAYMENT RECEIVED",
    category: "CHECKING ACTIVITY",
    amount: 63120,
    currency: "$",
    status: "Confirmed",
    timestamp: "10 minutes ago",
    type: "credit",
  },
];