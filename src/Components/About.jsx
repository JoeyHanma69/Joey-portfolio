import './About.css';
import SlashReveal from './SlashReveal';

const timeline = [ 
      {
        type: 'work',
        role: 'Intern',
        place: 'Turtle Down Under',
        period: '2026',
        desc: 'Full-stack internship: PHP, MySQL, WordPress, REST APIs, CSV automation, and AI-based tooling. Contributed to a custom CRM and AI-driven workflow systems.',
    },
    {
        type: 'work',
        role: 'Software Developer',
        place: 'Swinburne Rover Team Club',
        period: '03/2025 – 01/2026',
        desc: 'Built and maintained web apps with PHP, MySQL & WordPress. Worked with REST APIs, automated workflows via scripting and cron jobs, and developed AI-driven tools for internal automation.',
    },
    {
        type: 'work',
        role: 'Site Manager',
        place: 'FLYMOTION',
        period: '04/2025 – 04/2026',
        desc: 'Oversaw daily operations and led teams to hit project deadlines — 10–15% efficiency gains, 100% safety compliance.',
    },
    {
        type: 'edu',
        role: 'Bachelor of Computer Science',
        place: 'Swinburne University of Technology',
        period: '2024 – 2025',
        desc: 'Year 3 — specialising in AI, machine learning, systems engineering, and application development.',
    },
    {
        type: 'edu',
        role: 'Diploma of Information Technology',
        place: 'Swinburne University of Technology',
        period: '2023',
        desc: 'Uni-Link pathway program covering networking, software engineering, and Windows system administration.',
    },
]

const stats = [
    { value: '3+', label: 'Years\nCoding' },
    { value: '10+', label: 'Projects\nShipped' },
    { value: '9+', label: 'Languages\nForged' },
    { value: '4', label: 'Spoken\nLanguages' },
]

export default function About() {
    return (
        <section id="background" className="about-section" style={{position:'relative',overflow:'hidden'}}>
            <SlashReveal />
            <div className="container">
                <div className="section-header">
                    <p className="section-eyebrow">// origin_story</p>
                    <h2 className="section-title">About</h2>
                    <div className="section-divider" />
                </div>

                <div className="about-grid">
                    <div className="about-intro">
                        <p className="about-bio">
                            Computer Science student at Swinburne University — building software since before the degree made it official.
                            The battlefield spans <strong>full-stack web development</strong>, <strong>AI & machine learning</strong>,
                            and <strong>game development</strong>, with real deployments across internships, university clubs, and independent projects.
                        </p>
                        <p className="about-bio">
                            Forged in the trenches of REST APIs, federated learning pipelines, WordPress customisations,
                            and game engine scripting. Fluent in Python, JavaScript, C++, C#, and the language of
                            relentless iteration. Also speaks Chinese.
                        </p>
                        <p className="about-bio">
                            Currently pursuing a Graduate Program in IT at Swinburne — aligning technical depth
                            with <strong>service desk, IT support, and systems engineering</strong> roles.
                        </p>

                        <div className="about-stats">
                            {stats.map(s => (
                                <div className="stat-block" key={s.label}>
                                    <span className="stat-value">{s.value}</span>
                                    <span className="stat-label">{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="about-timeline">
                        {timeline.map((entry, i) => (
                            <div className={`timeline-entry ${entry.type}`} key={i}>
                                <div className="timeline-dot" />
                                <div className="timeline-body">
                                    <div className="timeline-header">
                                        <span className="timeline-role">{entry.role}</span>
                                        <span className="timeline-period">{entry.period}</span>
                                    </div>
                                    <p className="timeline-place">{entry.place}</p>
                                    <p className="timeline-desc">{entry.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
