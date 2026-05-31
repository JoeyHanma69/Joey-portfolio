/* TEMPLATE: Blood Drip effect — used with HorrorToggle.
   Shows under body.horror. To repurpose, update the CSS selector. */
import './BloodDrip.css';

const drips = [
    { left: '4%',  delay: '0s',    dur: '2.8s', h: 45, w: 2   },
    { left: '11%', delay: '1.2s',  dur: '3.5s', h: 30, w: 1.5 },
    { left: '18%', delay: '0.4s',  dur: '2.2s', h: 60, w: 2   },
    { left: '26%', delay: '2.1s',  dur: '4s',   h: 25, w: 1   },
    { left: '33%', delay: '0.8s',  dur: '3s',   h: 50, w: 2.5 },
    { left: '41%', delay: '1.7s',  dur: '2.5s', h: 35, w: 1.5 },
    { left: '49%', delay: '0.2s',  dur: '3.8s', h: 55, w: 2   },
    { left: '57%', delay: '2.5s',  dur: '2.9s', h: 40, w: 1   },
    { left: '64%', delay: '1s',    dur: '3.2s', h: 65, w: 2   },
    { left: '72%', delay: '0.6s',  dur: '2.4s', h: 28, w: 1.5 },
    { left: '80%', delay: '1.9s',  dur: '3.6s', h: 48, w: 2   },
    { left: '88%', delay: '0.3s',  dur: '2.7s', h: 38, w: 1   },
    { left: '95%', delay: '1.4s',  dur: '3.1s', h: 52, w: 2   },
]

export default function BloodDrip() {
    return (
        <div className="blood-drip-container">
            {drips.map((d, i) => (
                <div
                    key={i}
                    className="blood-drip"
                    style={{
                        left: d.left,
                        animationDelay: d.delay,
                        animationDuration: d.dur,
                        '--drip-h': `${d.h}px`,
                        width: `${d.w}px`,
                    }}
                />
            ))}
        </div>
    );
}
