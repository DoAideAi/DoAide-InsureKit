import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SEOHead from "./components/SEOHead";
import Breadcrumb from "./components/Breadcrumb";
import InstallPrompt from "./components/InstallPrompt";
import SignUpBanner from "./components/SignUpBanner";
import AuthCallbackHandler from "./components/AuthCallbackHandler";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import PremiumCalculator from "./pages/PremiumCalculator";
import MaturityCalculator from "./pages/MaturityCalculator";
import PlanComparison from "./pages/PlanComparison";
import CommissionCalculator from "./pages/CommissionCalculator";
import TaxCalculator from "./pages/TaxCalculator";
import PolicyTracker from "./pages/PolicyTracker";
import BonusHistory from "./pages/BonusHistory";
import MarketingGenerator from "./pages/MarketingGenerator";
import ClientReminders from "./pages/ClientReminders";
import ReceiptGenerator from "./pages/ReceiptGenerator";
import RevivalCalculator from "./pages/RevivalCalculator";
import SurrenderCalculator from "./pages/SurrenderCalculator";
import LoanCalculator from "./pages/LoanCalculator";
import PremiumCalendar from "./pages/PremiumCalendar";
import ClaimEstimator from "./pages/ClaimEstimator";
import PlanRecommender from "./pages/PlanRecommender";
import CompareAnyPlans from "./pages/CompareAnyPlans";
import GuidesIndex from "./pages/GuidesIndex";
import GuideBestPlans2026 from "./pages/GuideBestPlans2026";
import GuideCheckPolicyStatus from "./pages/GuideCheckPolicyStatus";
import GuideBonusRatesHistory from "./pages/GuideBonusRatesHistory";
import GuideReviveLapsedPolicy from "./pages/GuideReviveLapsedPolicy";
import GuideLicPremiumPayment from "./pages/GuideLicPremiumPayment";
import GuideLicPolicyStatus from "./pages/GuideLicPolicyStatus";
import GuideLicMaturityAmount from "./pages/GuideLicMaturityAmount";
import GuideLicLoanOnPolicy from "./pages/GuideLicLoanOnPolicy";
import GuideLicSurrenderValue from "./pages/GuideLicSurrenderValue";
import GuideLicAgentExam from "./pages/GuideLicAgentExam";
import GuideLicClaimProcess from "./pages/GuideLicClaimProcess";
import GuideLicTaxBenefits from "./pages/GuideLicTaxBenefits";
import GuideBestLicPlansChild from "./pages/GuideBestLicPlansChild";
import GuideBestTermPlan from "./pages/GuideBestTermPlan";
import PlansDirectoryPage from "./pages/PlansDirectoryPage";
import PlanDetailPage from "./pages/PlanDetailPage";
import VsLicSuperSalesSaathi from "./pages/compare/VsLicSuperSalesSaathi";
import VsPerfectAgentPlus from "./pages/compare/VsPerfectAgentPlus";
import PremiumTable from "./pages/PremiumTable";
import AgentDashboard from "./pages/AgentDashboard";
import BestLicTools from "./pages/BestLicTools";
import BestLicToolsCompare from "./pages/compare/BestLicTools";
import PolicyMaturityTracker from "./pages/PolicyMaturityTracker";
import GuideLicCommissionStructure from "./pages/GuideLicCommissionStructure";
import GuideHowToBecomeAgent from "./pages/GuideHowToBecomeAgent";
import GuideBestPlansForTaxSaving from "./pages/GuideBestPlansForTaxSaving";
import GuideSection80D from "./pages/GuideSection80D";
import GuideUlipVsMutualFund from "./pages/GuideUlipVsMutualFund";
import ClaimSettlementRatio from "./pages/ClaimSettlementRatio";
import SipVsInsurance from "./pages/SipVsInsurance";
import PlanPresentation from "./pages/PlanPresentation";
import PremiumDueRegister from "./pages/PremiumDueRegister";
import BranchLocator from "./pages/BranchLocator";
import ReportGenerator from "./pages/ReportGenerator";
import PaidUpValueCalculator from "./pages/PaidUpValueCalculator";
import InsuranceAgeCalculator from "./pages/InsuranceAgeCalculator";
import RiderPremiumCalculator from "./pages/RiderPremiumCalculator";
import RebateCalculator from "./pages/RebateCalculator";
import SelfMixPresentation from "./pages/SelfMixPresentation";
import FamilyMixPresentation from "./pages/FamilyMixPresentation";
import BudgetPresentation from "./pages/BudgetPresentation";
import ClubQualification from "./pages/ClubQualification";
import GreetingCardCreator from "./pages/GreetingCardCreator";
import DoctorPanelLocator from "./pages/DoctorPanelLocator";
import BusinessCardCreator from "./pages/BusinessCardCreator";
import FdRdCalculator from "./pages/FdRdCalculator";
import EmbedPremiumCalculator from "./pages/EmbedPremiumCalculator";
import PortfolioImport from "./pages/PortfolioImport";
import LicVsSbiLife from "./pages/compare/LicVsSbiLife";
import TermVsEndowment from "./pages/compare/TermVsEndowment";
import InsuranceNeedsCalculator from "./pages/InsuranceNeedsCalculator";
import PremiumComparisonWidget from "./pages/PremiumComparisonWidget";
import TermInsuranceCompare from "./pages/TermInsuranceCompare";
import BlogLayout, { BlogIndex } from "./pages/blog/BlogLayout";
import BlogBestLicPlans2026 from "./pages/blog/BestLicPlans2026";
import BlogLicPremiumCalculatorGuide from "./pages/blog/LicPremiumCalculatorGuide";
import BlogFdVsRdVsLic from "./pages/blog/FdVsRdVsLic";
import BlogLicBonusRates2026 from "./pages/blog/LicBonusRates2026";
import BlogBestLicPlansChildEducation2026 from "./pages/blog/BestLicPlansChildEducation2026";
import BlogLicMaturityClaimOnline from "./pages/blog/LicMaturityClaimOnline";
import BlogLicSurrenderValueCalculatorGuide from "./pages/blog/LicSurrenderValueCalculatorGuide";
import BlogHowMuchLifeInsurance from "./pages/blog/HowMuchLifeInsurance";
import BlogTermVsWholeLife from "./pages/blog/TermVsWholeLife";
import BlogInsurancePlanningNewlyweds from "./pages/blog/InsurancePlanningNewlyweds";
import BlogLicTermInsurancePlans2026 from "./pages/blog/LicTermInsurancePlans2026";
import BlogHealthVsLifeInsurance from "./pages/blog/HealthVsLifeInsurance";
import BlogCalculateLifeInsuranceCoverage from "./pages/blog/CalculateLifeInsuranceCoverage";
import BlogBestFreeLicPremiumCalculator2026 from "./pages/blog/BestFreeLicPremiumCalculator2026";
import BlogChooseRightLicPlanForFamily from "./pages/blog/ChooseRightLicPlanForFamily";
import BlogLicVsPrivateLifeInsurance from "./pages/blog/LicVsPrivateLifeInsurance";
import MarkdownPost from "./pages/blog/MarkdownPost";
import InsurancePremiumEstimator from "./pages/InsurancePremiumEstimator";
import PolicyComparisonTool from "./pages/PolicyComparisonTool";
import ToolTracker from "./components/ToolTracker";
import SocialProofBar from "./components/SocialProofBar";
import ReferralBanner from "./components/ReferralBanner";
import FloatingPremiumWidget from "./components/FloatingPremiumWidget";
import FeedbackWidget from "./components/FeedbackWidget";
import AiAdvisor from "./components/AiAdvisor";

