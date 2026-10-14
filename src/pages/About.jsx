import { Link } from 'react-router-dom';

const profileStats = [
  { value: '40+', label: 'Multidisciplinary team members' },
  { value: '50+', label: 'Brands' },
  { value: '5+', label: 'Countries' },
  { value: '100+', label: 'Projects delivered' },
];

const timeline = [
  {
    year: '2016',
    title: 'Initial setup',
    text: 'Planning Labs began its journey through experiential marketing and on-ground brand experiences.',
  },
  {
    year: '2019',
    title: 'Digital shift',
    text: 'Expanded into digital storytelling, creative communication and online brand growth.',
  },
  {
    year: '2020–2025',
    title: 'Continuous experimentation',
    text: 'Testing, refining, executing and scaling brand experiences across industries and platforms.',
  },
  {
    year: '2026',
    title: 'Full-scale brand lab',
    text: 'Evolved into an integrated brand-building ecosystem combining digital growth with experiential execution.',
  },
];

const pillars = [
  {
    number: '01',
    title: 'Strategic approach',
    text: 'Insight-driven strategies that build strong brand foundations.',
  },
  {
    number: '02',
    title: 'Creative minds',
    text: 'Ideas that spark engagement and create lasting connections.',
  },
  {
    number: '03',
    title: 'Flawless execution',
    text: 'Precision in planning and attention to every detail.',
  },
  {
    number: '04',
    title: 'Measurable impact',
    text: 'A focus on results that drive growth and build brand value.',
  },
];

const expertise = [
  {
    number: '01',
    title: 'Experiential marketing',
    description:
      'Real-world experiences that help audiences connect with brands.',
    services: [
      'Events & corporate experiences',
      'Exhibitions & trade shows',
      'Brand activations & MICE',
      'Experiential advertising',
      'Retail & brand installations',
      'Corporate gifting & merchandising',
      'Sports & entertainment experiences',
    ],
  },
  {
    number: '02',
    title: 'Digital & creative solutions',
    description:
      'Connected digital capabilities that build visibility, engagement and growth.',
    services: [
      'Social media management',
      'Performance marketing — Meta & Google Ads',
      'Content production — reels, shoots & brand films',
      'SEO & organic search growth',
      'Website & landing page development',
      'Branding & creative design',
      'Influencer campaign strategy',
      'CGI & anamorphic visuals',
    ],
  },
];

const teamDisciplines = [
  'Strategy & leadership',
  'Operations & production',
  'Business development & account management',
  'Graphic design & 3D visualisation',
  'Video editing & videography',
  'Digital marketing',
  'Content & social media',
  'Finance, HR & administration',
];

// Markets and regions highlighted in the profile deck.
// These labels do not imply an office in every location.
const globalPresence = ['India', 'UAE', 'Canada', 'USA', 'Africa'];

function ButtonArrow() {
  return (
    <span className="pab-btn-icon" aria-hidden="true">
      ↗
    </span>
  );
}

