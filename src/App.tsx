import React, { useState } from 'react';
import { 
  Search, Bell, MessageSquare, MapPin, Briefcase, 
  ChevronRight, ArrowLeft, Bookmark,
  Share2, Shield, Activity, Filter, CheckCircle2,
  Command, Zap, ArrowRight, X
} from 'lucide-react';

const PROFILES = [
  {
    id: 1,
    name: "Alex Vance",
    role: "Technical Co-Founder (CTO)",
    company: "Ex-Stripe, Stealth AI",
    location: "San Francisco, CA",
    matchScore: 94,
    focus: "B2B SaaS / Fintech",
    status: "Active Now",
    seeking: "$2M Pre-Seed",
    bio: "Looking for a strong GTM/Sales oriented co-founder (CEO) to help scale a new AI-native billing infrastructure stack. I've spent the last 4 years at Stripe working on payment routing optimization.",
    skills: ["System Architecture", "Machine Learning", "Go", "TypeScript", "AWS"],
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    experience: [
      { role: "Staff Engineer", company: "Stripe", years: "2019 - 2023" },
      { role: "Senior SWE", company: "Coinbase", years: "2017 - 2019" }
    ],
    education: "B.S. Computer Science, Stanford University"
  },
  {
    id: 2,
    name: "Sarah Jenks",
    role: "GTM / Operator",
    company: "Prev. VP Product at Loom",
    location: "New York, NY",
    matchScore: 88,
    focus: "Enterprise Productivity",
    status: "Seeking Funding",
    seeking: "Technical Co-founder",
    bio: "Scaling zero-to-one products is my jam. Mostly interested in the intersection of asynchronous work and spatial computing. Have angel funding committed and early alpha users.",
    skills: ["Product Strategy", "B2B Enterprise Sales", "Fundraising", "Go-to-Market"],
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    experience: [
      { role: "VP Product", company: "Loom", years: "2020 - 2023" },
      { role: "Product Manager", company: "Slack", years: "2016 - 2020" }
    ],
    education: "MBA, Harvard Business School"
  },
  {
    id: 3,
    name: "David Chu",
    role: "Full-Stack Engineer",
    company: "YC S21 Alum",
    location: "Remote / London",
    matchScore: 76,
    focus: "Consumer Social / Web3",
    status: "Offline",
    seeking: "Design Co-founder",
    bio: "Built and sold a consumer social app in 2022. Now exploring the intersection of decentralized identity and gaming. Need someone to help with community building and UX.",
    skills: ["React Native", "Solidity", "Growth Hacking", "UI/UX Prototyping"],
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    experience: [
      { role: "Founder", company: "AcquiredCo", years: "2020 - 2022" },
      { role: "Engineer", company: "Meta", years: "2018 - 2020" }
    ],
    education: "B.S. Software Engineering, Imperial College London"
  }
];

