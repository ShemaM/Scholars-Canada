import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black font-serif mb-4">Terms of Service</h1>
            <p className="text-blue-100">Last Updated: January 2026</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 mb-8">
                Welcome to Mulenge Scholars&apos; Network Canada (MSNC). By accessing or using our website 
                and services, you agree to be bound by these Terms of Service.
              </p>
              
              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-600 mb-4">
                By accessing and using the MSNC website and services, you acknowledge that you have read, 
                understood, and agree to be bound by these terms. If you do not agree to these terms, 
                please do not use our services.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Membership</h2>
              <p className="text-slate-600 mb-4">
                Membership in MSNC is open to individuals who share our values and mission. By becoming a member, you agree to:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
                <li>Provide accurate and truthful information</li>
                <li>Respect other members and maintain a supportive community environment</li>
                <li>Use the network for legitimate educational and professional purposes</li>
                <li>Not engage in any discriminatory, harmful, or illegal activities</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Code of Conduct</h2>
              <p className="text-slate-600 mb-4">
                All members and participants are expected to:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
                <li>Treat all individuals with respect and dignity</li>
                <li>Maintain confidentiality of personal information shared within the network</li>
                <li>Contribute positively to the community</li>
                <li>Report any violations or concerns to MSNC leadership</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Intellectual Property</h2>
              <p className="text-slate-600 mb-4">
                All content on this website, including text, graphics, logos, and images, is the property 
                of MSNC or its content suppliers and is protected by copyright and other intellectual property laws. 
                You may not reproduce, distribute, or create derivative works without our express written consent.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. User Content</h2>
              <p className="text-slate-600 mb-4">
                By submitting content to MSNC (such as testimonials, feedback, or forum posts), you grant us 
                a non-exclusive, royalty-free license to use, display, and distribute such content for 
                organizational purposes. You are responsible for ensuring your content does not violate 
                any third-party rights.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. Limitation of Liability</h2>
              <p className="text-slate-600 mb-4">
                MSNC provides information and services on an &quot;as is&quot; basis. While we strive to provide 
                accurate and helpful information, we do not guarantee specific outcomes from participation 
                in our programs. MSNC is not liable for any direct, indirect, or consequential damages 
                arising from use of our services.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">7. Changes to Terms</h2>
              <p className="text-slate-600 mb-4">
                We reserve the right to modify these terms at any time. Changes will be posted on this page 
                with an updated revision date. Continued use of our services after changes constitutes 
                acceptance of the new terms.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">8. Contact Information</h2>
              <p className="text-slate-600 mb-4">
                If you have questions about these terms, please contact us at:
              </p>
              <p className="text-slate-600 mb-4">
                <strong>Email:</strong> info@msncanada.org
              </p>

              <div className="mt-12 pt-8 border-t border-slate-200">
                <Link 
                  href="/contact" 
                  className="text-blue-700 font-bold hover:text-blue-800 transition-colors"
                >
                  Contact Us →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}