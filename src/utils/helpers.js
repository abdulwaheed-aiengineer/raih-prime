export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function generateOrderId() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `RHP-${code}`;
}

export function truncate(str, length = 100) {
  if (!str) return '';
  return str.length > length ? str.substring(0, length) + '...' : str;
}

export const COMPANY_INFO = {
  legalName: 'RAI H PRIME LLC',
  tradeName: 'Raih Prime',
  tagline: 'Premium Pantry, Gourmet Foods & Wellness Essentials',
  soleMember: 'Tassawar Hussain',
  address: '129 E Orange Ct',
  city: 'Parkville',
  state: 'MD',
  zip: '21234',
  fullAddress: '129 E Orange Ct, Parkville, MD 21234',
  domain: 'raihprime.store',
  website: 'https://raihprime.store',
  email: 'support@raihprime.store',
  phone: '+1 (410) 844-3290',
  operatingHours: 'Mon - Sat: 8:00 AM - 7:00 PM EST',
  freeShippingThreshold: 50.00
};
