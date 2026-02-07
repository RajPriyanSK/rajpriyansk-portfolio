'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, ExternalLink, Github, Linkedin, Twitter, Mail, ArrowUp, X } from "lucide-react";

const PROJECTS = [
  {
    id: "01",
    title: "Neural Network Visualizer",
    category: "Machine Learning / React",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1632&auto=format&fit=crop",
    description: "An interactive tool to visualize real-time weight adjustments in deep learning models."
  },
  {
    id: "02",
    title: "EcoTrack Mobile App",
    category: "UI/UX / React Native",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
    description: "A sustainability-focused application helping users track and reduce their carbon footprint."
  },
  {
    id: "03",
    title: "Distributed Systems Lab",
    category: "Backend / Go",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1631&auto=format&fit=crop",
    description: "Implementation of Raft consensus algorithm for a fault-tolerant key-value store."
  },
  {
    id: "04",
    title: "Generative Art Engine",
    category: "Creative Coding / p5.js",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1364&auto=format&fit=crop",
    description: "Algorithmic art generator exploring geometric patterns and color theory."
  }
];

const SKILLS = [
  { category: "Languages", items: ["TypeScript", "Python", "Go", "C++", "SQL"] },
  { category: "Frameworks", items: ["React", "Next.js", "Node.js", "Tailwind", "PyTorch"] },
  { category: "Tools", items: ["Docker", "Git", "AWS", "PostgreSQL", "Figma"] },
];

const EDUCATION = [
  {
    year: "2021 — 2025",
    degree: "B.S. Computer Science",
    school: "Stanford University",
    details: "Specializing in Artificial Intelligence. GPA: 3.9/4.0"
  },
  {
    year: "2023",
    degree: "Summer Research Fellow",
    school: "MIT Media Lab",
    details: "Explored human-computer interaction and generative interfaces."
  }
];

