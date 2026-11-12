
"use client";

import Link from "next/link";
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";

const features = [
    {
        number: "01",
        title: "Clinical Summaries",
        description:
            "Transform unstructured consultation notes into clear, organized clinical summaries.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
                <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
                <path d="M14 3v5h5M9 13h6M9 17h6" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        number: "02",
        title: "Actionable Next Steps",
        description:
            "Generate structured follow-up points to help organize the next steps after each consultation.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
                <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 12a9 9 0 1 1-5.5-8.3" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        number: "03",
        title: "Patient Communication",
        description:
            "Create clear, patient-friendly email drafts based on the consultation information.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
];

export default function Home() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#07111f] text-white">

            {/* Background Effects */}
            <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-teal-500/10 blur-[130px]" />
            <div className="pointer-events-none absolute -right-40 top-80 h-96 w-96 rounded-full bg-blue-500/10 blur-[130px]" />
            <div className="pointer-events-none absolute left-1/2 top-[550px] h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/[0.05] blur-[120px]" />

            {/* Navigation */}
            <nav className="relative z-20 border-b border-white/[0.08] bg-[#07111f]/70 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">

                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 text-slate-950 shadow-lg shadow-teal-500/20">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className="h-6 w-6"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M12 3v18M3 12h18" strokeLinecap="round" />
                            </svg>
                        </div>

                        <div>
                            <span className="block text-xl font-bold tracking-tight text-white">
                                Clinova
                            </span>
                            <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-slate-500">
                                Intelligent Healthcare
                            </span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-3">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-teal-400/40 hover:bg-teal-400/5 hover:text-white">
                                    Sign In
                                </button>
                            </SignInButton>
                        </SignedOut>

                        <SignedIn>
                            <Link
                                href="/product"
                                className="rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:brightness-110"
                            >
                                Open Workspace
                            </Link>
                            <UserButton showName={true} />
                        </SignedIn>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-24 sm:px-8 sm:pt-32">

                <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">

                    {/* Hero Content */}
                    <div>
                        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/[0.07] px-4 py-2 text-xs font-medium tracking-wide text-teal-300">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-teal-400" />
                            AI-POWERED CLINICAL WORKSPACE
                        </div>

                        <h1 className="max-w-3xl text-5xl font-bold leading-[1.12] tracking-tight text-white sm:text-6xl lg:text-7xl">
                            Smarter Clinical Workflows.
                            <span className="mt-3 block bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                                Better Patient Communication.
                            </span>
                        </h1>

                        <p className="mt-8 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
                            Turn clinical consultation notes into structured
                            summaries, actionable next steps, and
                            patient-friendly communication with AI assistance.
                        </p>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="group flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-7 py-4 font-semibold text-slate-950 shadow-lg shadow-teal-500/20 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/30">
                                        Get Started
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            className="h-5 w-5 transition-transform group-hover:translate-x-1"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </SignInButton>

                                <a
                                    href="#features"
                                    className="flex items-center justify-center rounded-xl border border-white/10 px-7 py-4 font-medium text-slate-300 transition hover:border-teal-400/30 hover:bg-white/[0.04]"
                                >
                                    Explore Features
                                </a>
                            </SignedOut>

                            <SignedIn>
                                <Link
                                    href="/product"
                                    className="group flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-7 py-4 font-semibold text-slate-950 shadow-lg shadow-teal-500/20 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/30"
                                >
                                    Open Consultation Workspace
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="h-5 w-5 transition-transform group-hover:translate-x-1"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </SignedIn>
                        </div>

                        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-slate-500">
                            <span className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                                AI-assisted documentation
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                                Structured clinical output
                            </span>
                        </div>
                    </div>

                    {/* Product Preview */}
                    <div className="relative mx-auto w-full max-w-lg">

                        <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-teal-400/10 to-blue-500/10 blur-2xl" />

                        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d1b2b]/90 shadow-2xl shadow-black/40 backdrop-blur-xl">

                            {/* Preview Header */}
                            <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-400/10 text-teal-300">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                                            <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
                                            <path d="M14 3v5h5M9 13h6M9 17h6" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">
                                            Consultation Report
                                        </p>
                                        <p className="text-[11px] text-slate-500">
                                            AI-generated preview
                                        </p>
                                    </div>
                                </div>

                                <span className="rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1 text-[10px] font-medium text-teal-300">
                                    PREVIEW
                                </span>
                            </div>

                            {/* Preview Content */}
                            <div className="space-y-6 p-6">

                                <div>
                                    <div className="mb-3 flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-teal-400" />
                                        <h3 className="text-sm font-semibold text-teal-200">
                                            Clinical Summary
                                        </h3>
                                    </div>

                                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
                                        <div className="mb-3 h-2.5 w-4/5 rounded-full bg-slate-600/50" />
                                        <div className="mb-3 h-2 w-full rounded-full bg-slate-700/50" />
                                        <div className="mb-3 h-2 w-11/12 rounded-full bg-slate-700/50" />
                                        <div className="h-2 w-3/5 rounded-full bg-slate-700/50" />
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-3 flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-cyan-400" />
                                        <h3 className="text-sm font-semibold text-cyan-200">
                                            Next Steps
                                        </h3>
                                    </div>

                                    <div className="space-y-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-teal-400/10 text-teal-300">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                                                    <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                            <div className="h-2 w-4/5 rounded-full bg-slate-600/50" />
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span className="h-5 w-5 rounded-md border border-white/10" />
                                            <div className="h-2 w-3/5 rounded-full bg-slate-700/50" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-3 flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-blue-400" />
                                        <h3 className="text-sm font-semibold text-blue-200">
                                            Patient Communication
                                        </h3>
                                    </div>

                                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
                                        <div className="mb-3 h-2 w-2/3 rounded-full bg-slate-600/50" />
                                        <div className="mb-2 h-2 w-full rounded-full bg-slate-700/50" />
                                        <div className="h-2 w-4/5 rounded-full bg-slate-700/50" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between rounded-xl border border-teal-400/15 bg-teal-400/[0.06] px-4 py-3">
                                    <span className="text-xs text-slate-300">
                                        AI-assisted report preview
                                    </span>
                                    <span className="text-xs font-medium text-teal-300">
                                        Clinova
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Floating Accent */}
                        <div className="absolute -right-4 top-1/4 hidden rounded-2xl border border-white/10 bg-[#102235] p-4 shadow-xl sm:block">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                                        <path d="M12 3v18M3 12h18" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-white">
                                        AI Assistant
                                    </p>
                                    <p className="text-[10px] text-teal-300">
                                        Ready to assist
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section
                id="features"
                className="relative z-10 border-t border-white/[0.07] bg-white/[0.015] px-5 py-24 sm:px-8"
            >
                <div className="mx-auto max-w-7xl">

                    <div className="mb-14 max-w-2xl">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
                            WHAT CLINOVA OFFERS
                        </span>

                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Everything you need for
                            <span className="block text-teal-300">
                                smarter documentation.
                            </span>
                        </h2>

                        <p className="mt-5 leading-8 text-slate-400">
                            A streamlined AI-assisted workflow that helps
                            transform consultation information into organized
                            clinical documentation and communication drafts.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {features.map((feature) => (
                            <div
                                key={feature.number}
                                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7 transition duration-300 hover:-translate-y-1 hover:border-teal-400/30 hover:bg-white/[0.045]"
                            >
                                <div className="mb-8 flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300 transition group-hover:bg-teal-400/15">
                                        {feature.icon}
                                    </div>

                                    <span className="text-xs font-medium tracking-widest text-slate-600">
                                        {feature.number}
                                    </span>
                                </div>

                                <h3 className="text-lg font-semibold text-white">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-400">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative z-10 px-5 py-24 sm:px-8">
                <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-teal-400/15 bg-gradient-to-br from-teal-400/[0.10] via-[#102235] to-blue-500/[0.08] px-6 py-16 text-center sm:px-12">

                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
                        GET STARTED WITH CLINOVA
                    </span>

                    <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Make clinical documentation more organized.
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl leading-8 text-slate-400">
                        Explore an AI-assisted approach to consultation
                        summaries and patient communication.
                    </p>

                    <div className="mt-9">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-4 font-semibold text-slate-950 shadow-lg shadow-teal-500/20 transition hover:-translate-y-1 hover:brightness-110">
                                    Get Started
                                </button>
                            </SignInButton>
                        </SignedOut>

                        <SignedIn>
                            <Link
                                href="/product"
                                className="inline-flex rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-4 font-semibold text-slate-950 shadow-lg shadow-teal-500/20 transition hover:-translate-y-1 hover:brightness-110"
                            >
                                Go to Consultation Workspace
                            </Link>
                        </SignedIn>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/[0.08] px-5 py-8 sm:px-8">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
                    <div>
                        <p className="font-semibold text-white">
                            Clinova
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            Smarter Clinical Workflows. Better Patient Communication.
                        </p>
                    </div>

                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} Clinova. AI-assisted healthcare workspace.
                    </p>
                </div>
            </footer>
        </main>
    );
}
