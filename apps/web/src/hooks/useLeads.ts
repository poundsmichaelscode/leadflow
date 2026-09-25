"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  ApiError,
  createLead as createLeadRequest,
  getLeads,
} from "@/lib/api";

import type {
  CreateLeadInput,
  Lead,
} from "@/types/lead";

export function useLeads() {
  const [leads, setLeads] =
    useState<Lead[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [formError, setFormError] =
    useState<string | null>(null);

  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getLeads();
      setLeads(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load leads",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchInitialLeads() {
      try {
        const data = await getLeads();

        if (!cancelled) {
          setLeads(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load leads",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchInitialLeads();

    return () => {
      cancelled = true;
    };
  }, []);

  async function addLead(
    input: CreateLeadInput,
  ) {
    setSubmitting(true);
    setFormError(null);
    setSuccessMessage(null);

    try {
      const lead =
        await createLeadRequest(input);

      setLeads((current) => [
        lead,
        ...current,
      ]);

      setSuccessMessage(
        "Lead created successfully.",
      );

      window.setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      if (
        err instanceof ApiError &&
        err.code === "DUPLICATE_EMAIL"
      ) {
        setFormError(
          "A lead with this email already exists.",
        );
      } else {
        setFormError(
          err instanceof Error
            ? err.message
            : "Unable to create lead.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  return {
    leads,
    loading,
    submitting,
    error,
    formError,
    successMessage,
    loadLeads,
    addLead,
  };
}
