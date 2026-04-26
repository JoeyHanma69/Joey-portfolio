import { useState } from "react";
import './Projects.css'
import SlashReveal from './SlashReveal';
import { FaGithub, FaPlay, FaExternalLinkAlt } from 'react-icons/fa';

// Edit this data to add your real projects
const projectData = {
    software: [
        {
            tag: 'Software · Web · Python · CI/CD',
            name: 'BMI Calculator',
            desc: 'A web-based BMI calculator built with Python, HTML, and CSS — backed by a full CI/CD pipeline. Covers unit and integration testing for input validation, formula accuracy, and gender/age-based categorization.',
            links: [{ label: 'GitHub', url: 'https://github.com/smolchell/SWE40006_BMI_Calculator' }],
        },
        // Add more objects here...
    ],
    games: [
            {
            tag: 'Game · Unity · C#',
            name: 'Nuclear Reactor Game',
            desc: 'R.E.A.C.T.O.R. is a game where players must manage a miniature star to generate power and meet quotas, all while handling system failures',
            links: [{ label: 'Play', url: 'https://ruz-on-itch.itch.io/reactor' }, { label: 'GitHub', url: 'https://github.com/Sardaukar1/COS30031-Assignment3' }],
            }, 
    ],
    ai: [
        {
        tag: 'AI · Machine Learning · Federated Learning · Deep Learning',
        name: 'RuralAi (Capstone Project)',
        desc: 'A privacy-preserving Machine Learning (ML) and Federated Learning (FL) system for train detection and analytics.This project demonstrates how distributed AI can support transportation monitoring, railway safety, and real-time analytics — all while keeping sensitive video data secure on the edge.',
        links: [{ label: 'GitHub', url: 'https://github.com/leya00/Train' }],
        }, 
        {
        tag: 'AI · ML Model',
        name: 'AI News Verification System (Not Working on It)',
        desc: 'A comprehensive AI-powered system for detecting fake news and verifying article authenticity using advanced natural language processing, source credibility analysis, and fact-checking techniques.',
        links: [{ label: 'GitHub', url: 'https://github.com/JoeyHanma69/news-verifier' }],
        },  
        {
        tag: 'AI · ML Model · Classification · DBSCAN processing · DataProcessing · Regression · KMeansClassifier',
        name: 'AI News Verification System (Not Working on It)',
        desc: 'This project provides weather report predictions based on historical data and includes a front-end for user interaction and a back-end for data processing. The AI model integrated into the back end provides predictions based on pre-trained machine learning algorithms.',
        links: [{ label: 'GitHub', url: 'https://github.com/JoeyHanma69/Weather-Report-Prediction' }],
        },  
        {
        tag: 'AI · ML Model · Classification · MLPClassifier · tensorflow ',
        name: 'MacDonalds Mlik Orde Prediction System',
        desc: 'This project provides a machine learning-based system for predicting milk order quantities for McDonalds stores. It uses historical milk usage data to predict future requirements, helping to optimize inventory management and reduce waste.',
        links: [{ label: 'GitHub', url: 'https://github.com/abdurrehman722/McDonalds-Milk-Product-Testing-Prototype' }],
        }, 
    ],
}
const tabs = ['software', 'games', 'ai']
const tabLabels = { software: '> software/', games: '> games/', ai: '> ai/' }

const linkIcon = (label) => {
    const l = label.toLowerCase();
    if (l === 'github') return <FaGithub />;
    if (l === 'play')   return <FaPlay />;
    return <FaExternalLinkAlt />;
}

export default function Projects() {
 const [activeTab, setActiveTab] = useState('software')
 return (
    <section id="projects" className="projects-section" style={{position:'relative',overflow:'hidden'}}>
        <SlashReveal />
        <div className="container">
        <div className="section-header">
            <p className="section-eyebrow">// battle_records</p>
            <h2 className="section-title">Projects</h2>
        <div className="section-divider" />
        </div>
            {/* Tab buttons */}
            <div className="tab-controls">
            {tabs.map(tab => (
            <button key={tab} className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}>{tabLabels[tab]}
            </button>
        ))}
        </div>
        {/* Project cards for the active tab */}
        <div className="projects-grid" key={activeTab}>  
        {projectData[activeTab].map((project, i) => (
        <div className="project-card" key={i}>
            <p className="project-tag">{project.tag}</p>
            <h3 className="project-name">{project.name}</h3>
            <p className="project-desc">{project.desc}</p>
            <div className="project-links">{project.links.map(link => (
                <a key={link.label} href={link.url} className="project-link" target="_blank" rel="noreferrer">
                    {linkIcon(link.label)} {link.label}
                </a>
            ))}
            </div>
            </div>
            ))}
            </div>
            </div>
    </section>
 ) 
}