'use client'

import Link from 'next/link'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-dark-500 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          Terms of Service
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
          <p><strong>Last Updated:</strong> April 10, 2026</p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the SBTI Personality Test website ("Service"), you accept and agree to be bound 
              by these Terms of Service. If you do not agree to these terms, please do not use our Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Use of Service</h2>
            <p>You agree to use our Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Service in any way that violates applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Collect or harvest any information from the Service without permission</li>
              <li>Reproduce, duplicate, copy, sell, or exploit any portion of the Service without express permission</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are owned by SBTI Personality Test 
              and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              Original content from this test is attributed to Bilibili creator 蛆肉儿串儿 (UID: 417038183). 
              This website is an adaptation and is not intended for commercial profit.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Advertisements</h2>
            <p>
              The Service displays advertisements through Google AdSense. By using the Service, you agree to the display 
              of such advertisements. We are not responsible for the content of third-party advertisements.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. User Data</h2>
            <p>
              We do not permanently store your test responses. All test data is processed locally in your browser. 
              For more information, please see our <Link href="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</Link>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Disclaimer of Warranties</h2>
            <p>
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, 
              either express or implied. We do not warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The Service will be uninterrupted or error-free</li>
              <li>The results will be accurate or reliable</li>
              <li>The Service will meet your specific requirements</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">7. Limitation of Liability</h2>
            <p>
              In no event shall SBTI Personality Test be liable for any indirect, incidental, special, consequential, 
              or punitive damages resulting from your use or inability to use the Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">8. Age Restriction</h2>
            <p>
              The Service is not intended for users under 13 years of age. By using the Service, you represent that 
              you are at least 13 years old.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">9. Modifications to Service</h2>
            <p>
              We reserve the right to modify or discontinue the Service at any time without notice. We shall not be 
              liable to you or any third party for any modification, suspension, or discontinuance of the Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. 
              Your continued use of the Service after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to 
              conflict of law provisions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">12. Contact</h2>
            <p>
              For questions about these Terms, please contact us at:{' '}
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
