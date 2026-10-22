const STORAGE_KEY = 'doaide_recent_tools';

export function trackToolVisit(name, path) {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const filtered = stored.filter(t => t.path !== path);
    filtered.unshift({ name, path, ts: Date.now() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, 20)));
  } catch {}
}

export function getRecentTools(max = 5) {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').slice(0, max);
  } catch {
    return [];
  }
}

export const TOOL_MAP = {
  '/premium-calculator': 'Premium Calculator',
  '/premium-table': 'Premium Table',
  '/maturity-calculator': 'Maturity Calculator',
  '/commission-calculator': 'Commission Calculator',
  '/tax-calculator': 'Tax Benefit Calculator',
  '/revival-calculator': 'Revival Calculator',
  '/surrender-calculator': 'Surrender Value',
  '/loan-calculator': 'Loan Against Policy',
  '/claim-estimator': 'Claim Estimator',
  '/premium-calendar': 'Premium Calendar',
  '/sip-vs-insurance': 'SIP vs Insurance',
  '/fd-rd-calculator': 'FD/RD vs Insurance',
  '/paid-up-value': 'Paid-Up Value',
  '/insurance-age-calculator': 'Insurance Age',
  '/rider-premium-calculator': 'Rider Premium',
  '/rebate-calculator': 'Rebate Calculator',
  '/dashboard': 'Agent Dashboard',
  '/plan-comparison': 'Plan Comparison',
  '/compare-plans': 'Compare Plans',
  '/plan-recommender': 'Plan Recommender',
  '/client-reminders': 'Birthday Reminders',
  '/policy-tracker': 'Policy Tracker',
  '/plan-presentation': 'Plan Presentation',
  '/self-mix': 'Self Mix',
  '/family-mix': 'Family Mix',
  '/budget-presentation': 'Budget Plans',
  '/premium-due-register': 'Due Register',
  '/report-generator': 'Business Reports',
  '/maturity-tracker': 'Maturity Tracker',
  '/club-qualification': 'Club Qualification',
  '/greeting-cards': 'Greeting Cards',
  '/business-card': 'Business Card',
  '/bonus-history': 'Bonus History',
  '/marketing': 'Marketing Generator',
  '/receipt-generator': 'Receipt Generator',
  '/plans': 'All LIC Plans',
  '/claim-settlement-ratio': 'Claim Ratio',
  '/branch-locator': 'Branch Locator',
  '/doctor-panel': 'Doctor Panel',
};

export function trackReferral() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('ref') === 'share') {
      const key = 'doaide_referral_count';
      const count = parseInt(localStorage.getItem(key) || '0', 10);
      localStorage.setItem(key, String(count + 1));
      const url = new URL(window.location);
      url.searchParams.delete('ref');
      window.history.replaceState({}, '', url.pathname + url.search);
    }
  } catch {}
}

export function getReferralCount() {
  try {
    return parseInt(localStorage.getItem('doaide_referral_count') || '0', 10);
  } catch { return 0; }
}

export function shouldShowReferralBanner() {
  try {
    const dismissed = localStorage.getItem('doaide_referral_dismissed');
    if (!dismissed) return true;
    return Date.now() - parseInt(dismissed, 10) > 7 * 24 * 60 * 60 * 1000;
  } catch { return true; }
}

export function dismissReferralBanner() {
  try {
    localStorage.setItem('doaide_referral_dismissed', String(Date.now()));
  } catch {}
}

export const TRENDING_TOOLS = [
  { name: 'GST Calculator', url: 'https://gst.doaide.com/calculator', product: 'GSTBot', icon: '🧮' },
  { name: 'Income Tax Calculator', url: 'https://tax.doaide.com/income-tax-calculator', product: 'TaxFile', icon: '💰' },
  { name: 'Resume Builder', url: 'https://resume.doaide.com', product: 'Resume', icon: '📝' },
  { name: 'Rent Receipt', url: 'https://docs.doaide.com/rent-receipt-generator', product: 'Docs', icon: '🏠' },
  { name: 'SIP Calculator', url: 'https://tax.doaide.com/sip-calculator', product: 'TaxFile', icon: '📈' },
  { name: 'Salary Slip', url: 'https://docs.doaide.com/salary-slip-generator', product: 'Docs', icon: '💰' },
  { name: 'EMI Calculator', url: 'https://tax.doaide.com/emi-calculator', product: 'TaxFile', icon: '🏠' },
  { name: 'GSTIN Lookup', url: 'https://gst.doaide.com/lookup', product: 'GSTBot', icon: '🔍' },
  { name: 'Cover Letter', url: 'https://resume.doaide.com/cover-letter-generator', product: 'Resume', icon: '✉️' },
  { name: 'Invoice Generator', url: 'https://docs.doaide.com/invoice-generator', product: 'Docs', icon: '🧾' },
];
