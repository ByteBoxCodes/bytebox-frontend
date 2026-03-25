import {
  Layers,
  Target,
  Code2,
  Trophy,
  BarChart3,
  Users,
  Heart,
  Mail,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AboutSection } from "@/features/about/AboutSection";
import { ContactCard } from "@/features/about/ContactCard";
import { FeatureItem } from "@/features/about/FeatureItem";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            About Us
          </h1>
          <p className="mt-1 text-sm text-muted-foreground max-w-xl">
            Learn more about our platform, mission, and how to get in touch.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Who We Are */}
        <AboutSection
          id="who-we-are"
          icon={<Layers className="w-4 h-4" />}
          title="Who We Are"
        >
          <p>
            <strong className="text-foreground">ByteBoxCodes</strong> is an
            online coding practice and learning platform built for developers
            who want to sharpen their problem-solving skills. Whether you're
            just starting out or preparing for technical interviews,
            ByteBoxCodes provides a focused environment to learn, practice, and
            grow.
          </p>
          <p>
            Our platform is designed to be simple, distraction-free, and
            accessible to everyone — with a special focus on developers in India
            and across the globe.
          </p>
        </AboutSection>

        <Separator />

        {/* Our Mission */}
        <AboutSection
          id="mission"
          icon={<Target className="w-4 h-4" />}
          title="Our Mission"
        >
          <p>
            We believe that consistent practice is the key to becoming a great
            developer. Our mission is to make high-quality coding practice
            accessible to every student and aspiring engineer —{" "}
            <strong className="text-foreground">completely free</strong>.
          </p>
          <p>
            ByteBoxCodes is built by developers, for developers. We're committed
            to creating a platform that's fast, clean, and focused on helping
            you level up your coding skills one problem at a time.
          </p>
        </AboutSection>

        <Separator />

        {/* What We Offer */}
        <AboutSection
          id="features"
          icon={<Code2 className="w-4 h-4" />}
          title="What We Offer"
        >
          <div className="grid gap-4 sm:grid-cols-2 pt-1">
            <FeatureItem
              icon={<Code2 className="w-4 h-4" />}
              title="Coding Problems"
              description="Curated problems across Easy, Medium, and Hard difficulty levels to match your skill."
            />
            <FeatureItem
              icon={<BarChart3 className="w-4 h-4" />}
              title="Progress Tracking"
              description="Track your XP, level, streaks, and solved problems to stay motivated."
            />
            <FeatureItem
              icon={<Trophy className="w-4 h-4" />}
              title="Leaderboards"
              description="Compete with other developers and climb the global leaderboard."
            />
            <FeatureItem
              icon={<Users className="w-4 h-4" />}
              title="Community Profiles"
              description="Build your public profile, showcase your skills, and connect with peers."
            />
          </div>
        </AboutSection>

        <Separator />

        {/* Why ByteBoxCodes */}
        <AboutSection
          id="why"
          icon={<Heart className="w-4 h-4" />}
          title="Why ByteBoxCodes?"
        >
          <ul className="space-y-1.5 ml-1">
            {[
              "Clean, distraction-free interface designed for focus",
              "Multi-language code editor with real-time execution",
              "Built with modern technologies for a fast experience",
              "Actively maintained and continuously improved",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-muted-foreground/60 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </AboutSection>

        <Separator />

        {/* Contact Us */}
        <AboutSection
          id="contact"
          icon={<Mail className="w-4 h-4" />}
          title="Contact Us"
        >
          <p>
            Have feedback, suggestions, or found a bug? We'd love to hear from
            you. Reach out to us through any of the channels below.
          </p>
          <div className="pt-2">
            <ContactCard
              email="byteboxcodes@gmail.com"
              website="https://byteboxcodes.com"
              github="https://github.com/ByteBoxCodes"
            />
          </div>
        </AboutSection>
      </div>
    </div>
  );
}
