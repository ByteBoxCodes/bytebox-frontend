import {
  Info,
  Database,
  Cookie,
  Link2,
  Share2,
  Lock,
  UserCheck,
  Baby,
  RefreshCw,
  Mail,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { PolicySection } from "@/features/terms/PolicySection";
import { PolicyList } from "@/features/terms/PolicyList";
import { PolicyToc } from "@/features/terms/PolicyToc";

const TOC_ITEMS = [
  { id: "introduction", label: "Introduction" },
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use", label: "How We Use Information" },
  { id: "cookies", label: "Cookies & Tracking" },
  { id: "third-party", label: "Third-Party Services" },
  { id: "data-sharing", label: "Data Sharing" },
  { id: "data-security", label: "Data Security" },
  { id: "user-rights", label: "Your Rights" },
  { id: "children", label: "Children's Privacy" },
  { id: "changes", label: "Policy Changes" },
  { id: "contact", label: "Contact Us" },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-1 text-sm text-muted-foreground max-w-xl">
            How <span className="font-medium text-foreground">ByteBoxCodes</span> collects, uses, and protects your information.
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
          {/* Table of Contents */}
          <PolicyToc items={TOC_ITEMS} />

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-8">

            {/* 1. Introduction */}
            <PolicySection id="introduction" icon={<Info className="w-4 h-4" />} title="1. Introduction">
              <p>
                Welcome to <strong className="text-foreground">ByteBoxCodes</strong> ("we", "us", or "our"), an online coding
                practice and learning platform available at{" "}
                <a href="https://byteboxcodes.com" className="text-foreground underline underline-offset-2 hover:opacity-80">
                  byteboxcodes.com
                </a>
                . We are committed to protecting your privacy and handling your data
                responsibly.
              </p>
              <p>
                This Privacy Policy describes what information we collect, how we use
                it, and the choices you have. By using ByteBoxCodes, you agree to the
                practices described in this policy.
              </p>
            </PolicySection>

            {/* 2. Information We Collect */}
            <PolicySection id="information-we-collect" icon={<Database className="w-4 h-4" />} title="2. Information We Collect">
              <p className="font-medium text-foreground">Information you provide directly:</p>
              <PolicyList
                items={[
                  "Name and email address when registering",
                  "Profile information (username, bio, preferred programming language)",
                  "Avatar / profile photo",
                  "Code submissions and solutions to problems",
                  "Messages or feedback submitted through contact forms",
                ]}
              />
              <p className="font-medium text-foreground pt-2">Information collected automatically:</p>
              <PolicyList
                items={[
                  "IP address and general location",
                  "Browser type, operating system, and device information",
                  "Pages visited, time spent, and interactions within the platform",
                  "Cookies and similar tracking technologies (see section 4)",
                ]}
              />
              <p className="font-medium text-foreground pt-2">Information from third-party services:</p>
              <PolicyList
                items={[
                  "If you sign in with Google OAuth, we may receive your name, email, and profile photo from Google",
                  "Advertising and analytics data from Google AdSense and Google Analytics",
                ]}
              />
            </PolicySection>

            {/* 3. How We Use Information */}
            <PolicySection id="how-we-use" icon={<UserCheck className="w-4 h-4" />} title="3. How We Use Your Information">
              <PolicyList
                items={[
                  "Create and manage your account",
                  "Provide access to coding problems, track your progress and XP",
                  "Show leaderboards and community-facing profile data",
                  "Send account-related emails (verification, password reset, important notices)",
                  "Improve platform features and user experience through analytics",
                  "Display relevant advertisements via Google AdSense",
                  "Detect and prevent fraudulent or abusive activity",
                  "Respond to support requests and feedback",
                ]}
              />
            </PolicySection>

            {/* 4. Cookies */}
            <PolicySection id="cookies" icon={<Cookie className="w-4 h-4" />} title="4. Cookies & Tracking Technologies">
              <p>
                We use cookies and similar technologies to operate and improve ByteBoxCodes.
                Cookies are small text files stored on your device.
              </p>
              <p className="font-medium text-foreground pt-2">Types of cookies we use:</p>
              <PolicyList
                items={[
                  <>
                    <strong className="text-foreground">Essential cookies</strong> — required for the platform to function
                    (e.g., keeping you logged in)
                  </>,
                  <>
                    <strong className="text-foreground">Analytics cookies</strong> — used by Google Analytics to understand how
                    users interact with the platform
                  </>,
                  <>
                    <strong className="text-foreground">Advertising cookies</strong> — used by Google AdSense to deliver and
                    personalise ads based on your interests
                  </>,
                ]}
              />
              <p className="pt-2">
                You can control or disable cookies through your browser settings. Note
                that disabling certain cookies may affect platform functionality.
              </p>
              <p>
                You can opt out of personalised advertising by visiting{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-2 hover:opacity-80"
                >
                  Google Ads Settings
                </a>{" "}
                or{" "}
                <a
                  href="https://optout.aboutads.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-2 hover:opacity-80"
                >
                  aboutads.info
                </a>
                .
              </p>
            </PolicySection>

            {/* 5. Third-Party Services */}
            <PolicySection id="third-party" icon={<Link2 className="w-4 h-4" />} title="5. Third-Party Services">
              <p>We use the following third-party services that may collect data independently:</p>
              <PolicyList
                items={[
                  <>
                    <strong className="text-foreground">Google AdSense</strong> — serves advertisements on our platform. Google
                    may use cookies to display personalised ads. See{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline underline-offset-2"
                    >
                      Google's Privacy Policy
                    </a>
                    .
                  </>,
                  <>
                    <strong className="text-foreground">Google Analytics</strong> — tracks usage patterns and helps us improve
                    the platform. Data is anonymised where possible.
                  </>,
                  <>
                    <strong className="text-foreground">Google OAuth</strong> — allows sign-in with your Google account. We
                    receive only the data necessary to create your account.
                  </>,
                  <>
                    <strong className="text-foreground">Cloud infrastructure providers</strong> — we use cloud services to store
                    data and run the platform securely.
                  </>,
                ]}
              />
              <p className="pt-2">
                Each third-party service operates under its own privacy policy. We
                encourage you to review them.
              </p>
            </PolicySection>

            {/* 6. Data Sharing */}
            <PolicySection id="data-sharing" icon={<Share2 className="w-4 h-4" />} title="6. Data Sharing & Disclosure">
              <p>
                <strong className="text-foreground">We do not sell your personal data</strong> to any third parties.
              </p>
              <p className="pt-1">We may share your information only in the following circumstances:</p>
              <PolicyList
                items={[
                  "With trusted service providers who help us operate the platform (subject to confidentiality obligations)",
                  "When required by law, regulation, or a valid legal request",
                  "To protect the rights, safety, or property of ByteBoxCodes, our users, or the public",
                  "In connection with a merger or acquisition (you will be notified if this occurs)",
                ]}
              />
              <p className="pt-2">
                Public profile information (username, solved problems, leaderboard
                rank) is visible to all users by design. You can adjust visibility in
                your profile settings.
              </p>
            </PolicySection>

            {/* 7. Data Security */}
            <PolicySection id="data-security" icon={<Lock className="w-4 h-4" />} title="7. Data Security">
              <p>
                We implement industry-standard security measures to protect your data,
                including:
              </p>
              <PolicyList
                items={[
                  "Encrypted connections (HTTPS/TLS) for all data in transit",
                  "Hashed and salted passwords — we never store passwords in plain text",
                  "Access controls limiting who can view user data internally",
                  "Regular security reviews of our infrastructure",
                ]}
              />
              <p className="pt-2">
                No system is 100% secure. If you suspect unauthorised access to your
                account, please contact us immediately at{" "}
                <a
                  href="mailto:byteboxcodes@gmail.com"
                  className="text-foreground underline underline-offset-2 hover:opacity-80"
                >
                  byteboxcodes@gmail.com
                </a>
                .
              </p>
            </PolicySection>

            {/* 8. User Rights */}
            <PolicySection id="user-rights" icon={<UserCheck className="w-4 h-4" />} title="8. Your Rights">
              <p>You have the following rights regarding your personal data:</p>
              <PolicyList
                items={[
                  <>
                    <strong className="text-foreground">Access</strong> — request a copy of the data we hold about you
                  </>,
                  <>
                    <strong className="text-foreground">Correction</strong> — update or correct inaccurate information via your
                    profile settings
                  </>,
                  <>
                    <strong className="text-foreground">Deletion</strong> — request deletion of your account and associated data
                  </>,
                  <>
                    <strong className="text-foreground">Opt-out of personalised ads</strong> — use your browser settings or
                    Google Ads Settings to control ad personalisation
                  </>,
                  <>
                    <strong className="text-foreground">Data portability</strong> — request your data in a portable format
                  </>,
                ]}
              />
              <p className="pt-2">
                To exercise any of these rights, email us at{" "}
                <a
                  href="mailto:byteboxcodes@gmail.com"
                  className="text-foreground underline underline-offset-2 hover:opacity-80"
                >
                  byteboxcodes@gmail.com
                </a>
                . We will respond within 30 days.
              </p>
            </PolicySection>

            {/* 9. Children */}
            <PolicySection id="children" icon={<Baby className="w-4 h-4" />} title="9. Children's Privacy">
              <p>
                ByteBoxCodes is not directed at children under the age of{" "}
                <strong className="text-foreground">13</strong>. We do not knowingly collect personal
                information from children. If you believe a child has provided us with
                personal data, please contact us and we will promptly delete it.
              </p>
            </PolicySection>

            {/* 10. Changes */}
            <PolicySection id="changes" icon={<RefreshCw className="w-4 h-4" />} title="10. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. When we do, we
                will revise the "Last updated" date at the top of this page. For
                significant changes, we will notify you via email or a prominent notice
                within the platform.
              </p>
              <p>
                Continued use of ByteBoxCodes after any changes constitutes your
                acceptance of the updated policy.
              </p>
            </PolicySection>

            {/* 11. Contact */}
            <PolicySection id="contact" icon={<Mail className="w-4 h-4" />} title="11. Contact Us">
              <p>
                If you have any questions, concerns, or requests regarding this Privacy
                Policy, please reach out to us:
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
