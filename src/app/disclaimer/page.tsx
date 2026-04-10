'use client'

import Link from 'next/link'

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-dark-500 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          Disclaimer
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
          <p><strong>Last Updated:</strong> April 10, 2026</p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Entertainment Purposes Only</h2>
            <p>
              The SBTI Personality Test is designed and intended solely for entertainment and self-reflection purposes. 
              This test is <strong>NOT</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>A scientific or clinical psychological assessment</li>
              <li>A diagnostic tool for mental health conditions</li>
              <li>A substitute for professional psychological counseling</li>
              <li>A basis for employment, medical, or legal decisions</li>
              <li>An accurate representation of your personality</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. No Professional Advice</h2>
            <p>
              The results and descriptions provided by this test should not be considered professional advice of any kind. 
              If you are experiencing psychological distress or have concerns about your mental health, please consult a 
              qualified mental health professional.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. Accuracy of Results</h2>
            <p>
              We make no guarantees about the accuracy, reliability, or validity of the test results. Personality is 
              complex and cannot be fully captured by any single test. Your results may vary based on your mood, 
              current life circumstances, and other factors.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Limitation of Liability</h2>
            <p>
              SBTI Personality Test and its creators shall not be held liable for any direct, indirect, incidental, 
              consequential, or punitive damages arising from:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use or misuse of the test</li>
              <li>Reliance on test results</li>
              <li>Actions taken based on test results</li>
              <li>Any emotional distress caused by test results</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. User Responsibility</h2>
            <p>
              By using this website, you acknowledge that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are using the test at your own risk</li>
              <li>You will not use the results for any illegal or harmful purposes</li>
              <li>You understand the entertainment nature of this test</li>
              <li>You are at least 13 years old</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Third-Party Content</h2>
            <p>
              This website may contain links to third-party websites or display third-party advertisements. 
              We are not responsible for the content, accuracy, or practices of any third-party sites or services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">7. Changes to Disclaimer</h2>
            <p>
              We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon posting.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">8. Contact</h2>
            <p>
              For questions about this disclaimer, please contact us at:{' '}
              <a href="mailto:support@sbtinews.com" className="text-cyan-400 hover:underline">
                support@sbtinews.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12">
          <Link href="/" className="text-cyan-400 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
