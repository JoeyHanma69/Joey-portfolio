import './Music.css';
import SlashReveal from './SlashReveal';

const bands = [
 {
 name: 'Reasonable Crashouts',
 genre: 'Metal / Rock Covers · Since 2026',
 desc: "Reasonable Crashout was born in the wreckage of failed units, ghosted job applications, and the slow realization that maybe IT wasn't built for us. Four college dropouts who traded keyboards for guitars and turned their frustration into noise. Loud, unfiltered, and probably still debugging.",
 links: [{ label: 'Spotify', url: '#' }, { label: 'Bandcamp', url: '#' }],
 }
]

export default function Music() { 
    return (
    <section id="music" className="music-section" style={{position:'relative',overflow:'hidden'}}>
    <SlashReveal />
    <div className="container">
        <div className="section-header">
        <p className="section-eyebrow">// off_the_clock</p>
        <h2 className="section-title">Music</h2>
        <div className="section-divider" />
    </div>
    <div className="music-grid">
        {bands.map((band, i) => (
        <div className="band-card" key={i}>
        <div className="band-cover" aria-hidden="true">RC</div>
        <div className="band-info">
        <h3 className="band-name">{band.name}</h3>
        <p className="band-genre">{band.genre}</p>
        <p className="band-desc">{band.desc}</p>
        <div className="band-links">
        {band.links.map(link => (
        <a key={link.label} href={link.url} className="band-link">{link.label}</a>
        ))}
        </div>
        </div>
        </div>
        ))}
    </div>
    </div>
    </section> 
    )
}
