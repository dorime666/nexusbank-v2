export interface Transaction {
  id: string;
  title: string;
  amount: number;
  status: string;
  timestamp: string;
  category: string;
  currency: string;
}

export interface UserProfile {
  name: string;
  balance: number;
  expensesToday: number;
  currencySymbol: string;
  accountType: string;
  showWarningTicker?: boolean;
  transactions: Transaction[];
}

export const accountsData: Record<string, UserProfile> = {
  ravit: {
    name: "Ravit Habura",
    balance: 63120.00,
    expensesToday: 0.00,
    currencySymbol: "$",
    accountType: "Available Checking Account",
    showWarningTicker: true,
    transactions: [
      {
        id: "tx-101",
        title: "PAYMENT RECEIVED",
        amount: 63120.00,
        status: "Confirmed",
        timestamp: "2 months ago",
        category: "CHECKING ACTIVITY",
        currency: "$"
      },
      {
        id: "tx-102",
        title: "CRYPTO RECEIVED",
        amount: 1000.00,
        status: "Confirmed",
        timestamp: "5 minutes ago",
        category: "TRC20 RECEIVED",
        currency: "+$"
      }
    ]
  },
  peter: {
    name: "Peter Larin",
    balance: 34460.00,
    expensesToday: 0.00,
    currencySymbol: "$",
    accountType: "Premium Wealth Account",
    showWarningTicker: false,
    transactions: [
      {
        id: "tx-201",
        title: "WIRE TRANSFER RECEIVED",
        amount:34460.00,
        status: "Confirmed",
        timestamp: "1 month ago",
        category: "WIRE ACTIVITY",
        currency: "$"
      },
      
    ]
  }
};

export const initialUserData = accountsData.ravit;