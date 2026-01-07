'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, GraduationCap, Users, Briefcase, Heart, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { registerMember } from '@/lib/actions';

const membershipTypes = [
  {
    id: 'student',
    title: 'Student',
    icon: GraduationCap,
    description: 'High school or post-secondary students seeking academic guidance and mentorship.',
    benefits: [
      'Academic mentorship access',
      'Study groups and tutoring',
      'Scholarship information',
      'Career exploration workshops',
    ],
  },
  {
    id: 'professional',
    title: 'Professional',
    icon: Briefcase,
    description: 'Working professionals looking to give back or continue their development.',
    benefits: [
      'Networking opportunities',
      'Leadership development',
      'Professional workshops',
      'Community engagement',
    ],
  },
  {
    id: 'mentor',
    title: 'Mentor',
    icon: Users,
    description: 'Experienced individuals ready to guide and support youth in their journey.',
    benefits: [
      'Mentor training program',
      'Mentee matching',
      'Impact tracking',
      'Recognition programs',
    ],
  },
  {
    id: 'supporter',
    title: 'Supporter',
    icon: Heart,
    description: 'Community members and allies who want to support our mission.',
    benefits: [
      'Event invitations',
      'Newsletter updates',
      'Volunteer opportunities',
      'Community gatherings',
    ],
  },
];

const interestOptions = [
  'Academic Support',
  'Career Development',
  'Leadership Training',
  'Cultural Events',
  'Networking',
  'Volunteering',
  'Mentoring',
  'Scholarships',
];

const provinceOptions = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Nova Scotia',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Northwest Territories',
  'Nunavut',
  'Yukon',
];

export default function SubscribePage() {
  const [selectedType, setSelectedType] = useState<string>('student');
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    city: '',
    province: '',
    interests: [] as string[],
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  // Type guard for membership type validation
  const isValidMembershipType = (type: string): type is 'student' | 'professional' | 'mentor' | 'supporter' => {
    return ['student', 'professional', 'mentor', 'supporter'].includes(type);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Validate membership type before submission
    if (!isValidMembershipType(selectedType)) {
      setStatus('error');
      setErrorMessage('Please select a valid membership type.');
      return;
    }

    try {
      const result = await registerMember({
        ...formData,
        membership_type: selectedType,
      });

      if (result.error) {
        setStatus('error');
        setErrorMessage(result.error);
        return;
      }

      setStatus('success');
    } catch (error) {
      console.error('Registration failed:', error);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <main className="min-h-screen bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-black font-serif text-slate-900 mb-4">Welcome to MSNC!</h1>
            <p className="text-xl text-slate-600 mb-8">
              Thank you for joining Mulenge Scholars&apos; Network Canada. 
              You&apos;ll receive a confirmation email shortly with more information about our programs and events.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-full text-lg transition-all"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-amber-400 font-bold uppercase tracking-widest text-sm mb-4 block">Join Us</span>
            <h1 className="text-5xl md:text-6xl font-black font-serif mb-6">Become a Member</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Join our growing network of Mulenge youth, professionals, and supporters. 
              Together, we can build a stronger community.
            </p>
          </div>
        </div>
      </section>

      {/* Membership Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-black font-serif text-slate-900 mb-4 text-center">Choose Your Membership</h2>
            <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Select the membership type that best describes you. All memberships are free.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {membershipTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id)}
                  className={`p-6 rounded-2xl border-2 text-left transition-all ${
                    selectedType === type.id
                      ? 'border-blue-700 bg-blue-50 shadow-lg'
                      : 'border-slate-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 ${
                    selectedType === type.id ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <type.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{type.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{type.description}</p>
                  <ul className="space-y-2">
                    {type.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <Check className={`h-4 w-4 ${selectedType === type.id ? 'text-blue-700' : 'text-slate-400'}`} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>

            {/* Registration Form */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-2xl font-black font-serif text-slate-900 mb-6">Your Information</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">First Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.last_name}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+1 (XXX) XXX-XXXX"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Province</label>
                      <select
                        value={formData.province}
                        onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        <option value="">Select province</option>
                        {provinceOptions.map((province) => (
                          <option key={province} value={province}>{province}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Areas of Interest</label>
                    <div className="flex flex-wrap gap-2">
                      {interestOptions.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                            formData.interests.includes(interest)
                              ? 'bg-blue-700 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-4 rounded-xl">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-blue-700 text-white font-bold py-4 rounded-xl hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Join MSNC'
                    )}
                  </button>

                  <p className="text-xs text-center text-slate-500">
                    By joining, you agree to our privacy policy. We respect your data and will never share it with third parties.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}