'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepIndicator from '@/components/StepIndicator';

export default function ConsentPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      <StepIndicator currentStep={1} />
      <div className="max-w-[800px] mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-200">
            <h1 className="text-2xl font-bold text-slate-900">Informed Consent</h1>
          </div>
          <div className="p-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-5 mb-6">
              <h2 className="text-sm font-semibold text-red-900 mb-2">Medical Disclaimer</h2>
              <p className="text-sm text-red-800">
                Screening tool only. Not a diagnostic device. Results must be reviewed by qualified healthcare professionals.
              </p>
            </div>
            <div className="space-y-5 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">Purpose</h3>
                <p className="text-slate-600 text-sm">Voice motor screening to identify potential speech changes associated with Parkinson&apos;s disease.</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">What to Expect</h3>
                <ul className="text-slate-600 text-sm list-disc list-inside space-y-1">
                  <li>Read passage aloud (30-60 sec)</li>
                  <li>Voice recording via microphone</li>
                  <li>Analysis of voice motor features</li>
                  <li>Screening report with guidance</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">Limitations</h3>
                <ul className="text-slate-600 text-sm list-disc list-inside space-y-1">
                  <li>Not a medical diagnosis</li>
                  <li>Results may vary with equipment</li>
                  <li>Medical consultation required</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-200 pt-6 mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1" />
                <span className="text-sm text-slate-900">I have read and understood. I agree to participate voluntarily. I can stop at any time.</span>
              </label>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => router.push('/')}
                className="px-6 py-3 text-sm font-medium border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
              >
                Decline
              </button>
              <button
                onClick={() => agreed && router.push('/task')}
                disabled={!agreed}
                className={`px-6 py-3 text-sm font-semibold rounded-lg ${agreed ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 text-slate-500 cursor-not-allowed'}`}
              >
                Accept & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
