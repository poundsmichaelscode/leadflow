"use client";

import {
  type FormEvent,
  useState,
} from "react";

import {
  leadStatuses,
  type CreateLeadInput,
  type LeadStatus,
} from "@/types/lead";

interface LeadFormProps {
  onSubmit: (
    input: CreateLeadInput,
  ) => Promise<void>;

  submitting: boolean;

  serverError?: string | null;
}

interface FormErrors {
  name?: string;
  email?: string;
  status?: string;
}

export function LeadForm({
  onSubmit,
  submitting,
  serverError,
}: LeadFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [status, setStatus] =
    useState<LeadStatus>("New");

  const [errors, setErrors] =
    useState<FormErrors>({});

  function validate() {
    const nextErrors: FormErrors = {};

    if (name.trim().length < 2) {
      nextErrors.name =
        "Name must be at least 2 characters";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.trim(),
      )
    ) {
      nextErrors.email =
        "Enter a valid email address";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    await onSubmit({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      status,
    });

    setName("");
    setEmail("");
    setStatus("New");
    setErrors({});
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-lg font-semibold text-slate-950">
          Add lead
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Add a new prospect to your pipeline.
        </p>
      </div>

      <div className="mt-6 grid gap-5">
        <div>
          <label
            htmlFor="name"
            className="text-sm font-medium text-slate-700"
          >
            Name
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="John Doe"
            disabled={submitting}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-950 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200 disabled:bg-slate-50"
          />

          {errors.name ? (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-slate-700"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="john@example.com"
            disabled={submitting}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-950 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200 disabled:bg-slate-50"
          />

          {errors.email ? (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="status"
            className="text-sm font-medium text-slate-700"
          >
            Status
          </label>

          <select
            id="status"
            value={status}
            disabled={submitting}
            onChange={(event) =>
              setStatus(
                event.target.value as LeadStatus,
              )
            }
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
          >
            {leadStatuses.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        {serverError ? (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {serverError}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting
            ? "Adding lead..."
            : "Add Lead"}
        </button>
      </div>
    </form>
  );
}
