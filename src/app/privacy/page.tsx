import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black font-serif mb-4">Privacy Policy</h1>
            <p className="text-blue-100">Last Updated: January 2026</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 mb-8">
                At Mulenge Scholars&apos; Network Canada (MSNC), we are committed to protecting your privacy. 
                This policy outlines how we collect, use, and safeguard your personal information.
              </p>
              
              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Information We Collect</h2>
              <p className="text-slate-600 mb-4">
                We collect information you provide directly to us when you:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
                <li>Register as a member of MSNC</li>
                <li>Sign up for our newsletter or events</li>
                <li>Contact us with inquiries or feedback</li>
                <li>Participate in our programs or activities</li>
              </ul>
              <p className="text-slate-600 mb-4">
                This information may include your name, email address, phone number, location, 
                educational background, and areas of interest.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. How We Use Your Information</h2>
              <p className="text-slate-600 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
                <li>Provide and improve our programs and services</li>
                <li>Communicate with you about events, opportunities, and updates</li>
                <li>Match mentors with mentees appropriately</li>
                <li>Respond to your inquiries and requests</li>
                <li>Analyze usage patterns to improve our website and services</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Information Sharing</h2>
              <p className="text-slate-600 mb-4">
                We do not sell, trade, or rent your personal information to third parties. 
                We may share information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
                <li>With your consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect the rights and safety of MSNC and our community</li>
                <li>With service providers who assist in our operations (under strict confidentiality)</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Data Security</h2>
              <p className="text-slate-600 mb-4">
                We implement appropriate technical and organizational security measures to protect 
                your personal information against unauthorized access, alteration, disclosure, or destruction. 
                This includes encryption, secure servers, and regular security assessments.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Your Rights</h2>
              <p className="text-slate-600 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt out of communications at any time</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. Contact Us</h2>
              <p className="text-slate-600 mb-4">
                If you have questions about this privacy policy or our data practices, please contact us at:
              </p>
              <p className="text-slate-600 mb-4">
                <strong>Email:</strong> privacy@msncanada.org
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