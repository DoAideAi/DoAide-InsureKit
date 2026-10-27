import { Link } from "react-router-dom";
import GuideLayout from "../components/GuideLayout";
import FAQ from "../components/FAQ";

const FAQ_ITEMS = [
  {
    q: "What is the eligibility for LIC agent exam?",
    a: "You must be at least 18 years old (no upper age limit), an Indian citizen, and have passed 10th standard for rural areas or 12th standard for urban/semi-urban areas. You should not be an agent of any other insurance company and must have no criminal record.",
  },
  {
    q: "Is the LIC agent exam difficult?",
    a: "Moderate difficulty. With 2-3 weeks of focused preparation using official study material, most candidates clear it. The pass rate is around 60-70%.",
  },
  {
    q: "How many times can I attempt the IC-38 exam?",
    a: "Multiple attempts are allowed. You can re-register and attempt again after a gap. There is no limit on the number of attempts.",
  },
  {
    q: "What is the exam fee for IC-38?",
    a: "Approximately Rs 500-750 for exam registration. Additional cost for training material is around Rs 200-300.",
  },
  {
    q: "How much commission does a new LIC agent earn?",
    a: "First year commission varies 25-40% of premium depending on plan and term. Renewal commission is 5-7.5% for subsequent years.",
  },
  {
    q: "Is pre-recruitment training mandatory?",
    a: "Yes, 25 hours of mandatory training conducted by the Development Officer or LIC-approved training center before you can sit for the IC-38 exam.",
  },
  {
    q: "Can I be a LIC agent part-time?",
    a: "Yes, LIC agency is a contract, not employment. Many agents work part-time alongside other jobs. There's no minimum hours requirement.",
  },
  {
    q: "What documents do I need to become a LIC agent?",
    a: "10th/12th marksheet, Aadhaar card, PAN card, 4 passport-size photos, cancelled cheque, address proof, and IC-38 pass certificate.",
  },
];

const TOC = [
  { id: "who-can-become", label: "Who Can Become a LIC Agent" },
  { id: "steps-to-become", label: "Steps to Become LIC Agent" },
  { id: "ic38-syllabus", label: "IC-38 Exam Syllabus" },
  { id: "exam-pattern", label: "Exam Pattern & Format" },
  { id: "preparation-strategy", label: "Preparation Strategy" },
  { id: "important-topics", label: "Important Topics to Focus On" },
  { id: "study-resources", label: "Free Study Resources" },
  { id: "exam-day-tips", label: "Exam Day Tips" },
  { id: "after-passing", label: "After Passing the Exam" },
  { id: "career-growth", label: "Career Growth as LIC Agent" },
  { id: "essential-tools", label: "Essential Tools for New Agents" },
];

const RELATED_GUIDES = [
  { path: "/guides/best-term-insurance-plan", title: "Best Term Insurance Plans in India" },
  { path: "/guides/best-lic-plans-for-child", title: "Best LIC Plans for Child" },
];

const RELATED_TOOLS = [
  { path: "/commission-calculator", label: "Commission Calculator" },
  { path: "/premium-calculator", label: "Premium Calculator" },
  { path: "/plan-recommender", label: "Plan Recommender" },
  { path: "/marketing", label: "Marketing Generator" },
];