export default function App() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isEmbed = pathname.startsWith("/embed/");

  if (isEmbed) {
    return (
      <Routes>
        <Route path="/embed/premium-calculator" element={<EmbedPremiumCalculator />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead />
      <Header />
      {!isHome && <Breadcrumb />}
      <ToolTracker />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6">
        <SocialProofBar />
        <SignUpBanner />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/auth/callback" element={<AuthCallbackHandler />} />
          <Route path="/premium-calculator" element={<PremiumCalculator />} />
          <Route path="/maturity-calculator" element={<MaturityCalculator />} />
          <Route path="/plan-comparison" element={<PlanComparison />} />
          <Route path="/commission-calculator" element={<CommissionCalculator />} />
          <Route path="/tax-calculator" element={<TaxCalculator />} />
          <Route path="/policy-tracker" element={<PolicyTracker />} />
          <Route path="/bonus-history" element={<BonusHistory />} />
          <Route path="/marketing" element={<MarketingGenerator />} />
          <Route path="/client-reminders" element={<ClientReminders />} />
          <Route path="/receipt-generator" element={<ReceiptGenerator />} />
          <Route path="/revival-calculator" element={<RevivalCalculator />} />
          <Route path="/surrender-calculator" element={<SurrenderCalculator />} />
          <Route path="/loan-calculator" element={<LoanCalculator />} />
          <Route path="/premium-calendar" element={<PremiumCalendar />} />
          <Route path="/claim-estimator" element={<ClaimEstimator />} />
          <Route path="/plan-recommender" element={<PlanRecommender />} />
          <Route path="/compare-plans" element={<CompareAnyPlans />} />
          <Route path="/guides" element={<GuidesIndex />} />
          <Route path="/guides/best-lic-plans-2026" element={<GuideBestPlans2026 />} />
          <Route path="/guides/check-policy-status" element={<GuideCheckPolicyStatus />} />
          <Route path="/guides/bonus-rates-history" element={<GuideBonusRatesHistory />} />
          <Route path="/guides/revive-lapsed-policy" element={<GuideReviveLapsedPolicy />} />
          <Route path="/guides/lic-premium-payment-online" element={<GuideLicPremiumPayment />} />
          <Route path="/guides/lic-policy-status-check" element={<GuideLicPolicyStatus />} />
          <Route path="/guides/lic-maturity-amount-check" element={<GuideLicMaturityAmount />} />
          <Route path="/guides/lic-loan-on-policy" element={<GuideLicLoanOnPolicy />} />
          <Route path="/guides/lic-surrender-value" element={<GuideLicSurrenderValue />} />
          <Route path="/guides/lic-agent-exam-preparation" element={<GuideLicAgentExam />} />
          <Route path="/guides/lic-claim-process" element={<GuideLicClaimProcess />} />
          <Route path="/guides/lic-tax-benefits" element={<GuideLicTaxBenefits />} />
          <Route path="/guides/best-lic-plans-for-child" element={<GuideBestLicPlansChild />} />
          <Route path="/guides/best-term-insurance-plan" element={<GuideBestTermPlan />} />
          <Route path="/plans" element={<PlansDirectoryPage />} />
          <Route path="/plans/:slug" element={<PlanDetailPage />} />
          <Route path="/premium-table" element={<PremiumTable />} />
          <Route path="/dashboard" element={<AgentDashboard />} />
          <Route path="/compare/lic-super-sales-saathi" element={<VsLicSuperSalesSaathi />} />
          <Route path="/compare/perfect-agent-plus" element={<VsPerfectAgentPlus />} />
          <Route path="/best-lic-agent-tools-2026" element={<BestLicTools />} />
          <Route path="/compare/best-lic-tools" element={<BestLicToolsCompare />} />
          <Route path="/maturity-tracker" element={<PolicyMaturityTracker />} />
          <Route path="/guides/lic-commission-structure" element={<GuideLicCommissionStructure />} />
          <Route path="/guides/how-to-become-lic-agent" element={<GuideHowToBecomeAgent />} />
          <Route path="/guides/best-plans-for-tax-saving" element={<GuideBestPlansForTaxSaving />} />
          <Route path="/guides/section-80d-health-insurance" element={<GuideSection80D />} />
          <Route path="/guides/ulip-vs-mutual-fund" element={<GuideUlipVsMutualFund />} />
          <Route path="/claim-settlement-ratio" element={<ClaimSettlementRatio />} />
          <Route path="/sip-vs-insurance" element={<SipVsInsurance />} />
          <Route path="/plan-presentation" element={<PlanPresentation />} />
          <Route path="/premium-due-register" element={<PremiumDueRegister />} />
          <Route path="/branch-locator" element={<BranchLocator />} />
          <Route path="/report-generator" element={<ReportGenerator />} />
          <Route path="/paid-up-value" element={<PaidUpValueCalculator />} />
          <Route path="/insurance-age-calculator" element={<InsuranceAgeCalculator />} />
          <Route path="/rider-premium-calculator" element={<RiderPremiumCalculator />} />
          <Route path="/rebate-calculator" element={<RebateCalculator />} />
          <Route path="/self-mix" element={<SelfMixPresentation />} />
          <Route path="/family-mix" element={<FamilyMixPresentation />} />
          <Route path="/budget-presentation" element={<BudgetPresentation />} />
          <Route path="/club-qualification" element={<ClubQualification />} />
          <Route path="/greeting-cards" element={<GreetingCardCreator />} />
          <Route path="/doctor-panel" element={<DoctorPanelLocator />} />
          <Route path="/business-card" element={<BusinessCardCreator />} />
          <Route path="/portfolio-import" element={<PortfolioImport />} />
          <Route path="/fd-rd-calculator" element={<FdRdCalculator />} />
          <Route path="/compare/lic-vs-sbi-life" element={<LicVsSbiLife />} />
          <Route path="/compare/term-vs-endowment" element={<TermVsEndowment />} />
          <Route path="/insurance-needs-calculator" element={<InsuranceNeedsCalculator />} />
          <Route path="/premium-comparison" element={<PremiumComparisonWidget />} />
          <Route path="/tools/term-insurance-compare" element={<TermInsuranceCompare />} />
          <Route path="/tools/premium-estimator" element={<InsurancePremiumEstimator />} />
          <Route path="/tools/policy-comparison" element={<PolicyComparisonTool />} />
          <Route path="/blog" element={<BlogLayout />}>
            <Route index element={<BlogIndex />} />
            <Route path="best-lic-plans-2026-comparison-guide" element={<BlogBestLicPlans2026 />} />
            <Route path="lic-premium-calculator-guide" element={<BlogLicPremiumCalculatorGuide />} />
            <Route path="fd-vs-rd-vs-lic-comparison" element={<BlogFdVsRdVsLic />} />
            <Route path="lic-bonus-rates-2026" element={<BlogLicBonusRates2026 />} />
            <Route path="best-lic-plans-child-education-2026" element={<BlogBestLicPlansChildEducation2026 />} />
            <Route path="lic-maturity-claim-online" element={<BlogLicMaturityClaimOnline />} />
            <Route path="lic-surrender-value-calculator-guide" element={<BlogLicSurrenderValueCalculatorGuide />} />
            <Route path="how-much-life-insurance" element={<BlogHowMuchLifeInsurance />} />
            <Route path="term-vs-whole-life-insurance" element={<BlogTermVsWholeLife />} />
            <Route path="insurance-planning-newlyweds" element={<BlogInsurancePlanningNewlyweds />} />
            <Route path="lic-term-insurance-plans-2026" element={<BlogLicTermInsurancePlans2026 />} />
            <Route path="health-vs-life-insurance" element={<BlogHealthVsLifeInsurance />} />
            <Route path="calculate-life-insurance-coverage" element={<BlogCalculateLifeInsuranceCoverage />} />
            <Route path="best-free-lic-premium-calculator-2026" element={<BlogBestFreeLicPremiumCalculator2026 />} />
            <Route path="choose-right-lic-plan-for-family" element={<BlogChooseRightLicPlanForFamily />} />
            <Route path="lic-vs-private-life-insurance" element={<BlogLicVsPrivateLifeInsurance />} />
            <Route path=":slug" element={<MarkdownPost />} />
          </Route>
        </Routes>
      </main>
      <Footer />
      <InstallPrompt />
      <ReferralBanner />
      <FloatingPremiumWidget />
      <FeedbackWidget />
      <AiAdvisor />
    </div>
  );
}
