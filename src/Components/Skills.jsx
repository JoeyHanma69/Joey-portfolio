import './Skills.css';
import SlashReveal from './SlashReveal';
 
const skillCategories = [
 { icon: '</>', title: 'Languages', skills: ['Python', 'JavaScript', 'C++', 'C#', 'TypeScript', 'Java', 'Assembly', 'Rust', 'PHP'] },
 { icon: '⚔', title: 'Game Dev', skills: ['Unity', 'Unreal Engine', 'Godot', 'GLSL'] },
 { icon: '◈', title: 'AI / ML', skills: ['TensorFlow', 'PyTorch', 'LangChain', 'OpenCV', 'Pandas', 'Keras', 'Regression', 'Clustering', 'KNN', 'SVM'] },
 { icon: '◱', title: 'Frontend', skills: ['React', 'Vue.js', 'HTML', 'CSS', 'Tailwind', 'TypeScript', 'Vite'] },
 { icon: '◧', title: 'Backend', skills: ['Node.js', 'Express', 'Python Flask', 'FastAPI', 'REST APIs', 'PostgreSQL', 'MongoDB'] },
 { icon: '∑', title: 'Mathematics', skills: ['Linear Algebra', 'Calculus', 'Statistics', 'Probability', 'Discrete Math'] },
 { icon: '▣', title: 'Data Analysis', skills: ['NumPy', 'Matplotlib', 'Seaborn', 'SQL', 'Excel',] },
 { icon: '⬡', title: 'LLMs', skills: ['OpenAI API', 'LangChain', 'Prompt Engineering', 'Fine-tuning', 'Claude API'] },
]
export default function Skills() {
 return (
    <section id="skills" className="skills-section" style={{position:'relative',overflow:'hidden'}}>
        <SlashReveal />
        <div className="container">
            <div className="section-header">
            <p className="section-eyebrow">// arsenal.exe</p>
            <h2 className="section-title">Skills & Tech</h2>
            <div className="section-divider" />
        </div>
    <div className="skills-grid">
        {skillCategories.map(cat => (
            <div className="skill-category" key={cat.title}>
                <p className="skill-cat-title"><span className="cat-icon">{cat.icon}</span> {cat.title}</p>
                <div className="skill-items">
                {cat.skills.map(skill => (
                <span className="skill-pill" key={skill}>{skill}</span>
                ))}
            </div>
        </div>
        ))}
    </div>
    </div>
    </section>
 )
}