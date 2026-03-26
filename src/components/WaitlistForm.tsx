import React, { useState } from 'react';
import { ArrowIcon, CheckIcon } from './ui/Icons';

export const WaitlistForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
  });

  const [formState, setFormState] = useState({
    isLoading: false,
    isSuccess: false,
    error: null as string | null,
  });

  const [activeField, setActiveField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ isLoading: true, isSuccess: false, error: null });

    setTimeout(() => {
      setFormState({ isLoading: false, isSuccess: true, error: null });
    }, 1200);
  };

  const labelClasses = (field: string) =>
    `mb-1 block font-label text-[11px] font-black uppercase tracking-[0.24em] ${
      activeField === field ? 'text-secondary' : 'text-on-surface-variant'
    }`;

  const inputClasses = (field: string) =>
    `w-full border-0 border-b bg-transparent pb-3 pt-4 font-body text-base text-primary placeholder:text-outline/70 transition-colors outline-none ${
      activeField === field ? 'border-secondary-container' : 'border-outline-variant/35'
    }`;

  if (formState.isSuccess) {
    return (
      <div className="editorial-shadow ghost-border animate-fade-in mx-auto w-full max-w-2xl rounded-[1.75rem] bg-surface-container-lowest p-10 md:p-12">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-container/20 text-secondary">
            <CheckIcon className="h-8 w-8" />
          </div>
          <p className="mb-3 font-label text-[11px] font-black uppercase tracking-[0.26em] text-secondary">
            Submission Received
          </p>
          <h3 className="mb-4 font-headline text-3xl font-black tracking-[-0.03em] text-primary">
            We will reach out when the beta is live.
          </h3>
          <p className="mb-8 max-w-md text-base leading-relaxed text-on-surface-variant">
            Your details are in. We&apos;ll follow up with beta access and next steps.
          </p>
          <button
            onClick={() => setFormState({ ...formState, isSuccess: false })}
            className="font-label text-xs font-black uppercase tracking-[0.24em] text-primary underline decoration-secondary-container underline-offset-4 transition-colors hover:text-secondary"
          >
            Submit another response
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="editorial-shadow ghost-border mx-auto w-full max-w-2xl rounded-[1.75rem] bg-surface-container-lowest p-8 md:p-10"
    >
      <div className="mb-8">
        <p className="mb-3 font-label text-[11px] font-black uppercase tracking-[0.26em] text-secondary-container">
          Get Early Access
        </p>
        <h3 className="mb-3 font-headline text-3xl font-black tracking-[-0.03em] text-primary">
          Join the Bidfast beta.
        </h3>
        <p className="max-w-xl text-base leading-relaxed text-on-surface-variant">
          Tell us about your work and we&apos;ll reach out with beta access and a walkthrough of the platform.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="name" className={labelClasses('name')}>
            Full Name
          </label>
          <input
            required
            type="text"
            name="name"
            id="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setActiveField('name')}
            onBlur={() => setActiveField(null)}
            className={inputClasses('name')}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses('email')}>
            Email Address
          </label>
          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="john@company.ca"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setActiveField('email')}
            onBlur={() => setActiveField(null)}
            className={inputClasses('email')}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="phone" className={labelClasses('phone')}>
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
              onFocus={() => setActiveField('phone')}
              onBlur={() => setActiveField(null)}
              className={inputClasses('phone')}
            />
          </div>
          <div>
            <label htmlFor="role" className={labelClasses('role')}>
              Role
            </label>
            <input
              type="text"
              name="role"
              id="role"
              placeholder="Estimator"
              value={formData.role}
              onChange={handleChange}
              onFocus={() => setActiveField('role')}
              onBlur={() => setActiveField(null)}
              className={inputClasses('role')}
            />
          </div>
        </div>

        <div>
          <label htmlFor="company" className={labelClasses('company')}>
            Organization
          </label>
          <input
            type="text"
            name="company"
            id="company"
            placeholder="Your Company Name"
            value={formData.company}
            onChange={handleChange}
            onFocus={() => setActiveField('company')}
            onBlur={() => setActiveField(null)}
            className={inputClasses('company')}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={formState.isLoading}
        className="signature-gradient group mt-8 flex w-full items-center justify-center gap-4 rounded-xl px-8 py-4 font-headline text-sm font-black uppercase tracking-[0.14em] text-on-primary transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span>{formState.isLoading ? 'Processing Request' : 'Request Access'}</span>
        <ArrowIcon
          className={`h-5 w-5 transition-transform duration-300 ${
            formState.isLoading ? 'animate-pulse' : 'group-hover:translate-x-1'
          }`}
        />
      </button>
    </form>
  );
};