const SOCIAL_LINKS = [
  { name: "GitHub", icon: <Github size={20} />, href: "https://github.com" },
  { name: "LinkedIn", icon: <Linkedin size={20} />, href: "https://linkedin.com" },
  { name: "Twitter", icon: <Twitter size={20} />, href: "https://twitter.com" },
  { name: "Email", icon: <Mail size={20} />, href: "mailto:hello@example.com" },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        timeZoneName: 'short' 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 mix-blend-difference text-white">
        <div className="text-xl font-black tracking-tighter uppercase cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Portfolio.
        </div>
        <div className="flex gap-8 items-center">
          <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest">
            <button onClick={() => scrollToSection('work')} className="hover:line-through transition-all">Work</button>
            <button onClick={() => scrollToSection('about')} className="hover:line-through transition-all">About</button>
            <button onClick={() => scrollToSection('contact')} className="hover:line-through transition-all">Contact</button>
          </div>
          <button className="p-2 hover:scale-110 transition-transform" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-black text-white transition-transform duration-700 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} flex flex-col justify-center items-center p-6`}>
        <div className="flex flex-col gap-8 text-center">
          {['work', 'about', 'contact'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-6xl font-black uppercase tracking-tighter hover:line-through transition-all"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center px-6 pt-20">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 border border-black text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              Available for Internships 2024
            </span>
          </div>
          
          <h1 className="text-[12vw] leading-[0.85] font-black mb-12">
            CRAFTING <br />
            <span className="text-transparent stroke-black" style={{ WebkitTextStroke: '2px black' }}>DIGITAL</span> <br />
            EXPERIENCES
          </h1>

          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-md">
              <p className="text-xl md:text-2xl font-medium leading-tight mb-6">
                Computer Science student focused on building functional, high-performance web applications and exploring the intersection of design and code.
              </p>
              <button 
                onClick={() => scrollToSection('work')}
                className="group flex items-center gap-2 bg-black text-white px-6 py-4 font-bold uppercase tracking-widest text-sm hover:bg-neutral-800 transition-colors"
              >
                View Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="hidden lg:block text-right">
              <div className="text-sm font-bold uppercase tracking-widest mb-2">Current Location</div>
              <div className="text-2xl font-black">SAN FRANCISCO, CA</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 p-6 opacity-10 pointer-events-none">
          <div className="text-[20vw] font-black leading-none select-none">2024</div>
        </div>
      </section>

      {/* Project Gallery */}
      <section id="work" className="px-6 py-24 bg-black text-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-16 border-b border-neutral-800 pb-8">
            <h2 className="text-6xl md:text-8xl font-black">SELECTED<br />WORKS</h2>
            <p className="hidden md:block text-sm font-bold uppercase tracking-widest text-neutral-400 max-w-xs text-right">
              A collection of academic research and personal engineering projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            {PROJECTS.map((project) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 mb-6">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="bg-white text-black p-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <ExternalLink size={24} />
                    </div>
                  </div>
                  <div className="absolute top-6 left-6">
                    <span className="text-4xl font-black opacity-50 group-hover:opacity-100 transition-opacity">{project.id}</span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-black mb-2 group-hover:line-through transition-all">{project.title}</h3>
                    <p className="text-sm font-bold uppercase tracking-widest text-neutral-500">{project.category}</p>
                  </div>
                  <ArrowRight className="opacity-0 group-hover:opacity-100 -rotate-45 group-hover:rotate-0 transition-all duration-500" />
                </div>
                <p className="mt-4 text-neutral-400 max-w-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic & Skills Section */}
      <section id="about" className="px-6 py-24 bg-white text-black">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-5xl md:text-7xl font-black mb-16">ACADEMIC<br />PROFILE</h2>
              <div className="space-y-12">
                {EDUCATION.map((edu, index) => (
                  <div key={index} className="group border-l-4 border-black pl-8 py-2 hover:bg-neutral-50 transition-colors">
                    <div className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-2">{edu.year}</div>
                    <h3 className="text-3xl font-black mb-2 uppercase tracking-tighter">{edu.degree}</h3>
                    <div className="text-xl font-bold mb-4">{edu.school}</div>
                    <p className="text-neutral-600 max-w-md leading-relaxed">{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <h2 className="text-5xl md:text-7xl font-black mb-16 lg:text-right">SKILLS</h2>
                <div className="space-y-12">
                  {SKILLS.map((skillGroup, index) => (
                    <div key={index} className="lg:text-right">
                      <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-6">{skillGroup.category}</h4>
                      <div className="flex flex-wrap lg:justify-end gap-3">
                        {skillGroup.items.map((skill) => (
                          <span key={skill} className="px-4 py-2 border-2 border-black font-bold uppercase text-sm hover:bg-black hover:text-white transition-all cursor-default">{skill}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="px-6 py-24 bg-black text-white border-t border-neutral-800">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-24">
            <h2 className="text-[15vw] leading-[0.8] font-black tracking-tighter mb-12">LET'S <br /> CONNECT</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-2xl md:text-3xl font-medium mb-8 max-w-md">Open for internship opportunities, research collaborations, or just a coffee chat.</p>
                <a href="mailto:hello@example.com" className="inline-block text-xl font-black border-b-4 border-white pb-2 hover:pr-8 transition-all group">
                  HELLO@EXAMPLE.COM <ArrowRight className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
              <div className="grid grid-cols-2 gap-8">
                {SOCIAL_LINKS.map((link) => (
                  <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 border border-neutral-800 hover:bg-white hover:text-black transition-all duration-300 group">
                    <span className="group-hover:scale-110 transition-transform">{link.icon}</span>
                    <span className="font-bold uppercase tracking-widest text-sm">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500">© 2024 ALL RIGHTS RESERVED</div>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:line-through transition-all">
              BACK TO TOP <ArrowUp size={14} />
            </button>
            <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-neutral-500">
              <span>SF — CA</span>
              <span>{currentTime}</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
