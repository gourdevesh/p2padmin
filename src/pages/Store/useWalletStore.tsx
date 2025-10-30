import { create } from "zustand";

// ✅ Define wallet structure
interface WalletData {
  bitcoin?: { remaining_amount: number }[];
  binance?: { remaining_amount: number }[];
  ethereum?: { asset: string; remaining_amount: number }[];
}

interface Wallet {
  data?: WalletData;
}

// ✅ Zustand store type
interface WalletStore {
  web3wallet: Wallet | null;
  setWeb3wallet: (wallet: Wallet | null) => void;
}

// ✅ Create Zustand store
export const useWalletStore = create<WalletStore>((set) => ({
  web3wallet: null,
  setWeb3wallet: (wallet: Wallet | null) => set({ web3wallet: wallet }), // ✅ fixed typing
}));