export default function GuideLicAgentExam() {
  return (
    <GuideLayout
      tag="Career Guide"
      title="LIC Agent Exam 2026: Syllabus, Preparation Tips & Study Material"
      subtitle="Everything you need to clear the IC-38 exam, become a licensed LIC agent, and build a successful insurance career."
      publishDate="Oct 2026"
      readTime="12 min read"
      toc={TOC}
      relatedGuides={RELATED_GUIDES}
      relatedTools={RELATED_TOOLS}
    >
      {/* --- Who Can Become a LIC Agent --- */}
      <section id="who-can-become" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Who Can Become a LIC Agent</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          LIC of India appoints agents across the country to sell its insurance products. The
          eligibility criteria are straightforward and accessible to a wide range of candidates.
          Here are the key requirements you must meet before applying.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-1">Minimum Age</p>
            <p className="text-signal text-lg font-bold">18 Years</p>
            <p className="text-white/40 text-xs mt-1">No upper age limit for becoming an agent</p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-1">Education (Rural)</p>
            <p className="text-signal text-lg font-bold">10th Pass</p>
            <p className="text-white/40 text-xs mt-1">Minimum qualification for rural areas</p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-1">Education (Urban/Semi-Urban)</p>
            <p className="text-signal text-lg font-bold">12th Pass</p>
            <p className="text-white/40 text-xs mt-1">Minimum qualification for urban and semi-urban areas</p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-1">Nationality</p>
            <p className="text-signal text-lg font-bold">Indian Citizen</p>
            <p className="text-white/40 text-xs mt-1">Must hold Indian citizenship</p>
          </div>
        </div>
        <div className="panel p-4 border-l-4 border-l-signal mb-4">
          <p className="text-white/60 text-sm">
            <span className="text-signal font-semibold">Important:</span> You should not be an
            existing agent of any other insurance company. You must also have a clean record with no
            criminal convictions. These are mandatory requirements set by IRDAI for all insurance
            agents in India.
          </p>
        </div>
      </section>

      {/* --- Steps to Become LIC Agent --- */}
      <section id="steps-to-become" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Steps to Become LIC Agent</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          The process of becoming a LIC agent involves six clear steps, from finding a Development
          Officer to receiving your IRDAI license. The entire process typically takes 4-8 weeks
          depending on training schedules and exam availability in your area.
        </p>
        <div className="space-y-2 mb-4">
          {[
            {
              title: "Find a Development Officer (DO) in your area",
              desc: "Visit your nearest LIC branch office and express your interest in becoming an agent. The branch will connect you with a Development Officer who will guide you through the process. You can also apply online through the LIC careers section.",
            },
            {
              title: "Submit application with required documents",
              desc: "Provide your 10th/12th marksheet, Aadhaar card, PAN card, 4 passport-size photos, cancelled cheque, and address proof. The DO will verify your documents and process your application.",
            },
            {
              title: "Complete 25 hours of pre-recruitment training (PRT)",
              desc: "Attend the mandatory training conducted by your Development Officer or a LIC-approved training center. This covers insurance basics, LIC products, selling skills, and exam preparation.",
            },
            {
              title: "Register for IC-38 exam at authorized NIA/III center",
              desc: "After completing the training, register for the IC-38 exam at a National Insurance Academy (NIA) or Insurance Institute of India (III) authorized center near you. Your DO will assist with registration.",
            },
            {
              title: "Pass the IC-38 exam (minimum 35 out of 50)",
              desc: "Appear for the online computer-based exam. You need to score at least 35 out of 50 marks to pass. The exam is one hour long with 50 multiple-choice questions.",
            },
            {
              title: "Receive appointment letter and IRDAI license",
              desc: "After passing, LIC processes your appointment. You receive an official appointment letter and IRDAI license within 2-4 weeks. You are now authorized to sell LIC products.",
            },
          ].map((step, i) => (
            <div key={i} className="panel-inner p-4 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">{step.title}</p>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- IC-38 Exam Syllabus --- */}
      <section id="ic38-syllabus" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">IC-38 Exam Syllabus</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          The IC-38 (Insurance Agents - Life) exam covers four major topics. Understanding the
          weightage of each topic helps you allocate your preparation time effectively. Here is the
          complete topic-wise breakdown.
        </p>
        <div className="space-y-3 mb-4">
          <div className="panel-inner p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white font-semibold text-sm">Insurance Principles & Practices</p>
              <span className="text-signal text-xs font-bold bg-signal/10 px-2 py-0.5 rounded">15-20 Questions</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Types of insurance, principles of utmost good faith, insurable interest, indemnity,
              proximate cause, subrogation, contribution, and the role of insurance in economic
              development.
            </p>
          </div>
          <div className="panel-inner p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white font-semibold text-sm">Life Insurance Products</p>
              <span className="text-signal text-xs font-bold bg-signal/10 px-2 py-0.5 rounded">10-15 Questions</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Endowment plans, whole life plans, term insurance, money-back policies, ULIPs,
              pension plans, group insurance, rider benefits, and key features of popular LIC
              products.
            </p>
          </div>
          <div className="panel-inner p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white font-semibold text-sm">IRDAI Regulations</p>
              <span className="text-signal text-xs font-bold bg-signal/10 px-2 py-0.5 rounded">8-10 Questions</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              IRDAI Act 1999, Insurance Act 1938, policyholder protection regulations, grievance
              redressal mechanism, agent licensing rules, and compliance requirements.
            </p>
          </div>
          <div className="panel-inner p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white font-semibold text-sm">Customer Service & Ethics</p>
              <span className="text-signal text-xs font-bold bg-signal/10 px-2 py-0.5 rounded">5-8 Questions</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Proposal form filling, claim process, need-based analysis, ethical selling practices,
              mis-selling prevention, and agent code of conduct.
            </p>
          </div>
        </div>
      </section>

      {/* --- Exam Pattern & Format --- */}
      <section id="exam-pattern" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Exam Pattern & Format</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          The IC-38 exam is an online computer-based test conducted at authorized centers across
          India. Here is everything you need to know about the exam format.
        </p>
        <div className="space-y-2 mb-4">
          {[
            { label: "Exam Mode", value: "Online (Computer-Based Test)" },
            { label: "Total Questions", value: "50 Multiple Choice Questions" },
            { label: "Duration", value: "1 Hour (60 Minutes)" },
            { label: "Marks Per Question", value: "1 Mark Each" },
            { label: "Negative Marking", value: "0.25 marks deducted per wrong answer" },
            { label: "Passing Marks", value: "35 out of 50 (70%)" },
            { label: "Conducting Body", value: "NIA / Insurance Institute of India" },
            { label: "Languages", value: "English, Hindi, and Regional Languages" },
          ].map((row, i) => (
            <div key={i} className="panel-inner p-3 flex justify-between items-center text-sm">
              <span className="text-white/60">{row.label}</span>
              <span className="text-white font-medium text-right">{row.value}</span>
            </div>
          ))}
        </div>
        <div className="panel p-4 border-l-4 border-l-warn">
          <p className="text-white/60 text-sm">
            <span className="text-warn font-semibold">Note:</span> Negative marking of 0.25 means
            that for every 4 wrong answers, you lose 1 mark. Avoid random guessing. Only attempt a
            question if you can eliminate at least 2 options.
          </p>
        </div>
      </section>

      {/* --- Preparation Strategy --- */}
      <section id="preparation-strategy" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Preparation Strategy</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          A focused 3-week study plan is sufficient for most candidates to clear the IC-38 exam.
          The key is consistent daily study of 1-2 hours rather than last-minute cramming. Here is
          a week-by-week plan to help you prepare systematically.
        </p>
        <div className="space-y-3 mb-4">
          <div className="panel-inner p-4">
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">
                W1
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Week 1: Insurance Principles & Practices</p>
                <p className="text-white/50 text-sm leading-relaxed">
                  Build your foundation. Study the core principles: utmost good faith, insurable
                  interest, indemnity, subrogation, and proximate cause. Understand the types of
                  insurance and how life insurance differs from general insurance. This section
                  carries the highest weightage (40%), so invest the most time here.
                </p>
              </div>
            </div>
          </div>
          <div className="panel-inner p-4">
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">
                W2
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Week 2: LIC Products & IRDAI Regulations</p>
                <p className="text-white/50 text-sm leading-relaxed">
                  Learn the features of major LIC products: endowment, term, whole life, money-back,
                  and pension plans. Study IRDAI regulations including the Insurance Act 1938, IRDAI
                  Act 1999, and policyholder protection rules. Focus on key sections that are
                  frequently asked.
                </p>
              </div>
            </div>
          </div>
          <div className="panel-inner p-4">
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">
                W3
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Week 3: Revision, Mock Tests & Customer Service</p>
                <p className="text-white/50 text-sm leading-relaxed">
                  Revise all topics from Weeks 1 and 2. Practice with IC-38 model question papers
                  and take at least 3-4 full mock tests. Cover the customer service and ethics
                  section. Focus on understanding concepts rather than rote memorization. Pay special
                  attention to numerical questions on premium calculation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="panel p-4 border-l-4 border-l-signal">
          <p className="text-white/60 text-sm">
            <span className="text-signal font-semibold">Tip:</span> Focus on understanding concepts,
            not rote learning. The exam tests practical knowledge. If you understand the "why" behind
            insurance principles, you can answer most questions through reasoning even if you don't
            remember the exact textbook wording.
          </p>
        </div>
      </section>

      {/* --- Important Topics to Focus On --- */}
      <section id="important-topics" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Important Topics to Focus On</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Not all topics carry equal weightage. Prioritize your study time based on the number of
          questions expected from each section. Here is the approximate topic distribution.
        </p>
        <div className="space-y-3 mb-4">
          {[
            {
              topic: "Insurance Principles",
              pct: 40,
              note: "Highest weightage - master this first",
              color: "text-signal",
            },
            {
              topic: "LIC Products",
              pct: 30,
              note: "Know features of major plans",
              color: "text-signal",
            },
            {
              topic: "IRDAI Regulations",
              pct: 20,
              note: "Focus on key sections and acts",
              color: "text-warn",
            },
            {
              topic: "Ethics & Customer Service",
              pct: 10,
              note: "Common sense + guidelines",
              color: "text-white/60",
            },
          ].map((item, i) => (
            <div key={i} className="panel-inner p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white font-semibold text-sm">{item.topic}</p>
                <span className={`${item.color} text-sm font-bold`}>~{item.pct}%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 mb-2">
                <div
                  className="bg-signal/60 h-2 rounded-full"
                  style={{ width: `${item.pct}%` }}
                />
              </div>
              <p className="text-white/40 text-xs">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Free Study Resources --- */}
      <section id="study-resources" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Free Study Resources</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          You do not need to spend a lot on study material. The official resources are sufficient to
          clear the IC-38 exam. Here are the best free and low-cost resources available.
        </p>
        <div className="space-y-3 mb-4">
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-1">IRDAI Official Website</p>
            <p className="text-white/50 text-sm leading-relaxed">
              The irdai.gov.in website provides the official IC-38 study material in PDF format.
              This is the primary source for exam preparation and covers all topics in the syllabus.
              Download and study this thoroughly.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-1">National Insurance Academy (NIA)</p>
            <p className="text-white/50 text-sm leading-relaxed">
              NIA is the authorized exam conducting body and provides study materials, model question
              papers, and practice tests. Visit the NIA website for the latest IC-38 question bank.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-1">LIC of India Website</p>
            <p className="text-white/50 text-sm leading-relaxed">
              The licindia.in website has detailed product brochures for all current LIC plans. Study
              these to understand plan features, benefits, and eligibility criteria. This helps with
              the Life Insurance Products section of the exam.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-1">IC-38 Model Question Papers</p>
            <p className="text-white/50 text-sm leading-relaxed">
              Model question papers are available on the NIA website and various educational
              platforms. Practice at least 5-6 sets of model papers to understand the question
              pattern and improve your speed.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-1">YouTube Video Lectures</p>
            <p className="text-white/50 text-sm leading-relaxed">
              Several YouTube channels offer free IC-38 preparation videos in Hindi and English.
              These are useful for visual learners and help explain complex insurance concepts in
              simple language. Search for "IC-38 preparation" to find relevant channels.
            </p>
          </div>
        </div>
      </section>

      {/* --- Exam Day Tips --- */}
      <section id="exam-day-tips" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Exam Day Tips</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Proper preparation on exam day can make the difference between passing and failing. Follow
          this checklist to ensure a smooth exam experience.
        </p>
        <div className="space-y-2 mb-4">
          {[
            "Carry your Aadhaar card and exam hall ticket. Both are mandatory for entry.",
            "Reach the exam center at least 30 minutes before the scheduled time.",
            "Read each question carefully - remember, negative marking of 0.25 applies for wrong answers.",
            "Attempt insurance principles questions first. This is your strongest section with the most preparation.",
            "Don't leave any question blank if you can confidently eliminate at least 2 options out of 4.",
            "Time management: spend approximately 1 minute per question. Use the last 10 minutes to review flagged questions.",
            "Stay calm and confident. Scoring 35 out of 50 is achievable with basic, consistent preparation.",
          ].map((tip, i) => (
            <div key={i} className="panel-inner p-3 flex gap-3 items-start">
              <span className="shrink-0 w-6 h-6 rounded-full bg-signal/10 text-signal text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-white/60 text-sm">{tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- After Passing the Exam --- */}
      <section id="after-passing" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">After Passing the Exam</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Congratulations on passing the IC-38 exam! Here is what happens next and what you can
          expect as a newly appointed LIC agent.
        </p>
        <div className="space-y-2 mb-4">
          {[
            {
              title: "IRDAI License",
              desc: "Receive your IRDAI license within 2-4 weeks of passing the exam.",
            },
            {
              title: "LIC Appointment Letter",
              desc: "LIC issues your official appointment letter, assigning you a unique agent code.",
            },
            {
              title: "Branch & DO Assignment",
              desc: "You are assigned to a specific LIC branch and a Development Officer who will mentor you.",
            },
            {
              title: "Probation Period",
              desc: "New agents have a 12-month probation period during which you must meet minimum business targets.",
            },
          ].map((item, i) => (
            <div key={i} className="panel-inner p-3 flex gap-3 items-start">
              <span className="shrink-0 w-6 h-6 rounded-full bg-signal/10 text-signal text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <p className="text-white font-semibold text-sm">{item.title}</p>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="panel p-4 border-l-4 border-l-signal">
          <p className="text-white font-semibold text-sm mb-2">Commission Structure for New Agents</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-white/60">
              <span>First Year Commission</span>
              <span className="text-signal font-bold">25-40% of Premium</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Renewal Commission (Year 2-3)</span>
              <span className="text-signal font-bold">7.5% of Premium</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Renewal Commission (Year 4+)</span>
              <span className="text-signal font-bold">5% of Premium</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Bonus Commission (High Performers)</span>
              <span className="text-signal font-bold">Additional Incentives</span>
            </div>
          </div>
          <p className="text-white/40 text-xs mt-2">
            Commission rates vary by plan type and policy term. Use our{" "}
            <Link to="/commission-calculator" className="text-signal">Commission Calculator</Link>{" "}
            for exact earnings per policy.
          </p>
        </div>
      </section>

      {/* --- Career Growth --- */}
      <section id="career-growth" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Career Growth as LIC Agent</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          A career as a LIC agent offers significant growth potential. Many agents have built
          highly successful careers with LIC, earning well into seven figures annually. Here is the
          typical progression path.
        </p>
        <div className="space-y-3 mb-4">
          <div className="panel-inner p-4">
            <div className="flex gap-4 items-center">
              <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Agent</p>
                <p className="text-white/40 text-xs">Starting position. Sell LIC products, build your client base, earn commissions.</p>
              </div>
            </div>
          </div>
          <div className="panel-inner p-4">
            <div className="flex gap-4 items-center">
              <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Senior Agent</p>
                <p className="text-white/40 text-xs">Achieved through consistent business performance. Higher commission tiers and recognition.</p>
              </div>
            </div>
          </div>
          <div className="panel-inner p-4">
            <div className="flex gap-4 items-center">
              <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Development Officer (DO)</p>
                <p className="text-white/40 text-xs">Manage and train new agents. Regular salary + commission. LIC employee benefits apply.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">Club Memberships</p>
            <div className="space-y-1 text-sm text-white/50">
              <p>Branch Manager's Club</p>
              <p>Zonal Manager's Club</p>
              <p>Chairman's Club (top performers)</p>
            </div>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">Recognition & Rewards</p>
            <div className="space-y-1 text-sm text-white/50">
              <p>MDRT (Million Dollar Round Table)</p>
              <p>International trips and conventions</p>
              <p>Top agents earn Rs 50 lakh+ annually</p>
            </div>
          </div>
        </div>

        <div className="panel p-4 border-l-4 border-l-signal">
          <p className="text-white/60 text-sm">
            <span className="text-signal font-semibold">LIC Advantage:</span> As a LIC agent, you
            benefit from the strongest brand trust in Indian insurance. LIC provides training,
            infrastructure, marketing support, and a vast product portfolio. The brand recognition
            alone opens doors that agents of private insurers often struggle with.
          </p>
        </div>
      </section>

      {/* --- Essential Tools for New Agents --- */}
      <section id="essential-tools" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Essential Tools for New Agents</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          As a new LIC agent, having the right tools makes all the difference. InsureKit provides
          free tools designed specifically for LIC agents to help you sell more effectively and
          serve your clients better.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">Commission Calculator</p>
            <p className="text-white/50 text-sm leading-relaxed mb-3">
              Know your exact earnings per policy before you sell. Calculate first year and renewal
              commissions for any LIC plan based on premium, term, and payment frequency.
            </p>
            <Link to="/commission-calculator" className="text-signal text-sm font-semibold hover:underline no-underline">
              Open Commission Calculator &rarr;
            </Link>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">Premium Calculator</p>
            <p className="text-white/50 text-sm leading-relaxed mb-3">
              Quote premiums instantly to clients during meetings. No need to carry rate charts or
              call the branch office. Works for all current LIC plans.
            </p>
            <Link to="/premium-calculator" className="text-signal text-sm font-semibold hover:underline no-underline">
              Open Premium Calculator &rarr;
            </Link>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">Plan Recommender</p>
            <p className="text-white/50 text-sm leading-relaxed mb-3">
              Find the right plan for each client's needs. Enter their age, budget, and goal, and
              get personalized plan recommendations with comparison details.
            </p>
            <Link to="/plan-recommender" className="text-signal text-sm font-semibold hover:underline no-underline">
              Open Plan Recommender &rarr;
            </Link>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">Marketing Generator</p>
            <p className="text-white/50 text-sm leading-relaxed mb-3">
              Create professional marketing materials for WhatsApp, social media, and print.
              Generate plan comparison images, festival greetings, and client testimonial templates.
            </p>
            <Link to="/marketing" className="text-signal text-sm font-semibold hover:underline no-underline">
              Open Marketing Generator &rarr;
            </Link>
          </div>
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </GuideLayout>
  );
}
