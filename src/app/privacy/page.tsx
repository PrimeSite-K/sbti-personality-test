'use client'

import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-dark-500 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          Privacy Policy
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
          <p><strong>Last Updated:</strong> April 10, 2026</p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Information We Collect</h2>
            <p>
              SBTI Personality Test ("we", "our", or "us") collects the following information when you use our website:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Test Responses:</strong> Your answers to personality test questions are processed locally in your browser and are not stored on our servers.</li>
              <li><strong>Usage Data:</strong> We collect anonymous usage statistics through Google Analytics to improve our service.</li>
              <li><strong>Device Information:</strong> Browser type, device type, and IP address for security and analytics purposes.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Cookies and Tracking</h2>
            <p>We use cookies and similar tracking technologies for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google AdSense:</strong> To display personalized advertisements</li>
              <li><strong>Google Analytics:</strong> To analyze website traffic and user behavior</li>
              <li><strong>Language Preference:</strong> To remember your language selection</li>
            </ul>
            <p>
              By using our website, you consent to the use of cookies in accordance with this policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google AdSense:</strong> For displaying advertisements. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Google's Privacy Policy</a></li>
              <li><strong>Google Analytics:</strong> For website analytics. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Google's Privacy Policy</a></li>
              <li><strong>Vercel:</strong> For website hosting. See <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Vercel's Privacy Policy</a></li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. Children's Privacy</h2>
            <p>
              This website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Your Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access to your personal data</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your data</li>
              <li>Objection to data processing</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:{' '}
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
