
import React, { useState } from 'react';
import { Search, HeartHandshake, Pill, Utensils, Users, MapPin, ArrowUpRight, Heart, ShieldCheck } from 'lucide-react';

interface Resource {
  id: string;
  name: string;
  description: string;
  category: 'Support' | 'Advocacy' | 'Financial' | 'Health';
  url: string;
}

const RESOURCES: Resource[] = [
  {
    id: 'sisters-network',
    name: 'Sisters Network Inc.',
    description: 'A national African American breast cancer survivorship organization committed to increasing local and national attention to the devastating impact that breast cancer has in the African American community.',
    category: 'Support',
    url: 'http://www.sistersnetworkinc.org/'
  },
  {
    id: 'touch-black-breast-cancer',
    name: 'TOUCH, The Black Breast Cancer Alliance',
    description: 'Drives clinical trial participation and provides advocacy and resources specifically for Black women with breast cancer.',
    category: 'Advocacy',
    url: 'https://www.touchbbca.org/'
  },
  {
    id: 'tigerlily-foundation',
    name: 'Tigerlily Foundation',
    description: 'Educates, advocates for, and empowers young women (ages 15-45) before, during, and after breast cancer, with a focus on ending disparities.',
    category: 'Advocacy',
    url: 'https://www.tigerlilyfoundation.org/'
  },
  {
    id: 'living-beyond-breast-cancer',
    name: 'Living Beyond Breast Cancer',
    description: 'Offers high-quality information and a supportive community to help you make the best decisions for your life.',
    category: 'Health',
    url: 'https://www.lbbc.org/'
  },
  {
    id: 'komen-chicago',
    name: 'Susan G. Komen Chicago',
    description: 'Local resources, screening programs, and financial assistance for the Greater Chicago area.',
    category: 'Financial',
    url: 'https://www.komen.org/community/illinois/chicago/'
  },
  {
    id: 'cancer-support-center',
    name: 'The Cancer Support Center (Homewood/Mokena)',
    description: 'Provides free support services, counseling, and nutritional guidance for anyone impacted by cancer in the South Suburbs.',
    category: 'Support',
    url: 'https://www.cancersupportcenter.org/'
  }
];

export const CommunityResources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Support', 'Advocacy', 'Financial', 'Health'];

  const filteredResources = RESOURCES.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || r.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Community Support</h2>
        <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-600">
            <HeartHandshake className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-3">
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
                type="text" 
                placeholder="Search local resources..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:border-rose-500 transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                        filter === cat 
                        ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20' 
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-rose-50'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredResources.map(resource => (
            <a 
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-rose-200 transition-all group relative overflow-hidden"
            >
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                        {resource.category === 'Support' && <Users className="w-4 h-4 text-rose-500" />}
                        {resource.category === 'Advocacy' && <ShieldCheck className="w-4 h-4 text-indigo-500" />}
                        {resource.category === 'Financial' && <Heart className="w-4 h-4 text-emerald-500" />}
                        {resource.category === 'Health' && <Pill className="w-4 h-4 text-blue-500" />}
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{resource.category}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-rose-500 transition-colors" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-rose-700 transition-colors text-lg">{resource.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">{resource.description}</p>
            </a>
        ))}
      </div>
      
      <div className="bg-rose-50 p-6 rounded-3xl text-center border border-rose-100">
         <p className="text-xs text-rose-700 font-medium">
            You are not alone. These organizations specialize in advocacy and support for Black women navigating their cancer journey.
         </p>
      </div>
    </div>
  );
};
