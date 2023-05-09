const sampleBanks = () => [
  {
    bankId: 1,
    name: 'BDO',
    abbr: 'BDO'
  },
  {
    bankId: 2,
    name: 'BPI',
    abbr: 'BDO'
  },
  {
    bankId: 3,
    name: 'ChinaBank',
    abbr: 'CHNB'
  },
  {
    bankId: 4,
    name: 'MetroBank',
    abbr: 'MBTC'
  }
];

export const getBank = (id) =>
  sampleBanks().find((bank) => bank.bankId === id) || {};

export default sampleBanks;
