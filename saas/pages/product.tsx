
"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@clerk/nextjs";
import DatePicker from "react-datepicker";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { Protect, PricingTable, UserButton } from "@clerk/nextjs";

function ConsultationForm() {
    const { getToken } = useAuth();

    const [patientName, setPatientName] = useState("");
    const [visitDate, setVisitDate] = useState<Date | null>(new Date());
    const [notes, setNotes] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        setOutput("");
        setError("");
        setLoading(true);

        const controller = new AbortController();

        try {
            const jwt = await getToken();

            if (!jwt) {
                throw new Error(
                    "Authentication required. Please sign in again."
                );
            }

            let buffer = "";

            await fetchEventSource("/api", {
                signal: controller.signal,
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },

                body: JSON.stringify({
                    patient_name: patientName,
                    date_of_visit: visitDate?.toISOString().slice(0, 10),
                    notes,
                }),

                async onopen(response) {
                    if (!response.ok) {
                        throw new Error(
                            `Request failed (${response.status}). Please try again.`
                        );
                    }

                    const contentType =
                        response.headers.get("content-type");

                    if (!contentType?.includes("text/event-stream")) {
                        throw new Error(
                            "Invalid response format from the server."
                        );
                    }
                },

                onmessage(ev) {
                    if (!ev.data) return;

                    try {
                        const chunk: string = JSON.parse(ev.data);

                        buffer += chunk;
                        setOutput(buffer);
                    } catch (error) {
                        console.error(
                            "Failed to parse SSE message:",
                            error
                        );
                    }
                },

                onclose() {
                    setLoading(false);
                },

                onerror(err) {
                    console.error("SSE error:", err);
                    controller.abort();
                    throw err;
                },
            });

        } catch (err) {
            console.error("Consultation error:", err);

            if (!controller.signal.aborted) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-12 sm:px-8 lg:pt-16">

            {/* Hero Section */}
            <section className="mb-12">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-sm font-medium text-teal-300">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-teal-400" />
                    AI-Powered Healthcare Workspace
                </div>

                <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Smarter consultations.
                    <span className="block bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                        Better patient care.
                    </span>
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                    Transform clinical notes into structured visit summaries,
                    actionable next steps, and patient-friendly communication
                    with AI assistance.
                </p>
            </section>

            {/* Main Workspace */}
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">

                {/* Consultation Form */}
                <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">

                    <div className="mb-8 flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-300">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className="h-6 w-6"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <path d="M8 4h8a2 2 0 0 1 2 2v14H6V6a2 2 0 0 1 2-2Z" />
                                <path d="M9 4V2h6v2M9 10h6M9 14h6M9 18h3" strokeLinecap="round" />
                            </svg>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white">
                                New Consultation
                            </h2>
                            <p className="mt-1 text-sm text-slate-400">
                                Enter the patient's visit information
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Patient Name */}
                        <div className="space-y-2">
                            <label
                                htmlFor="patient"
                                className="text-sm font-medium text-slate-300"
                            >
                                Patient Name
                            </label>

                            <input
                                id="patient"
                                type="text"
                                required
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                                placeholder="Enter patient's full name"
                                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3.5 text-white outline-none transition-all duration-300 placeholder:text-slate-600 hover:border-white/20 focus:border-teal-400/60 focus:ring-4 focus:ring-teal-400/10"
                            />
                        </div>

                        {/* Visit Date */}
                        <div className="space-y-2">
                            <label
                                htmlFor="date"
                                className="text-sm font-medium text-slate-300"
                            >
                                Date of Visit
                            </label>

                            <DatePicker
                                id="date"
                                selected={visitDate}
                                onChange={(date: Date | null) =>
                                    setVisitDate(date)
                                }
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select visit date"
                                required
                                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3.5 text-white outline-none transition-all duration-300 placeholder:text-slate-600 hover:border-white/20 focus:border-teal-400/60 focus:ring-4 focus:ring-teal-400/10"
                            />
                        </div>

                        {/* Consultation Notes */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="notes"
                                    className="text-sm font-medium text-slate-300"
                                >
                                    Consultation Notes
                                </label>

                                <span className="text-xs text-slate-500">
                                    Clinical information
                                </span>
                            </div>

                            <textarea
                                id="notes"
                                required
                                rows={8}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Describe symptoms, examination findings, observations, and other relevant visit details..."
                                className="w-full resize-y rounded-xl border border-white/10 bg-slate-900/70 px-4 py-4 text-sm leading-7 text-white outline-none transition-all duration-300 placeholder:text-slate-600 hover:border-white/20 focus:border-teal-400/60 focus:ring-4 focus:ring-teal-400/10"
                            />

                            <p className="text-xs leading-5 text-slate-500">
                                Only enter information you are authorized to process.
                                AI-generated content must be reviewed by a doctor.
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div
                                role="alert"
                                className="rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300"
                            >
                                {error}
                            </div>
                        )}

                        {/* Generate Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-4 font-semibold text-slate-950 shadow-lg shadow-teal-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-teal-500/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                        >
                            {loading ? (
                                <>
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-900/30 border-t-slate-950" />
                                    Generating Summary...
                                </>
                            ) : (
                                <>
                                    Generate Consultation Summary
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            d="M5 12h14m-6-6 6 6-6 6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>
                </section>

                {/* Results Panel */}
                <section className="flex min-h-[420px] flex-col rounded-3xl border border-white/10 bg-gradient-to-br from-teal-400/[0.07] to-blue-500/[0.04] p-6 backdrop-blur-xl sm:p-8">

                    <div className="mb-8 flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className="h-6 w-6"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <path
                                    d="M4 5h16v14H4zM8 9h8M8 13h8M8 17h4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white">
                                AI Consultation Report
                            </h2>
                            <p className="mt-1 text-sm text-slate-400">
                                Your generated clinical summary
                            </p>
                        </div>
                    </div>

                    {!output && !loading && (
                        <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
                            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-teal-400/20 bg-teal-400/5">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="h-10 w-10 text-teal-300/70"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                >
                                    <path
                                        d="M12 3v4m0 10v4M3 12h4m10 0h4M5.64 5.64l2.83 2.83m7.06 7.06 2.83 2.83m0-12.72-2.83 2.83m-7.06 7.06-2.83 2.83"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>

                            <h3 className="text-lg font-semibold text-slate-200">
                                Your report starts here
                            </h3>

                            <p className="mt-3 max-w-xs text-sm leading-7 text-slate-500">
                                Complete the consultation form and generate an
                                AI-assisted report. Your results will appear here.
                            </p>
                        </div>
                    )}

                    {loading && !output && (
                        <div className="flex flex-1 flex-col items-center justify-center py-12">
                            <div className="relative mb-6 h-16 w-16">
                                <div className="absolute inset-0 animate-ping rounded-full bg-teal-400/20" />
                                <div className="absolute inset-2 animate-spin rounded-full border-2 border-teal-400/20 border-t-teal-400" />
                            </div>

                            <p className="font-medium text-teal-300">
                                Analyzing consultation notes...
                            </p>

                            <p className="mt-2 text-sm text-slate-500">
                                Generating your report
                            </p>
                        </div>
                    )}

                    {output && (
                        <div className="animate-[fadeIn_0.5s_ease-out] overflow-y-auto">
                            <div className="mb-5 flex items-center gap-2 rounded-lg border border-teal-400/20 bg-teal-400/10 px-3 py-2 text-xs font-medium text-teal-300">
                                <span className="h-2 w-2 rounded-full bg-teal-400" />
                                AI report generated
                            </div>

                            <div className="prose prose-invert prose-sm max-w-none prose-headings:font-semibold prose-headings:text-teal-200 prose-p:leading-7 prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white prose-a:text-cyan-300 prose-hr:border-white/10">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm, remarkBreaks]}
                                >
                                    {output}
                                </ReactMarkdown>
                            </div>
                        </div>
                    )}

                    <div className="mt-auto border-t border-white/10 pt-5">
                        <p className="text-xs leading-6 text-slate-500">
                            AI-generated content is for professional assistance
                            only. Always verify the report before using it in
                            patient care.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default function Product() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#07111f]">

            {/* Background Effects */}
            <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-teal-500/10 blur-[120px]" />
            <div className="pointer-events-none absolute -right-40 top-80 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

            {/* Navigation */}
            <nav className="relative z-10 border-b border-white/[0.08] bg-[#07111f]/70 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">

                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 text-slate-950 shadow-lg shadow-teal-500/20">
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
                            <span className="block text-lg font-bold tracking-tight text-white">
                                Clinova
                            </span>
                            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                                Intelligent Healthcare
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="hidden text-sm text-slate-400 sm:block">
                            Professional Workspace
                        </span>
                        <UserButton showName={true} />
                    </div>
                </div>
            </nav>

            {/* Subscription Protection */}
            <Protect
                plan="premium_subscription"
                fallback={
                    <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8">
                        <div className="mb-12 text-center">
                            <span className="mb-5 inline-block rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-sm text-teal-300">
                                Premium Access
                            </span>

                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                                Elevate your
                                <span className="block bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">
                                    healthcare workflow.
                                </span>
                            </h1>

                            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-400">
                                Unlock AI-powered consultation summaries and
                                streamline your clinical workflow.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur-xl sm:p-8">
                            <PricingTable />
                        </div>
                    </div>
                }
            >
                <div className="relative z-10">
                    <ConsultationForm />
                </div>
            </Protect>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/[0.08] px-5 py-7 text-center">
                <p className="text-xs text-slate-500">
                    © {new Date().getFullYear()} Clinova. AI-assisted healthcare workspace.
                </p>
            </footer>
        </main>
    );
}
