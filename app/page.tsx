import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-4">
            Voice Motor Intelligence
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Personalized voice analysis for Parkinson&apos;s-focused screening. Understand your speech patterns and track changes over time.
          </p>
          <ul className="space-y-3 mb-8">
            {['Track speech rate and clarity', 'Monitor voice changes over time', 'Get insights within minutes'].map((item) => (
              <li key={item} className="flex items-center gap-3 text-slate-700">
                <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/consent"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Get Support Now
            <span className="text-lg">→</span>
          </Link>
        </div>
        <div className="bg-slate-100 rounded-2xl p-8 border border-slate-200">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">5 min</div>
            <div className="text-sm text-slate-600 mb-4">Complete screening</div>
            <div className="flex flex-wrap gap-2">
              {['Speech Rate', 'Pause Patterns', 'Pitch Variance'].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { title: 'Reduces uncertainty', desc: 'Track voice metrics over time to understand patterns and changes.', metric: '79%' },
          { title: 'Quick insights', desc: 'Get screening results within minutes. No lengthy wait times.', metric: '5 min' },
          { title: 'Clinician-ready', desc: 'Reports designed for healthcare provider review and follow-up.', metric: 'Export' },
        ].map((card) => (
          <div key={card.title} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-blue-600 mb-2">{card.metric}</div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{card.title}</h3>
            <p className="text-slate-600 text-sm">{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12">
        <h3 className="font-semibold text-amber-900 mb-2">Screening tool only</h3>
        <p className="text-sm text-amber-800">
          This is not a diagnostic device. Results must be reviewed by qualified healthcare professionals.
        </p>
      </div>

      <div className="text-center">
        <Link href="/history" className="text-blue-600 hover:text-blue-800 font-medium">
          View Previous Sessions
        </Link>
      </div>
    </div>
  );
}
