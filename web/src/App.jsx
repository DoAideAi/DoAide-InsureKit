import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SEOHead from "./components/SEOHead";
import Breadcrumb from "./components/Breadcrumb";
import InstallPrompt from "./components/InstallPrompt";
import SignUpBanner from "./components/SignUpBanner";
import AuthCallbackHandler from "./components/AuthCallbackHandler";
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
import HomePage from "./pages/HomePage";
const PremiumCalculator = lazy(() => import("./pages/PremiumCalculator"));
const MaturityCalculator = lazy(() => import("./pages/MaturityCalculator"));
const PlanComparison = lazy(() => import("./pages/PlanComparison"));
const CommissionCalculator = lazy(() => import("./pages/CommissionCalculator"));
const TaxCalculator = lazy(() => import("./pages/TaxCalculator"));
const PolicyTracker = lazy(() => import("./pages/PolicyTracker"));
const BonusHistory = lazy(() => import("./pages/BonusHistory"));
const MarketingGenerator = lazy(() => import("./pages/MarketingGenerator"));
const ClientReminders = lazy(() => import("./pages/ClientReminders"));
const ReceiptGenerator = lazy(() => import("./pages/ReceiptGenerator"));
const RevivalCalculator = lazy(() => import("./pages/RevivalCalculator"));
const SurrenderCalculator = lazy(() => import("./pages/SurrenderCalculator"));
const LoanCalculator = lazy(() => import("./pages/LoanCalculator"));
const PremiumCalendar = lazy(() => import("./pages/PremiumCalendar"));
const ClaimEstimator = lazy(() => import("./pages/ClaimEstimator"));
const PlanRecommender = lazy(() => import("./pages/PlanRecommender"));
const CompareAnyPlans = lazy(() => import("./pages/CompareAnyPlans"));
const GuidesIndex = lazy(() => import("./pages/GuidesIndex"));
const GuideBestPlans2026 = lazy(() => import("./pages/GuideBestPlans2026"));
const GuideCheckPolicyStatus = lazy(() => import("./pages/GuideCheckPolicyStatus"));
const GuideBonusRatesHistory = lazy(() => import("./pages/GuideBonusRatesHistory"));
const GuideReviveLapsedPolicy = lazy(() => import("./pages/GuideReviveLapsedPolicy"));
const GuideLicPremiumPayment = lazy(() => import("./pages/GuideLicPremiumPayment"));
const GuideLicPolicyStatus = lazy(() => import("./pages/GuideLicPolicyStatus"));
const GuideLicMaturityAmount = lazy(() => import("./pages/GuideLicMaturityAmount"));
const GuideLicLoanOnPolicy = lazy(() => import("./pages/GuideLicLoanOnPolicy"));
const GuideLicSurrenderValue = lazy(() => import("./pages/GuideLicSurrenderValue"));
const GuideLicAgentExam = lazy(() => import("./pages/GuideLicAgentExam"));
const GuideLicClaimProcess = lazy(() => import("./pages/GuideLicClaimProcess"));
const GuideLicTaxBenefits = lazy(() => import("./pages/GuideLicTaxBenefits"));
const GuideBestLicPlansChild = lazy(() => import("./pages/GuideBestLicPlansChild"));
const GuideBestTermPlan = lazy(() => import("./pages/GuideBestTermPlan"));
const PlansDirectoryPage = lazy(() => import("./pages/PlansDirectoryPage"));
const PlanDetailPage = lazy(() => import("./pages/PlanDetailPage"));
const VsLicSuperSalesSaathi = lazy(() => import("./pages/compare/VsLicSuperSalesSaathi"));
const VsPerfectAgentPlus = lazy(() => import("./pages/compare/VsPerfectAgentPlus"));
const PremiumTable = lazy(() => import("./pages/PremiumTable"));
const AgentDashboard = lazy(() => import("./pages/AgentDashboard"));
const BestLicTools = lazy(() => import("./pages/BestLicTools"));
const BestLicToolsCompare = lazy(() => import("./pages/compare/BestLicTools"));
const PolicyMaturityTracker = lazy(() => import("./pages/PolicyMaturityTracker"));
const GuideLicCommissionStructure = lazy(() => import("./pages/GuideLicCommissionStructure"));
const GuideHowToBecomeAgent = lazy(() => import("./pages/GuideHowToBecomeAgent"));
const GuideBestPlansForTaxSaving = lazy(() => import("./pages/GuideBestPlansForTaxSaving"));
const GuideSection80D = lazy(() => import("./pages/GuideSection80D"));
const GuideUlipVsMutualFund = lazy(() => import("./pages/GuideUlipVsMutualFund"));
const ClaimSettlementRatio = lazy(() => import("./pages/ClaimSettlementRatio"));
const SipVsInsurance = lazy(() => import("./pages/SipVsInsurance"));
const PlanPresentation = lazy(() => import("./pages/PlanPresentation"));
const PremiumDueRegister = lazy(() => import("./pages/PremiumDueRegister"));
const BranchLocator = lazy(() => import("./pages/BranchLocator"));
const ReportGenerator = lazy(() => import("./pages/ReportGenerator"));
const PaidUpValueCalculator = lazy(() => import("./pages/PaidUpValueCalculator"));
const InsuranceAgeCalculator = lazy(() => import("./pages/InsuranceAgeCalculator"));
const RiderPremiumCalculator = lazy(() => import("./pages/RiderPremiumCalculator"));
const RebateCalculator = lazy(() => import("./pages/RebateCalculator"));
const SelfMixPresentation = lazy(() => import("./pages/SelfMixPresentation"));
const FamilyMixPresentation = lazy(() => import("./pages/FamilyMixPresentation"));
const BudgetPresentation = lazy(() => import("./pages/BudgetPresentation"));
const ClubQualification = lazy(() => import("./pages/ClubQualification"));
const GreetingCardCreator = lazy(() => import("./pages/GreetingCardCreator"));
const DoctorPanelLocator = lazy(() => import("./pages/DoctorPanelLocator"));
const BusinessCardCreator = lazy(() => import("./pages/BusinessCardCreator"));
const FdRdCalculator = lazy(() => import("./pages/FdRdCalculator"));
const EmbedPremiumCalculator = lazy(() => import("./pages/EmbedPremiumCalculator"));
const PortfolioImport = lazy(() => import("./pages/PortfolioImport"));
const LicVsSbiLife = lazy(() => import("./pages/compare/LicVsSbiLife"));
const TermVsEndowment = lazy(() => import("./pages/compare/TermVsEndowment"));
const InsuranceNeedsCalculator = lazy(() => import("./pages/InsuranceNeedsCalculator"));
const PremiumComparisonWidget = lazy(() => import("./pages/PremiumComparisonWidget"));
const TermInsuranceCompare = lazy(() => import("./pages/TermInsuranceCompare"));
const BlogLayout = lazy(() => import("./pages/blog/BlogLayout"));
const BlogIndex = lazy(() => import("./pages/blog/BlogLayout").then((m) => ({ default: m.BlogIndex })));
const BlogBestLicPlans2026 = lazy(() => import("./pages/blog/BestLicPlans2026"));
const BlogLicPremiumCalculatorGuide = lazy(() => import("./pages/blog/LicPremiumCalculatorGuide"));
const BlogFdVsRdVsLic = lazy(() => import("./pages/blog/FdVsRdVsLic"));
const BlogLicBonusRates2026 = lazy(() => import("./pages/blog/LicBonusRates2026"));
const BlogBestLicPlansChildEducation2026 = lazy(() => import("./pages/blog/BestLicPlansChildEducation2026"));
const BlogLicMaturityClaimOnline = lazy(() => import("./pages/blog/LicMaturityClaimOnline"));
const BlogLicSurrenderValueCalculatorGuide = lazy(() => import("./pages/blog/LicSurrenderValueCalculatorGuide"));
const BlogHowMuchLifeInsurance = lazy(() => import("./pages/blog/HowMuchLifeInsurance"));
const BlogTermVsWholeLife = lazy(() => import("./pages/blog/TermVsWholeLife"));
const BlogInsurancePlanningNewlyweds = lazy(() => import("./pages/blog/InsurancePlanningNewlyweds"));
const BlogLicTermInsurancePlans2026 = lazy(() => import("./pages/blog/LicTermInsurancePlans2026"));
const BlogHealthVsLifeInsurance = lazy(() => import("./pages/blog/HealthVsLifeInsurance"));
const BlogCalculateLifeInsuranceCoverage = lazy(() => import("./pages/blog/CalculateLifeInsuranceCoverage"));
const BlogBestFreeLicPremiumCalculator2026 = lazy(() => import("./pages/blog/BestFreeLicPremiumCalculator2026"));
const BlogChooseRightLicPlanForFamily = lazy(() => import("./pages/blog/ChooseRightLicPlanForFamily"));
const BlogLicVsPrivateLifeInsurance = lazy(() => import("./pages/blog/LicVsPrivateLifeInsurance"));
const MarkdownPost = lazy(() => import("./pages/blog/MarkdownPost"));
const InsurancePremiumEstimator = lazy(() => import("./pages/InsurancePremiumEstimator"));
const PolicyComparisonTool = lazy(() => import("./pages/PolicyComparisonTool"));
const RetirementCalculator = lazy(() => import("./pages/RetirementCalculator"));
const ChildEducationCalculator = lazy(() => import("./pages/ChildEducationCalculator"));
const UlipVsMutualFundCalculator = lazy(() => import("./pages/UlipVsMutualFundCalculator"));
import ToolTracker from "./components/ToolTracker";
import ReferralBanner from "./components/ReferralBanner";
import FloatingPremiumWidget from "./components/FloatingPremiumWidget";
import FeedbackWidget from "./components/FeedbackWidget";
import AiAdvisor from "./components/AiAdvisor";

function RouteLoader() {
  return (
    <div data-route-loading className="flex items-center justify-center py-24" role="status" aria-label="Loading page">
      <div className="w-8 h-8 rounded-full border-2 border-signal/30 border-t-signal animate-spin" />
    </div>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isEmbed = pathname.startsWith("/embed/");

  if (isEmbed) {
    return (
      <Suspense fallback={null}>
        <Routes>
          <Route path="/embed/premium-calculator" element={<EmbedPremiumCalculator />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead />
      <Header />
      {!isHome && <Breadcrumb />}
      <ToolTracker />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6">
        <SignUpBanner />
        <ErrorBoundary>
        <Suspense fallback={<RouteLoader />}>
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
          <Route path="/retirement-calculator" element={<RetirementCalculator />} />
          <Route path="/child-education-calculator" element={<ChildEducationCalculator />} />
          <Route path="/ulip-vs-mutual-fund-calculator" element={<UlipVsMutualFundCalculator />} />
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
        </Suspense>
        </ErrorBoundary>
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
