'use client';

import { useState, type FormEvent } from 'react';
import { CLIENT_PROFILE } from '@/lib/client-profile';

type Status = 'idle' | 'sending' | 'success' | 'error';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const inputClass =
  'w-full rounded-lg border-[1.5px] border-ink/15 bg-white px-3 py-2.5 text-sm text-ink transition-colors focus:border-coast focus:outline-none focus:ring-2 focus:ring-coast/20';
const labelClass = 'mb-1.5 block text-xs font-semibold text-ink/80';

export function GroupInquiryForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus('sending');

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'groups_form_submit', {
        event_category: 'Group Inquiry',
        event_label: String(data.get('Activity Interest') ?? ''),
      });
    }
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', { content_name: 'Group Quote Inquiry' });
    }

    try {
      const res = await fetch(CLIENT_PROFILE.formspreeEndpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
        <p className="font-display text-lg font-semibold text-coast">
          ✓ Request received — we'll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-7 shadow-lg ring-1 ring-ink/5">
      <h2 className="font-display text-2xl text-coast-900">Request a Group Quote</h2>
      <p className="mt-1 text-sm text-ink/70">We respond within 24 hours, Monday–Friday.</p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="gi-name">
              Name *
            </label>
            <input id="gi-name" name="Name" type="text" required className={inputClass} placeholder="Jane Smith" />
          </div>
          <div>
            <label className={labelClass} htmlFor="gi-company">
              Company *
            </label>
            <input id="gi-company" name="Company" type="text" required className={inputClass} placeholder="Acme Corp" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="gi-email">
              Email *
            </label>
            <input id="gi-email" name="Email" type="email" required className={inputClass} placeholder="jane@company.com" />
          </div>
          <div>
            <label className={labelClass} htmlFor="gi-phone">
              Phone *
            </label>
            <input id="gi-phone" name="Phone" type="tel" required className={inputClass} placeholder="(831) 000-0000" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="gi-groupsize">
              Estimated Group Size *
            </label>
            <select id="gi-groupsize" name="Group Size" required className={inputClass} defaultValue="">
              <option value="" disabled>
                Select…
              </option>
              <option>12–25 people</option>
              <option>26–50 people</option>
              <option>51–100 people</option>
              <option>101–200 people</option>
              <option>200+ — just tell us</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="gi-date">
              Event Date *
            </label>
            <input id="gi-date" name="Event Date" type="date" required className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="gi-activity">
            Activity Interest *
          </label>
          <select id="gi-activity" name="Activity Interest" required className={inputClass} defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            <option>Adventure</option>
            <option>Team Building</option>
            <option>Both</option>
            <option>Not Sure Yet</option>
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="gi-venue">
            Hotel / Venue *
          </label>
          <input
            id="gi-venue"
            name="Hotel / Venue"
            type="text"
            required
            className={inputClass}
            placeholder="Monterey Marriott, etc."
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="gi-notes">
            Notes <span className="text-ink/40">(optional)</span>
          </label>
          <textarea
            id="gi-notes"
            name="Notes"
            rows={3}
            className={`${inputClass} resize-y`}
            placeholder="Preferred activities, special requests, budget questions…"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          data-intent="quote"
          className="w-full rounded-lg bg-sunset py-3.5 font-bold text-white transition-colors hover:bg-sunset-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Request a Group Quote'}
        </button>

        {status === 'error' ? (
          <p className="text-center text-xs text-red-600">
            Something went wrong. Please call {CLIENT_PROFILE.contact.teamBuildingSalesPhoneDisplay} or
            email {CLIENT_PROFILE.contact.mainEmail}.
          </p>
        ) : (
          <p className="text-center text-xs text-ink/50">We respond within 24 hours, Mon–Fri.</p>
        )}
      </form>
    </div>
  );
}
