export default function handler(req, res) {
    const { wallet } = req.query;
  
    // Mock data
    const transactions = [
      { id: 1, from: '0x123', to: '0x456', amount: '10', date: '2024-01-01' },
      { id: 2, from: '0x789', to: '0xabc', amount: '20', date: '2024-02-01' }
    ];
  
    if (wallet) {
      // Filter by wallet (mock implementation)
      const filteredTransactions = transactions.filter(transaction => transaction.from === wallet || transaction.to === wallet);
      return res.status(200).json(filteredTransactions);
    }
  
    res.status(200).json(transactions);
  }
  