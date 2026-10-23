"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useStore } from "@/lib/cart";
import { cx } from "@/lib/format";
import { store } from "@/lib/store-config";
import { Logo } from "@/components/ui/Logo";
import { SearchOverlay } from "./SearchOverlay";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/shop" },
  { label: "Protein", href: "/shop/protein" },
  { label: "Pre-Workout", href: "/shop/pre-workout" },
  { label: "Creatine", href: "/shop/creatine" },
  { label: "Vitamins & Wellness", href: "/shop/vitamins-wellness" },
  { label: "About Us", href: "/about" },
];

function useIsActive() {
  const pathname = usePathname();
  return (href: string) => (href === "/" ? pathname === "/" : pathname === href);
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const isActive = useIsActive();
  return (
    <>
      {navLinks.map((l) => (
        <li key={l.href}>
          <Link
            href={l.href}
            onClick={onNavigate}
            aria-current={isActive(l.href) ? "page" : undefined}
            className={cx(
              "relative py-2 text-[0.8rem] font-medium tracking-wide transition-colors",
              isActive(l.href) ? "text-lime" : "text-fg/80 hover:text-fg",
              "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-lime after:transition-transform after:duration-300 hover:after:scale-x-100",
              isActive(l.href) && "after:scale-x-100",
            )}
          >
            {l.label}
          </Link>
        </li>
      ))}
    </>
  );
}

function CartButton() {
  const { count, hydrated, setDrawerOpen, bump } = useStore();
  return (
    <button
      type="button"
      onClick={() => setDrawerOpen(true)}
      className="relative grid h-11 w-11 place-items-center rounded-full text-fg transition-colors hover:bg-white/5 hover:text-lime"
      aria-label={`Open cart, ${hydrated ? count : 0} item${count === 1 ? "" : "s"}`}
    >
      <motion.span key={bump} animate={bump ? { rotate: [0, -14, 10, 0], scale: [1, 1.15, 1] } : {}} transition={{ duration: 0.5 }}>
        <ShoppingBag className="h-5 w-5" aria-hidden />
      </motion.span>
      {hydrated && count > 0 && (
        <motion.span
          key={`c${count}`}
          initial={{ scale: 0.4 }}
          animate={{ scale: 1 }}
          className="absolute right-0.5 top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-lime px-1 text-[0.65rem] font-bold text-ink"
          aria-hidden
        >
          {count}
        </motion.span>
      )}
    </button>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { wishlist, hydrated } = useStore();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement))) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const transparent = pathname === "/" && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={cx(
          "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          transparent
            ? "border-b border-transparent bg-transparent"
            : "border-b border-line/70 bg-ink/85 backdrop-blur-xl",
        )}
      >
        <nav aria-label="Main" className="mx-auto flex h-[var(--header-h)] max-w-[1440px] items-center gap-6 px-4 sm:px-6 lg:px-10">
          <Logo />
          <ul className="ml-6 hidden items-center gap-7 xl:flex">
            <NavLinks />
          </ul>
          <div className="ml-auto flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full text-fg transition-colors hover:bg-white/5 hover:text-lime"
              aria-label="Search products"
            >
              <Search className="h-5 w-5" aria-hidden />
            </button>
            <Link
              href="/account"
              className="hidden h-11 w-11 place-items-center rounded-full text-fg transition-colors hover:bg-white/5 hover:text-lime sm:grid"
              aria-label="Account"
            >
              <User className="h-5 w-5" aria-hidden />
            </Link>
            <Link
              href="/wishlist"
              className="relative hidden h-11 w-11 place-items-center rounded-full text-fg transition-colors hover:bg-white/5 hover:text-lime sm:grid"
              aria-label={`Wishlist, ${hydrated ? wishlist.length : 0} saved`}
            >
              <Heart className="h-5 w-5" aria-hidden />
              {hydrated && wishlist.length > 0 && (
                <span aria-hidden className="absolute right-2 top-2 h-2 w-2 rounded-full bg-lime" />
              )}
            </Link>
            <CartButton />
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="ml-1 grid h-11 w-11 place-items-center rounded-full border border-line text-fg xl:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink/98 pt-[calc(var(--header-h)+2.25rem)] backdrop-blur-xl xl:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.04 } } }}
              className="flex flex-col px-6 pb-10 pt-6"
            >
              {[...navLinks, { label: "Wishlist", href: "/wishlist" }, { label: "Account", href: "/account" }, { label: "Buying Guides", href: "/guides" }].map((l) => (
                <motion.li
                  key={l.href}
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                  className="border-b border-line"
                >
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={pathname === l.href ? "page" : undefined}
                    className={cx(
                      "flex min-h-14 items-center justify-between font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight",
                      pathname === l.href ? "text-lime" : "text-fg",
                    )}
                  >
                    {l.label}
                    <span aria-hidden className="text-sm text-muted">→</span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <div className="px-6 pb-12 text-sm text-muted">
              <p>{store.contact.email}</p>
              <p className="mt-1">{store.contact.hours}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Suspense fallback={null}>
        <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      </Suspense>
    </>
  );
}
