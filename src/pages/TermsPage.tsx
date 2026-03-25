import {
  FileText,
  UserCheck,
  ShieldCheck,
  Code2,
  Layers,
  Ban,
  LogOut,
  Link2,
  AlertTriangle,
  Info,
  RefreshCw,
  Globe,
  Mail,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { PolicySection } from "@/features/terms/PolicySection";
import { PolicyList } from "@/features/terms/PolicyList";
import { PolicyToc } from "@/features/terms/PolicyToc";

const TOC_ITEMS = [
  { id: "acceptance", label: "Acceptance of Terms" },
  { id: "eligibility", label: "Eligibility" },
  { id: "accounts", label: "User Accounts" },
  { id: "acceptable-use", label: "Acceptable Use" },
  { id: "submissions", label: "Code Submissions" },
  { id: "ip", label: "Intellectual Property" },
  { id: "prohibited", label: "Prohibited Activities" },
  { id: "termination", label: "Termination" },
  { id: "third-party", label: "Third-Party Services" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "disclaimer", label: "Disclaimer" },
  { id: "changes", label: "Changes to Terms" },
  { id: "governing-law", label: "Governing Law" },
  { id: "contact", label: "Contact Us" },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="mt-1 text-sm text-muted-foreground max-w-xl">
            Please read these terms carefully before using{" "}
            <span className="font-medium text-foreground">ByteBoxCodes</span>.
          </p>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              Last updated:{" "}
              <span className="font-medium text-foreground">March 25, 2025</span>
            </span>
            <Separator orientation="vertical" className="h-3" />
            <a
              href="https://byteboxcodes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              byteboxcodes.com
            </a>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-12">
          <PolicyToc items={TOC_ITEMS} />

          <div className="flex-1 min-w-0 space-y-8">

            {/* 1. Acceptance */}
            <PolicySection id="acceptance" icon={<FileText className="w-4 h-4" />} title="1. Acceptance of Terms">
              <p>
                By accessing or using{" "}
                <strong className="text-foreground">ByteBoxCodes</strong> (
                <a href="https://byteboxcodes.com" className="text-foreground underline underline-offset-2 hover:opacity-80">
                  byteboxcodes.com
                </a>
                ), you agree to be bound by these Terms &amp; Conditions and our{" "}
                <a href="/privacy-policy" className="text-foreground underline underline-offset-2 hover:opacity-80">
                  Privacy Policy
                </a>
                . If you do not agree, please do not use the platform.
              </p>
              <p>
                These terms apply to all visitors, registered users, and anyone who
                accesses or interacts with ByteBoxCodes in any way.
              </p>
            </PolicySection>

            {/* 2. Eligibility */}
            <PolicySection id="eligibility" icon={<UserCheck className="w-4 h-4" />} title="2. Eligibility">
              <PolicyList
                items={[
                  "You must be at least 13 years of age to use ByteBoxCodes",
                  "Users under 18 should use the platform under parental or guardian supervision",
                  "You are responsible for ensuring your use complies with any laws applicable in your region",
                  "By registering, you confirm that all information you provide is accurate and up to date",
                ]}
              />
            </PolicySection>

            {/* 3. User Accounts */}
            <PolicySection id="accounts" icon={<ShieldCheck className="w-4 h-4" />} title="3. User Accounts">
              <PolicyList
                items={[
                  "You must create an account to access most features of ByteBoxCodes",
                  "You are responsible for maintaining the confidentiality of your login credentials",
                  "You are responsible for all activity that occurs under your account",
                  "Notify us immediately at byteboxcodes@gmail.com if you suspect unauthorised access",
                  "We reserve the right to suspend or terminate accounts that provide false information",
                ]}
              />
            </PolicySection>

            {/* 4. Acceptable Use */}
            <PolicySection id="acceptable-use" icon={<Info className="w-4 h-4" />} title="4. Acceptable Use">
              <p>When using ByteBoxCodes, you agree to:</p>
              <PolicyList
                items={[
                  "Use the platform only for lawful purposes",
                  "Respect the rights and privacy of other users",
                  "Not use automation, bots, or scripts to interact with the platform unless explicitly permitted",
                  "Not attempt to exploit, hack, or disrupt the platform or its infrastructure",
                  "Not submit malicious, offensive, or harmful content",
                ]}
              />
            </PolicySection>

            {/* 5. Code Submissions */}
            <PolicySection id="submissions" icon={<Code2 className="w-4 h-4" />} title="5. Code Submissions">
              <p>
                When you submit code to ByteBoxCodes:
              </p>
              <PolicyList
                items={[
                  "You retain ownership of the code you write and submit",
                  "You grant ByteBoxCodes a non-exclusive licence to store and process your submissions for platform operations",
                  "You are solely responsible for the correctness, legality, and safety of your code",
                  "ByteBoxCodes is not liable for incorrect outputs, failed executions, or any consequences of your code",
                  "Do not submit code that is plagiarised, malicious, or violates any third-party rights",
                ]}
              />
            </PolicySection>

            {/* 6. Intellectual Property */}
            <PolicySection id="ip" icon={<Layers className="w-4 h-4" />} title="6. Intellectual Property">
              <p>
                All content on ByteBoxCodes — including but not limited to problem
                statements, descriptions, UI/UX design, branding, and platform code —
                is the intellectual property of ByteBoxCodes.
              </p>
              <PolicyList
                items={[
                  "You may not reproduce, copy, or redistribute platform content without prior written permission",
                  "The ByteBoxCodes name, logo, and brand identity are protected trademarks",
                  "User-generated content (code submissions, profile data) belongs to respective users",
                ]}
              />
            </PolicySection>

            {/* 7. Prohibited Activities */}
            <PolicySection id="prohibited" icon={<Ban className="w-4 h-4" />} title="7. Prohibited Activities">
              <p>The following activities are strictly prohibited on ByteBoxCodes:</p>
              <PolicyList
                items={[
                  "Cheating, sharing solutions, or using unfair means during contests or timed challenges",
                  "Scraping, crawling, or systematically extracting data from the platform",
                  "Reverse engineering, decompiling, or disassembling any part of the platform",
                  "Attempting to gain unauthorised access to other user accounts or platform systems",
                  "Using the platform to distribute spam, malware, or phishing content",
                  "Creating multiple accounts to gain an unfair advantage on the leaderboard or otherwise",
                  "Selling or transferring your account to another person",
                ]}
              />
            </PolicySection>

            {/* 8. Termination */}
            <PolicySection id="termination" icon={<LogOut className="w-4 h-4" />} title="8. Termination or Suspension">
              <p>
                ByteBoxCodes reserves the right to suspend or permanently terminate
                your account at any time, without notice, if:
              </p>
              <PolicyList
                items={[
                  "You violate any of these Terms & Conditions",
                  "Your activity is deemed harmful to the platform or other users",
                  "We are required to do so by law",
                ]}
              />
              <p className="pt-2">
                You may also delete your account at any time by contacting us at{" "}
                <a
                  href="mailto:byteboxcodes@gmail.com"
                  className="text-foreground underline underline-offset-2 hover:opacity-80"
                >
                  byteboxcodes@gmail.com
                </a>
                .
              </p>
            </PolicySection>

            {/* 9. Third-Party */}
            <PolicySection id="third-party" icon={<Link2 className="w-4 h-4" />} title="9. Third-Party Services">
              <p>
                ByteBoxCodes uses third-party services to operate and improve the
                platform. These include:
              </p>
              <PolicyList
                items={[
                  <>
                    <strong className="text-foreground">Google AdSense</strong> — used to display advertisements. Ad content is
                    controlled by Google and subject to their policies
                  </>,
                  <>
                    <strong className="text-foreground">Google Analytics</strong> — used to analyse usage patterns and improve
                    platform performance
                  </>,
                  <>
                    <strong className="text-foreground">Google OAuth</strong> — allows sign-in with a Google account
                  </>,
                ]}
              />
              <p className="pt-2">
                ByteBoxCodes is not responsible for the content, policies, or
                practices of any third-party services. External links on the platform
                do not constitute endorsement.
              </p>
            </PolicySection>

            {/* 10. Liability */}
            <PolicySection id="liability" icon={<AlertTriangle className="w-4 h-4" />} title="10. Limitation of Liability">
              <p>
                To the fullest extent permitted by applicable law, ByteBoxCodes and
                its team shall not be liable for:
              </p>
              <PolicyList
                items={[
                  "Any loss of data, revenue, or profits arising from use of the platform",
                  "Errors, bugs, or downtime in the platform",
                  "Consequences arising from code submitted or executed on the platform",
                  "Any indirect, incidental, or consequential damages",
                ]}
              />
              <p className="pt-2">
                Your use of ByteBoxCodes is entirely at your own risk.
              </p>
            </PolicySection>

            {/* 11. Disclaimer */}
            <PolicySection id="disclaimer" icon={<Info className="w-4 h-4" />} title='11. Disclaimer — "As Is"'>
              <p>
                ByteBoxCodes is provided on an{" "}
                <strong className="text-foreground">"as is" and "as available"</strong>{" "}
                basis without warranties of any kind, either express or implied. We do
                not guarantee that:
              </p>
              <PolicyList
                items={[
                  "The platform will be uninterrupted, error-free, or always available",
                  "Results from coding problems or code execution will always be accurate",
                  "The platform is free from viruses or other harmful components",
                ]}
              />
            </PolicySection>

            {/* 12. Changes */}
            <PolicySection id="changes" icon={<RefreshCw className="w-4 h-4" />} title="12. Changes to Terms">
              <p>
                We may update these Terms &amp; Conditions at any time. When we do,
                the "Last updated" date at the top of this page will be revised. For
                significant changes, we will notify users via email or an in-platform
                notice.
              </p>
              <p>
                Continued use of ByteBoxCodes after changes are posted constitutes
                your acceptance of the new terms.
              </p>
            </PolicySection>

            {/* 13. Governing Law */}
            <PolicySection id="governing-law" icon={<Globe className="w-4 h-4" />} title="13. Governing Law">
              <p>
                These Terms &amp; Conditions are governed by and construed in
                accordance with the laws of <strong className="text-foreground">India</strong>. Any disputes
                arising out of or in connection with these terms shall be subject to
                the exclusive jurisdiction of the courts of India.
              </p>
            </PolicySection>

            {/* 14. Contact */}
            <PolicySection id="contact" icon={<Mail className="w-4 h-4" />} title="14. Contact Us">
              <p>
                If you have any questions or concerns about these Terms &amp;
                Conditions, please contact us:
              </p>
              <div className="mt-3 rounded-lg border border-border bg-card p-4 space-y-1.5">
                <p className="font-medium text-foreground text-sm">ByteBoxCodes</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:byteboxcodes@gmail.com"
                    className="text-foreground underline underline-offset-2 hover:opacity-80"
                  >
                    byteboxcodes@gmail.com
                  </a>
                </p>
                <p>
                  Website:{" "}
                  <a
                    href="https://byteboxcodes.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline underline-offset-2 hover:opacity-80"
                  >
                    https://byteboxcodes.com
                  </a>
                </p>
              </div>
            </PolicySection>

          </div>
        </div>
      </div>
    </div>
  );
}