export default function About() {
  return (
    <div className="pab-page">
      {/* ================= HERO ================= */}
      <header className="pab-hero">
        <span
          className="pab-glow pab-glow-gold"
          aria-hidden="true"
        />
        <span
          className="pab-glow pab-glow-purple"
          aria-hidden="true"
        />

        <div className="container-pl pab-container">
          {/* <nav className="pab-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">About</span>
          </nav> */}

          <span className="pab-pill">About Planning Labs</span>

          <h1 className="pab-title">
            A global brand-building agency.
            <br />
            <span>A brand growth laboratory.</span>
          </h1>

          <p className="pab-lead">
            Bringing digital and on-ground experiences together
            through strategy, creativity, production and performance.
          </p>

          <div className="pab-actions">
            <Link to="/our-work" className="pab-btn">
              <ButtonArrow />
              Explore our work
            </Link>

            <a href="#pab-vision" className="pab-text-link">
              Discover our vision
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          {/* <ul className="pab-hero-tags" aria-label="Our approach">
            <li>Strategy</li>
            <li>Creative</li>
            <li>Production</li>
            <li>Performance</li>
          </ul> */}
        </div>
      </header>

      {/* ================= WHO WE ARE ================= */}
      <section
        className="pab-section"
        aria-labelledby="pab-intro-title"
      >
        <div className="container-pl pab-container">
          <div className="pab-intro-grid">
            <div>
              <span className="pab-kicker">Who we are</span>

              <h2 id="pab-intro-title" className="pab-h2">
                From screen to street,
                <br />
                <span>we build brands that grow.</span>
              </h2>

              <p className="pab-copy">
                Planning Labs brings experiential marketing, digital
                marketing and creative services into one connected
                brand-building ecosystem.
              </p>

              <p className="pab-copy">
                What began with on-ground brand experiences has evolved
                into a multidisciplinary team bringing strategy,
                creativity, production, technology and execution
                together under one roof.
              </p>

              <p className="pab-copy">
                From exhibitions and activations to digital campaigns
                and content, we connect ideas with audiences to create
                memorable experiences and meaningful brand impact.
              </p>
            </div>

            <dl className="pab-stats">
              {profileStats.map((stat) => (
                <div className="pab-stat-card" key={stat.label}>
                  <dt className="pab-stat-label">{stat.label}</dt>
                  <dd className="pab-stat-value">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ================= VISION & MISSION ================= */}
      <section
        className="pab-section pab-section-alt"
        id="pab-vision"
        aria-labelledby="pab-purpose-title"
      >
        <div className="container-pl pab-container">
          <div className="pab-section-head">
            <span className="pab-kicker">Our purpose</span>

            <h2 id="pab-purpose-title" className="pab-h2">
              Connecting ideas.
              <br />
              <span>Creating impact.</span>
            </h2>
          </div>

          <div className="pab-purpose-grid">
            <article className="pab-purpose-card pab-vision-card">
              <span className="pab-card-label">Our vision</span>

              <h3>
                From ideas to impact.
                <br />
                Across borders.
              </h3>

              <p className="pab-copy">
                Our vision is to build Planning Labs into a globally
                recognised integrated marketing powerhouse, known for
                transforming ambitious ideas into memorable experiences
                and meaningful brand impact.
              </p>

              <p className="pab-copy">
                We aspire to continuously push the boundaries of
                creativity, technology and innovation while building
                long-term partnerships with brands across India and
                global markets.
              </p>

              <ul className="pab-tags" aria-label="Vision priorities">
                <li>Creativity</li>
                <li>Technology</li>
                <li>Innovation</li>
                <li>Experiences</li>
                <li>Global expansion</li>
              </ul>
            </article>

            <article className="pab-purpose-card pab-mission-card">
              <span className="pab-card-label">Our mission</span>

              <h3>
                One roof. Endless solutions.
                <br />
                Real impact.
              </h3>

              <p className="pab-copy">
                Our mission is to bring strategy, creativity and
                flawless execution under one roof, delivering powerful
                solutions across experiential marketing, events,
                exhibitions, activations and digital marketing.
              </p>

              <p className="pab-copy">
                We aim to understand every brand beyond the brief,
                create ideas that connect with audiences and execute
                every project with passion, precision and measurable
                impact.
              </p>

              <ul className="pab-tags" aria-label="Our mission in action">
                <li>We understand</li>
                <li>We connect</li>
                <li>We execute</li>
                <li>We impact</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* ================= HOW WE WORK ================= */}
      <section
        className="pab-section"
        aria-labelledby="pab-approach-title"
      >
        <div className="container-pl pab-container">
          <div className="pab-section-head">
            <span className="pab-kicker">How we work</span>

            <h2 id="pab-approach-title" className="pab-h2">
              One integrated team.
              <br />
              <span>One point of ownership.</span>
            </h2>

            <p className="pab-copy">
              Strategy, creative, media, content and execution working
              together for consistency and clear accountability.
            </p>
          </div>

          <div className="pab-pillars">
            {pillars.map((pillar) => (
              <article className="pab-pillar-card" key={pillar.title}>
                <span className="pab-number" aria-hidden="true">
                  {pillar.number}
                </span>

                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CORE EXPERTISE ================= */}
      <section
        className="pab-section pab-section-alt"
        aria-labelledby="pab-expertise-title"
      >
        <div className="container-pl pab-container">
          <div className="pab-section-head">
            <span className="pab-kicker">What we do</span>

            <h2 id="pab-expertise-title" className="pab-h2">
              Digital. Experiential. Creative.
              <br />
              <span>Connected under one strategy.</span>
            </h2>
          </div>

          <div className="pab-expertise-grid">
            {expertise.map((area) => (
              <article className="pab-expertise-card" key={area.title}>
                <span className="pab-number" aria-hidden="true">
                  {area.number}
                </span>

                <h3>{area.title}</h3>
                <p className="pab-copy">{area.description}</p>

                <ul className="pab-service-list">
                  {area.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EVOLUTION ================= */}
      <section
        className="pab-section"
        aria-labelledby="pab-timeline-title"
      >
        <div className="container-pl pab-container">
          <div className="pab-timeline-grid">
            <div>
              <span className="pab-kicker">Our story</span>

              <h2 id="pab-timeline-title" className="pab-h2">
                From experience
                <br />
                <span>to impact.</span>
              </h2>

              <p className="pab-copy">
                A journey of experimentation and evolution — bringing
                digital growth and experiential execution closer
                together.
              </p>
            </div>

            <ol className="pab-timeline">
              {timeline.map((item) => (
                <li className="pab-timeline-item" key={item.year}>
                  <span className="pab-timeline-dot" aria-hidden="true" />
                  <span className="pab-timeline-year">{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ================= LEADERSHIP ================= */}
      <section
        className="pab-section pab-section-alt"
        aria-labelledby="pab-founder-title"
      >
        <div className="container-pl pab-container">
          <div className="pab-founder-card">
            <div className="pab-founder-info">
              <span className="pab-kicker">Our leadership</span>

              <h2 id="pab-founder-title" className="pab-h2">
                Dr. Swapnil Tambe
              </h2>

              <span className="pab-founder-role">Founder &amp; CEO</span>

              <p className="pab-copy">
                An experiential and digital marketing expert with
                nearly 20 years of experience building brands,
                experiences and creative ecosystems across India,
                Dubai and global markets.
              </p>
            </div>

            <div className="pab-founder-message">
              <span className="pab-card-label">The thinking behind the lab</span>

              <h3>Vision. Creativity. Precision. Consistent execution.</h3>

              <p className="pab-copy">
                Planning Labs operates as a modern brand laboratory,
                transforming ideas into scalable experiences,
                meaningful engagement and measurable growth.
              </p>

              <p className="pab-copy">
                Our approach combines creativity, technology, strategy
                and execution to help brands grow across digital and
                on-ground platforms with consistency and purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TEAM & PRESENCE ================= */}
      <section
        className="pab-section"
        aria-labelledby="pab-team-title"
      >
        <div className="container-pl pab-container">
          <div className="pab-team-grid">
            <div>
              <span className="pab-kicker">The people behind the work</span>

              <h2 id="pab-team-title" className="pab-h2">
                40+ minds.
                <br />
                <span>One Planning Labs.</span>
              </h2>

              <p className="pab-copy">
                A multidisciplinary team connecting insight, design,
                content, technology and on-ground execution.
              </p>

              <ul className="pab-tags" aria-label="Team disciplines">
                {teamDisciplines.map((discipline) => (
                  <li key={discipline}>{discipline}</li>
                ))}
              </ul>
            </div>

            <div className="pab-presence-card">
              <span className="pab-card-label">Our global presence</span>
              <h3>Ideas that reach. Impact that stays.</h3>

              <ul className="pab-tags" aria-label="Markets and regions">
                {globalPresence.map((market) => (
                  <li key={market}>{market}</li>
                ))}
              </ul>

              <div className="pab-production">
                <h4>Production in India and Dubai</h4>
                <p className="pab-copy">
                  Our production houses support the physical builds
                  behind brand experiences, exhibitions and
                  installations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CLOSING CTA ================= */}
      <section
        className="pab-section pab-last"
        aria-labelledby="pab-cta-title"
      >
        <div className="container-pl pab-container">
          <div className="pab-cta">
            <span className="pab-pill">Let’s start with your brand</span>

            <h2 id="pab-cta-title" className="pab-h2">
              One partner.
              <br />
              <span>Connected brand growth.</span>
            </h2>

            <p className="pab-copy">
              Explore our work or tell us what you want to build next.
            </p>

            <div className="pab-actions">
              <Link to="/our-work" className="pab-btn">
                <ButtonArrow />
                Browse our work
              </Link>

              <Link to="/contact" className="pab-text-link">
                Let’s talk
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
