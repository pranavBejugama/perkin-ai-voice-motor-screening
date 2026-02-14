interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { num: 1, label: 'Consent' },
  { num: 2, label: 'Instructions' },
  { num: 3, label: 'Recording' },
  { num: 4, label: 'Processing' },
  { num: 5, label: 'Results' },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-6 py-4">
        <div className="flex items-center">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step.num ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {currentStep > step.num ? '\u2713' : step.num}
                </div>
                <span className={`text-xs mt-1 font-medium ${currentStep >= step.num ? 'text-slate-800' : 'text-slate-400'}`}>
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 rounded ${currentStep > step.num ? 'bg-blue-600' : 'bg-slate-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
