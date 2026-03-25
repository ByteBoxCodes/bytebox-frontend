import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-3 bg-(--bg-secondary) border-t border-(--border-primary) dark:border-white/8 transition-colors duration-200">
      <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 flex-wrap">
        <span className="text-xs text-(--text-tertiary)">
          © {new Date().getFullYear()} ByteBox. All rights reserved.
        </span>
        <nav className="flex items-center gap-5">
          <Link
            to="/privacy-policy"
            className="text-xs text-(--text-tertiary) hover:text-(--btn-primary-bg) dark:hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="text-xs text-(--text-tertiary) hover:text-(--btn-primary-bg) dark:hover:text-white transition-colors"
          >
            Terms & Conditions
          </Link>
          <Link
            to="/about"
            className="text-xs text-(--text-tertiary) hover:text-(--btn-primary-bg) dark:hover:text-white transition-colors"
          >
            About Us
          </Link>
        </nav>
      </div>
    </footer>
  );
}
