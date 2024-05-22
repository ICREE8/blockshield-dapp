export default function handler(req, res) {
    const { wallet } = req.query;
  
    // Mock data
    const assets = [
      { id: 1, name: 'Asset 1', type: 'Type A', value: '100' },
      { id: 2, name: 'Asset 2', type: 'Type B', value: '200' }
    ];
  
    if (wallet) {
      // Filter by wallet (mock implementation)
      const filteredAssets = assets.filter(asset => asset.wallet === wallet);
      return res.status(200).json(filteredAssets);
    }
  
    res.status(200).json(assets);
  }
  