const NETWORK_MEMBERS = [
  ...PROFILES,
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "Head of Product",
    company: "Stripe, Ex-Shopify",
    location: "New York, NY",
    matchScore: 0,
    focus: "Fintech",
    status: "Active Now",
    seeking: "Open to advising",
    bio: "Passionate about building scalable fintech products.",
    skills: ["Product Strategy", "Growth"],
    avatar: "https://i.pravatar.cc/150?u=12",
    experience: [], education: ""
  },
  {
    id: 5,
    name: "Marcus Chen",
    role: "Senior AI Engineer",
    company: "OpenAI",
    location: "San Francisco, CA",
    matchScore: 0,
    focus: "LLMs, Infrastructure",
    status: "Passive",
    seeking: "",
    bio: "Researching large scale distributed training.",
    skills: ["PyTorch", "Rust", "CUDA"],
    avatar: "https://i.pravatar.cc/150?u=13",
    experience: [], education: ""
  },
  {
    id: 6,
    name: "Jessica Walsh",
    role: "Design Founder",
    company: "Studio X",
    location: "Remote / Berlin",
    matchScore: 0,
    focus: "Consumer Tech",
    status: "Seeking Funding",
    seeking: "Technical Co-founder",
    bio: "Designing the future of consumer interactions.",
    skills: ["UI/UX", "Brand", "Figma"],
    avatar: "https://i.pravatar.cc/150?u=14",
    experience: [], education: ""
  },
  {
    id: 7,
    name: "Omar Tariq",
    role: "Ops / Logistics",
    company: "Flexport",
    location: "Chicago, IL",
    matchScore: 0,
    focus: "Supply Chain",
    status: "Offline",
    seeking: "Co-founder",
    bio: "Optimizing global supply chains through software.",
    skills: ["Operations", "Strategy", "Logistics"],
    avatar: "https://i.pravatar.cc/150?u=16",
    experience: [], education: ""
  },
  {
    id: 8,
    name: "Anya Petrova",
    role: "Data Scientist",
    company: "DeepMind",
    location: "London, UK",
    matchScore: 0,
    focus: "HealthTech AI",
    status: "Active Now",
    seeking: "Domain Expert",
    bio: "Applying ML to complex biological datasets.",
    skills: ["Python", "TensorFlow", "Bioinformatics"],
    avatar: "https://i.pravatar.cc/150?u=17",
    experience: [], education: ""
  }
];

