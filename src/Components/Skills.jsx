import './stylesheet/Skills.css';
import SlashReveal from './SlashReveal';
 
const skillCategories = [
 { icon: '</>', title: 'Languages', skills: ['Python', 'JavaScript', 'C++', 'C#', 'TypeScript', 'Java', 'Assembly', 'Rust', 'PHP'] },
 { icon: '⚔', title: 'Game Dev', skills: ['Unity', 'Unreal Engine', 'Godot', 'GLSL'] },
 { icon: '◈', title: 'AI / ML', skills: ['TensorFlow', 'PyTorch', 'LangChain', 'OpenCV', 'Pandas', 'Keras', 'Regression', 'Clustering', 'KNN', 'SVM'] },
 { icon: '◱', title: 'Frontend', skills: ['React', 'Vue.js', 'HTML', 'CSS', 'Tailwind', 'TypeScript', 'Vite'] },
 { icon: '◧', title: 'Backend', skills: ['Node.js', 'Express', 'Python Flask', 'FastAPI', 'REST APIs', 'PostgreSQL', 'MongoDB'] },
 { icon: '∑', title: 'Mathematics', skills: ['Linear Algebra', 'Calculus', 'Statistics', 'Probability', 'Discrete Math'] },
 { icon: '▣', title: 'Data Analysis', skills: ['NumPy', 'Matplotlib', 'Seaborn', 'SQL', 'Excel',] },
 { icon: '⬡', title: 'LLMs', skills: ['OpenAI API', 'LangChain', 'Prompt Engineering', 'Fine-tuning', 'Claude API', 'RAG', 'Agentic AI'] },  
 { icon: '⊘', title: 'Cybersecurity', skills: ['CIA Triad', 'Authentication, Authorisation & Accounting', 'The McCumber Cube', 'Linux', 'OSI Layers', 'NIST Cybersecurity Framework',  
    'Risk Management', 'Web Application Security', 'Cryptography']}, 
]
export default function Skills() {
 return (
    <section id="skills" className="skills-section" style={{position:'relative',overflow:'hidden'}}>
        <SlashReveal />
        <div className="container">
            <div className="section-header" data-reveal>
            <p className="section-eyebrow">// arsenal.exe</p>
            <h2 className="section-title">Skills & Tech</h2>
            <div className="section-divider" />
        </div>
    <div className="skills-grid">
        {skillCategories.map((cat, i) => (
            <div className="skill-category" key={cat.title} data-reveal style={{ '--reveal-delay': `${i * 70}ms` }}>
                <p className="skill-cat-title">
                    <span className="perk-root" aria-hidden="true" />
                    <span className="cat-icon">{cat.icon}</span> {cat.title}
                </p>
                <div className="perk-tree">
                {cat.skills.map((skill, s) => (
                    <span
                        className="perk-row"
                        key={skill}
                        data-reveal
                        style={{ '--reveal-delay': `${i * 70 + 140 + s * 55}ms` }}
                    >
                        <span className="perk-node" aria-hidden="true" />
                        <span className="perk-label">{skill}</span>
                    </span>
                ))}
            </div>
        </div>
        ))}
    </div>
    </div>
    </section>
 )
}