const MatchIndicator = ({ score }: { score: number }) => {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  let colorClass = "text-brand-blue";
  if (score < 80) colorClass = "text-brand-indigo";

  return (
    <div className="relative flex items-center justify-center w-12 h-12">
      <svg className="transform -rotate-90 w-12 h-12">
        <circle
          className="text-surface-container"
          strokeWidth="3"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="24"
          cy="24"
        />
        <circle
          className={colorClass}
          strokeWidth="3"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="24"
          cy="24"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <span className="absolute text-label-sm font-semibold">{score}%</span>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  let dotColor = "bg-gray-400";
  if (status === "Active Now") dotColor = "bg-green-500";
  else if (status === "Seeking Funding") dotColor = "bg-brand-blue";

  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-2 h-2 rounded-full ${dotColor}`} />
      <span className="text-label-sm text-on-surface-variant font-medium">{status}</span>
    </div>
  );
};

const LandingPage = ({ onEnter, onExplore, onSignIn, onApply }: { onEnter: () => void, onExplore: () => void, onSignIn: () => void, onApply: () => void }) => {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans text-on-surface">
      <header className="px-6 py-6 border-b border-outline-variant/30 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-container-max mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-navy rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg leading-none tracking-tighter">N</span>
            </div>
            <span className="text-[18px] font-bold text-brand-navy tracking-tight">Nexus Core</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onSignIn} className="text-label-sm text-on-surface-variant hover:text-brand-navy font-semibold transition-colors">Sign In</button>
            <button onClick={onApply} className="nexus-btn-primary">Apply to Join</button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="py-24 px-6 md:py-32 overflow-hidden relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue font-semibold text-[11px] uppercase tracking-widest mb-8 border border-brand-blue/20">
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></span>
              Accepting Q3 Applications
            </div>
            <h1 className="text-[48px] md:text-[80px] leading-[1.05] font-bold tracking-[-0.03em] text-brand-navy mb-8">
              The high-velocity <br className="hidden md:block"/> co-founder network.
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10 md:text-[20px] leading-relaxed">
              Connect with vetted technical and operational leaders. Skip the noise of traditional networking and find the exact missing piece for your venture.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={onEnter} className="w-full sm:w-auto bg-brand-navy text-white rounded-lg text-base font-medium px-8 py-4 hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-navy/20">
                Enter Network
                <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={onExplore} className="w-full sm:w-auto bg-white border border-outline-variant/50 text-brand-navy rounded-lg text-base font-medium px-8 py-4 hover:bg-surface-container-low transition-colors shadow-sm">
                Explore Directory
              </button>
            </div>
          </div>
        </section>
        
        <section className="py-24 px-6 bg-white border-t border-outline-variant/30">
          <div className="max-w-container-max mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-xl shadow-inner border border-outline-variant/20">
                  <Command className="w-5 h-5 text-brand-navy" />
                </div>
                <h3 className="text-[20px] font-semibold text-brand-navy">Curated Matches</h3>
                <p className="text-body-md text-on-surface-variant leading-relaxed">Our algorithm analyzes deep professional history, beyond just buzzwords, to surface synergistic 1:1 pairings.</p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-xl shadow-inner border border-outline-variant/20">
                  <Shield className="w-5 h-5 text-brand-navy" />
                </div>
                <h3 className="text-[20px] font-semibold text-brand-navy">Vetted Network</h3>
                <p className="text-body-md text-on-surface-variant leading-relaxed">Every member passes a rigorous background check of their operational history and technical capability.</p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-xl shadow-inner border border-outline-variant/20">
                  <Zap className="w-5 h-5 text-brand-navy" />
                </div>
                <h3 className="text-[20px] font-semibold text-brand-navy">High-Velocity</h3>
                <p className="text-body-md text-on-surface-variant leading-relaxed">Designed to rapidly move you from profile discovery to meaningful face-to-face founder dates.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const MatchesFeed = ({ onSelectProfile }: { onSelectProfile: (id: number) => void }) => {
  const [isRefining, setIsRefining] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [criteria, setCriteria] = useState({
    lookingFor: "Technical Co-Founder (CTO)",
    industry: "B2B SaaS, AI/ML",
    location: "San Francisco or Remote",
    minMatch: 70
  });
  const [formState, setFormState] = useState(criteria);

  const handleRefineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCriteria(formState);
    setIsRefining(false);
  };

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Main Content Area */}
      <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-h2 text-brand-navy">Curated Matches</h1>
            <p className="text-body-md text-on-surface-variant mt-1">Based on your requirement for a {criteria.lookingFor}.</p>
          </div>
          <button onClick={() => setIsRefining(true)} className="nexus-btn-secondary gap-2 hidden sm:flex">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="flex flex-col border border-outline-variant/30 bg-white rounded-xl overflow-hidden shadow-sm">
          {PROFILES.map((profile, i) => (
            <div key={profile.id} className={`p-6 hover:bg-surface-container-lowest transition-colors cursor-pointer ${i !== PROFILES.length - 1 ? 'border-b border-outline-variant/30' : ''}`}
                 onClick={() => onSelectProfile(profile.id)}>
              <div className="flex items-start gap-5">
                <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-xl object-cover border border-outline-variant/20 shadow-sm" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-h3 text-brand-navy">{profile.name}</h3>
                      <p className="text-body-md font-medium text-brand-blue">{profile.role}</p>
                    </div>
                    <MatchIndicator score={profile.matchScore} />
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2 mb-3 text-on-surface-variant">
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4" />
                      <span className="text-label-sm">{profile.company}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span className="text-label-sm">{profile.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-body-md text-on-surface-variant line-clamp-2 mb-4">
                    {profile.bio}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="nexus-chip">{skill}</span>
                      ))}
                      {profile.skills.length > 3 && (
                        <span className="nexus-chip text-outline text-on-surface-variant">+{profile.skills.length - 3}</span>
                      )}
                    </div>
                    <StatusBadge status={profile.status} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Utility Sidebar */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
        <div className="nexus-card p-6 rounded-xl">
          <h3 className="text-[16px] font-semibold text-brand-navy mb-4">Your Search Criteria</h3>
          <div className="space-y-4">
            <div>
              <span className="text-caps-xs text-outline block mb-1">Looking For</span>
              <p className="text-label-sm font-medium">{criteria.lookingFor}</p>
            </div>
            <div>
              <span className="text-caps-xs text-outline block mb-1">Industry Focus</span>
              <p className="text-label-sm font-medium">{criteria.industry}</p>
            </div>
            <div>
              <span className="text-caps-xs text-outline block mb-1">Location</span>
              <p className="text-label-sm font-medium">{criteria.location}</p>
            </div>
          </div>
          <button onClick={() => setIsRefining(true)} className="nexus-btn-secondary w-full mt-6 text-brand-blue border-brand-blue/20 bg-brand-blue/5 hover:bg-brand-blue/10">
            Refine Criteria
          </button>
        </div>

        <div className="nexus-card p-6 rounded-xl bg-gradient-to-br from-brand-navy to-[#1e293b] border-none text-white shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-brand-blue" />
            <h3 className="text-[16px] font-semibold">Premium Matching</h3>
          </div>
          <p className="text-sm text-balance text-slate-300 mb-4 leading-relaxed">
            Get access to vetted YC alumni and serial entrepreneurs actively looking for their next venture.
          </p>
          <button onClick={() => setIsUpgrading(true)} className="nexus-btn-accent w-full group py-2.5">
            Upgrade Scope
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {isRefining && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-navy/20 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-outline-variant/30">
              <h2 className="text-[20px] font-semibold text-brand-navy">Refine Search Criteria</h2>
              <button onClick={() => setIsRefining(false)} className="text-on-surface-variant hover:text-brand-navy">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <form className="space-y-5" onSubmit={handleRefineSubmit}>
                <div>
                  <label className="block text-label-sm text-brand-navy mb-2">Looking For</label>
                  <select 
                    className="nexus-input bg-white" 
                    value={formState.lookingFor}
                    onChange={(e) => setFormState(s => ({ ...s, lookingFor: e.target.value }))}
                  >
                    <option value="Technical Co-Founder (CTO)">Technical Co-Founder (CTO)</option>
                    <option value="Product Co-Founder (CPO)">Product Co-Founder (CPO)</option>
                    <option value="Design Co-Founder">Design Co-Founder</option>
                    <option value="GTM / Operator (CEO)">GTM / Operator (CEO)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-label-sm text-brand-navy mb-2">Industry Focus</label>
                  <input 
                    type="text" 
                    value={formState.industry} 
                    onChange={(e) => setFormState(s => ({ ...s, industry: e.target.value }))}
                    className="nexus-input" 
                  />
                </div>
                <div>
                  <label className="block text-label-sm text-brand-navy mb-2">Location Strategy</label>
                  <select 
                    className="nexus-input bg-white" 
                    value={formState.location}
                    onChange={(e) => setFormState(s => ({ ...s, location: e.target.value }))}
                  >
                    <option value="San Francisco or Remote">San Francisco or Remote</option>
                    <option value="Remote Only">Remote Only</option>
                    <option value="New York, NY">New York, NY</option>
                    <option value="London, UK">London, UK</option>
                  </select>
                </div>
                <div>
                  <label className="block text-label-sm text-brand-navy mb-2">Minimum Match Score</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={formState.minMatch} 
                      onChange={(e) => setFormState(s => ({ ...s, minMatch: parseInt(e.target.value) }))}
                      className="w-full accent-brand-blue" 
                    />
                    <span className="text-label-sm font-semibold min-w-[32px]">{formState.minMatch}%</span>
                  </div>
                </div>
                <div className="pt-4 flex items-center justify-end gap-3 mt-6">
                  <button type="button" onClick={() => setIsRefining(false)} className="nexus-btn-secondary border-transparent">Cancel</button>
                  <button type="submit" className="nexus-btn-primary">Apply Filters</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isUpgrading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-navy/20 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-outline-variant/30">
              <h2 className="text-[20px] font-semibold text-brand-navy">Upgrade to Premium</h2>
              <button onClick={() => setIsUpgrading(false)} className="text-on-surface-variant hover:text-brand-navy">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-brand-blue" />
                </div>
              </div>
              <h3 className="text-h3 text-center text-brand-navy mb-2">Nexus Core Premium</h3>
              <p className="text-body-md text-center text-on-surface-variant mb-8">
                Unlock full access to the highest-calibre founders and accelerate your matching process.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" />
                  <div>
                    <h4 className="text-label-sm font-semibold text-brand-navy">Priority Matching</h4>
                    <p className="text-sm text-on-surface-variant mt-0.5">Your profile is highlighted to incoming top-tier founders.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" />
                  <div>
                    <h4 className="text-label-sm font-semibold text-brand-navy">Advanced Filters</h4>
                    <p className="text-sm text-on-surface-variant mt-0.5">Filter by previous exits, YC alumni status, and exact equity expectations.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" />
                  <div>
                    <h4 className="text-label-sm font-semibold text-brand-navy">Unlimited Messages</h4>
                    <p className="text-sm text-on-surface-variant mt-0.5">Bypass the 5-message weekly limit and connect freely.</p>
                  </div>
                </div>
              </div>

              <button onClick={() => setIsUpgrading(false)} className="nexus-btn-primary w-full py-3 text-[16px]">
                Upgrade for $49/mo
              </button>
              <button onClick={() => setIsUpgrading(false)} className="nexus-btn-secondary w-full py-3 text-[16px] mt-3 border-transparent">
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const NetworkDirectory = ({ onSelectProfile }: { onSelectProfile: (id: number) => void }) => {
  const [filter, setFilter] = useState<'all' | 'engineering' | 'product' | 'design'>('all');

  const filteredMembers = NETWORK_MEMBERS.filter(member => {
    if (filter === 'all') return true;
    const role = member.role.toLowerCase();
    if (filter === 'engineering') return role.includes('engineer') || role.includes('technical') || role.includes('cto') || role.includes('data');
    if (filter === 'product') return role.includes('product') || role.includes('gtm') || role.includes('ops');
    if (filter === 'design') return role.includes('design') || role.includes('ui');
    return true;
  });

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-12 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
          <div>
            <h1 className="text-h2 text-brand-navy">Global Directory</h1>
            <p className="text-body-md text-on-surface-variant mt-1">Discover and connect with the broader Nexus network.</p>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <button 
              onClick={() => setFilter('all')}
              className={`px-5 rounded-full whitespace-nowrap transition-colors ${filter === 'all' ? 'nexus-btn-primary' : 'nexus-btn-secondary bg-white'}`}
            >
              All Members
            </button>
            <button 
              onClick={() => setFilter('engineering')}
              className={`px-5 rounded-full whitespace-nowrap transition-colors ${filter === 'engineering' ? 'nexus-btn-primary' : 'nexus-btn-secondary bg-white'}`}
            >
              Engineering
            </button>
            <button 
              onClick={() => setFilter('product')}
              className={`px-5 rounded-full whitespace-nowrap transition-colors ${filter === 'product' ? 'nexus-btn-primary' : 'nexus-btn-secondary bg-white'}`}
            >
              Product
            </button>
            <button 
              onClick={() => setFilter('design')}
              className={`px-5 rounded-full whitespace-nowrap transition-colors ${filter === 'design' ? 'nexus-btn-primary' : 'nexus-btn-secondary bg-white'}`}
            >
              Design
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <div key={member.id} onClick={() => onSelectProfile(member.id)} className="nexus-card rounded-xl p-5 flex flex-col items-center text-center cursor-pointer">
              <div className="relative mb-4 mt-2">
                <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full object-cover border border-outline-variant/30 shadow-sm" />
                <div className={`absolute bottom-0 right-1 w-4 h-4 rounded-full border-2 border-white ${
                  member.status === 'Active Now' ? 'bg-green-500' : member.status === 'Seeking Funding' ? 'bg-brand-blue' : 'bg-gray-400'
                }`}></div>
              </div>
              <h3 className="text-[18px] font-semibold text-brand-navy mb-0.5">{member.name}</h3>
              <p className="text-[13px] font-medium text-brand-blue mb-3">{member.role}</p>
              
              <div className="w-full flex items-center justify-center gap-1.5 text-on-surface-variant mb-5">
                <Briefcase className="w-3.5 h-3.5" />
                <span className="text-[13px] truncate">{member.company}</span>
              </div>

              <div className="w-full pt-4 mt-auto border-t border-outline-variant/30 flex justify-between gap-2">
                <button className="flex-1 nexus-btn-secondary py-1.5 font-medium">View Profile</button>
                <button className="w-[38px] flex items-center justify-center rounded border border-[#E2E8F0] text-on-surface-variant hover:bg-surface-container-low transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProfileDetailView = ({ profile, onBack }: { profile: any, onBack: () => void }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-label-sm text-on-surface-variant hover:text-brand-navy transition-colors w-fit group mb-4"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      <div className="nexus-card rounded-xl overflow-hidden shadow-sm">
        <div className="h-32 bg-gradient-to-r from-brand-navy/5 to-brand-blue/10 border-b border-outline-variant/30 relative">
          <div className="absolute right-6 top-6 flex items-center gap-2">
            <button className="w-10 h-10 rounded bg-white border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-brand-navy hover:shadow-sm transition-all">
              <Bookmark className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded bg-white border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-brand-navy hover:shadow-sm transition-all">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="p-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-6 -mt-12 relative z-10">
            <img src={profile.avatar} alt={profile.name} className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-sm" />
            <div className="flex gap-3 mt-4 sm:mt-0">
              <button className="nexus-btn-secondary">Decline</button>
              <button className="nexus-btn-primary gap-2 px-6">
                <MessageSquare className="w-4 h-4" />
                Message
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h1 className="text-h2 text-brand-navy">{profile.name}</h1>
                <p className="text-body-lg text-brand-blue font-medium mt-1">{profile.role}</p>
                
                <div className="flex flex-wrap items-center gap-4 mt-3 text-on-surface-variant">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-label-sm">{profile.company}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span className="text-label-sm">{profile.location}</span>
                  </div>
                  <StatusBadge status={profile.status} />
                </div>
              </div>

              {profile.bio && (
                <div className="space-y-3">
                  <h3 className="text-[18px] font-semibold text-brand-navy">About</h3>
                  <p className="text-body-md leading-relaxed text-on-surface-variant">
                    {profile.bio}
                  </p>
                </div>
              )}

              {profile.skills && profile.skills.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-[18px] font-semibold text-brand-navy">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill: string) => (
                      <span key={skill} className="nexus-chip px-3 py-1.5 bg-surface-container-low">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {profile.experience && profile.experience.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-[18px] font-semibold text-brand-navy">Experience</h3>
                  <div className="space-y-4">
                    {profile.experience.map((exp: any, idx: number) => (
                      <div key={idx} className="flex gap-4">
                        <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center shrink-0">
                          <Briefcase className="w-5 h-5 text-on-surface-variant" />
                        </div>
                        <div>
                          <h4 className="text-label-sm font-semibold text-brand-navy mb-0.5">{exp.role}</h4>
                          <p className="text-sm text-on-surface-variant">{exp.company}</p>
                          <p className="text-xs text-outline mt-0.5">{exp.years}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {profile.matchScore > 0 && (
                <div className="p-6 rounded-xl bg-surface-container-low border border-outline-variant/30">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-brand-navy">Match Analysis</h4>
                    <div className="text-h3 text-brand-blue">{profile.matchScore}%</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-on-surface-variant">Complementary skill set</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-on-surface-variant">Aligned target audience</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6 rounded-xl bg-surface border border-outline-variant/30">
                <h4 className="text-caps-xs text-outline mb-3">Venture Focus</h4>
                <p className="text-label-sm font-semibold text-brand-navy mb-4">{profile.focus}</p>
                
                <h4 className="text-caps-xs text-outline mb-3">Seeking</h4>
                <p className="text-label-sm font-semibold text-brand-navy mb-4">{profile.seeking || "Open to discussions"}</p>

                {profile.education && (
                  <>
                    <h4 className="text-caps-xs text-outline mb-3">Education</h4>
                    <p className="text-label-sm text-brand-navy">{profile.education}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SignInPage = ({ onSignIn, onBack, onApply }: { onSignIn: () => void, onBack: () => void, onApply: () => void }) => {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans text-on-surface items-center justify-center py-12 px-6">
      <div className="absolute top-6 left-6 cursor-pointer flex items-center gap-2" onClick={onBack}>
        <div className="w-8 h-8 bg-brand-navy rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg leading-none tracking-tighter">N</span>
        </div>
        <span className="text-[18px] font-bold text-brand-navy tracking-tight">Nexus Core</span>
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-outline-variant/30 p-8">
        <h2 className="text-h2 text-brand-navy text-center mb-2">Welcome Back</h2>
        <p className="text-body-md text-on-surface-variant text-center mb-8">Sign in to continue to your network.</p>

        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onSignIn(); }}>
          <div>
            <label className="block text-label-sm text-brand-navy mb-2">Corporate Email</label>
            <input type="email" placeholder="alex@startup.com" className="nexus-input" required />
          </div>
          <div>
            <label className="block text-label-sm text-brand-navy mb-2">Password</label>
            <input type="password" placeholder="••••••••" className="nexus-input" required />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-outline-variant text-brand-blue focus:ring-brand-blue" />
              <span className="text-sm text-on-surface-variant">Remember me</span>
            </label>
            <a href="#" className="text-sm text-brand-blue hover:underline font-medium">Forgot Password?</a>
          </div>
          <button type="submit" className="nexus-btn-primary w-full py-3 mt-4 text-[16px]">
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-outline-variant/30 text-center">
          <p className="text-sm text-on-surface-variant">
            Don't have an account? <button type="button" onClick={onApply} className="text-brand-blue font-semibold hover:underline">Apply to Join</button>
          </p>
        </div>
      </div>
    </div>
  );
};

const ApplicationPage = ({ onSubmit, onSignIn, onBack }: { onSubmit: () => void, onSignIn: () => void, onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans text-on-surface items-center py-12 px-6">
      <div className="absolute top-6 left-6 cursor-pointer flex items-center gap-2" onClick={onBack}>
        <div className="w-8 h-8 bg-brand-navy rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg leading-none tracking-tighter">N</span>
        </div>
        <span className="text-[18px] font-bold text-brand-navy tracking-tight">Nexus Core</span>
      </div>

      <div className="w-full max-w-xl bg-white rounded-xl shadow-sm border border-outline-variant/30 p-8 mt-12">
        <h2 className="text-h2 text-brand-navy text-center mb-2">Apply to Join Nexus Core</h2>
        <p className="text-body-md text-on-surface-variant text-center mb-8">We vet all members to ensure a high-quality talent pool.</p>

        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-label-sm text-brand-navy mb-2">First Name</label>
              <input type="text" placeholder="Alex" className="nexus-input" required />
            </div>
            <div>
              <label className="block text-label-sm text-brand-navy mb-2">Last Name</label>
              <input type="text" placeholder="Vance" className="nexus-input" required />
            </div>
          </div>
          <div>
            <label className="block text-label-sm text-brand-navy mb-2">Email Address</label>
            <input type="email" placeholder="alex@startup.com" className="nexus-input" required />
          </div>
          <div>
            <label className="block text-label-sm text-brand-navy mb-2">LinkedIn URL</label>
            <input type="url" placeholder="https://linkedin.com/in/..." className="nexus-input" required />
          </div>
          <div>
            <label className="block text-label-sm text-brand-navy mb-2">Primary Role</label>
            <select className="nexus-input bg-white" required defaultValue="">
              <option value="" disabled>Select your primary role...</option>
              <option value="technical">Technical (Engineering/Data)</option>
              <option value="product">Product Management</option>
              <option value="design">Design / UX</option>
              <option value="gtm">GTM / Sales / Ops</option>
            </select>
          </div>
          <div>
            <label className="block text-label-sm text-brand-navy mb-2">Briefly describe what you're looking for</label>
            <textarea placeholder="e.g. Looking for a strong GTM co-founder for a B2B SaaS project..." className="nexus-input h-24 resize-none" required></textarea>
          </div>
          <button type="submit" className="nexus-btn-primary w-full py-3 mt-4 text-[16px]">
            Submit Application
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-outline-variant/30 text-center">
          <p className="text-sm text-on-surface-variant">
            Already a member? <button type="button" onClick={onSignIn} className="text-brand-blue font-semibold hover:underline">Sign In</button>
          </p>
        </div>
      </div>
    </div>
  );
};



export default function App() {
  const [view, setView] = useState<'landing' | 'signin' | 'apply' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<'matches' | 'network' | 'messages'>('matches');
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);

  if (view === 'landing') {
    return <LandingPage onEnter={() => setView('app')} onExplore={() => { setView('app'); setActiveTab('network'); }} onSignIn={() => setView('signin')} onApply={() => setView('apply')} />;
  }

  if (view === 'signin') {
    return <SignInPage onSignIn={() => setView('app')} onBack={() => setView('landing')} onApply={() => setView('apply')} />;
  }

  if (view === 'apply') {
    return <ApplicationPage onSubmit={() => setView('app')} onSignIn={() => setView('signin')} onBack={() => setView('landing')} />;
  }

  const selectedProfile = selectedProfileId 
    ? [...PROFILES, ...NETWORK_MEMBERS].find(p => p.id === selectedProfileId) 
    : null;

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface selection:bg-brand-blue/20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => {
              setActiveTab('matches');
              setSelectedProfileId(null);
              setView('landing'); 
            }}>
              <div className="w-8 h-8 bg-brand-navy rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg leading-none tracking-tighter">N</span>
              </div>
              <span className="text-[18px] font-bold text-brand-navy tracking-tight hidden sm:block">Nexus Core</span>
            </div>
            
            <nav className="flex items-center gap-6">
              <button 
                onClick={() => { setActiveTab('matches'); setSelectedProfileId(null); }}
                className={`text-label-sm font-semibold py-5 border-b-2 transition-colors ${
                  activeTab === 'matches' && !selectedProfileId ? 'border-brand-blue text-brand-navy' : 'border-transparent text-on-surface-variant hover:text-brand-navy'
                }`}
              >
                Matches
              </button>
              <button 
                onClick={() => { setActiveTab('network'); setSelectedProfileId(null); }}
                className={`text-label-sm font-semibold py-5 border-b-2 transition-colors ${
                  activeTab === 'network' && !selectedProfileId ? 'border-brand-blue text-brand-navy' : 'border-transparent text-on-surface-variant hover:text-brand-navy'
                }`}
              >
                Network
              </button>
              <button 
                onClick={() => { setActiveTab('messages'); setSelectedProfileId(null); }}
                className={`text-label-sm font-semibold py-5 border-b-2 transition-colors ${
                  activeTab === 'messages' && !selectedProfileId ? 'border-brand-blue text-brand-navy' : 'border-transparent text-on-surface-variant hover:text-brand-navy'
                }`}
              >
                Messages
              </button>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input 
                type="text" 
                placeholder="Search founders, skills..." 
                className="nexus-input pl-9 w-64 py-1.5 text-sm rounded-full bg-surface-container-lowest"
              />
            </div>
            <button className="p-2 text-on-surface-variant hover:text-brand-navy transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-blue rounded-full border border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/30">
              <img src="https://i.pravatar.cc/150?u=me" alt="My Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-container-max mx-auto px-6 py-8">
        {selectedProfile ? (
          <ProfileDetailView profile={selectedProfile} onBack={() => setSelectedProfileId(null)} />
        ) : activeTab === 'matches' ? (
          <MatchesFeed onSelectProfile={setSelectedProfileId} />
        ) : activeTab === 'network' ? (
          <NetworkDirectory onSelectProfile={setSelectedProfileId} />
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mb-6">
              <MessageSquare className="w-8 h-8 text-outline" />
            </div>
            <h2 className="text-h2 text-brand-navy mb-2">Your Inbox is Empty</h2>
            <p className="text-body-md text-on-surface-variant max-w-md">
              When you match with a co-founder or receive a message, it will appear here. Break the ice by browsing your matches grid!
            </p>
            <button 
              onClick={() => setActiveTab('matches')} 
              className="nexus-btn-primary mt-8"
            >
              View Curated Matches
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
