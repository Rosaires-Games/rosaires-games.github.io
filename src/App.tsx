import { ArrowRightIcon, SunIcon } from 'lucide-react'
import * as React from 'react'
import { Footer01 } from '@/components/footer-01'
import { Navbar01 } from '@/components/navbar-01'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Magnetic } from '@/components/ui/magnetic'
import { Marquee } from '@/components/ui/marquee'
import { NoiseTexture } from '@/components/ui/noise-texture'
import { Reveal } from '@/components/ui/reveal'
import { type Theme, ThemeSwitch } from '@/components/ui/theme-switch'
import { Typewriter } from '@/components/ui/typewriter'

function useTheme() {
  const [theme, setTheme] = React.useState<Theme>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch {}
  }, [theme])
  return [theme, setTheme] as const
}

/** The studio mark with its Sol de Mayo rays turning slowly behind the monuments. */
function SunMark({ className }: { className?: string }) {
  return (
    <div className={`relative aspect-[1000/860] ${className ?? ''}`}>
      <div
        aria-hidden
        className="absolute top-[46.5%] left-1/2 size-[70%] -translate-1/2 rounded-full bg-sol/25 blur-3xl"
      />
      {/* Rays rotate around the sun's center: (500, 400) in the 1000×860 viewBox. */}
      <img
        src="/brand/rosaires_rays.svg"
        alt=""
        className="absolute inset-0 size-full origin-[50%_46.5%] animate-sun-spin"
      />
      <img src="/brand/rosaires_body.svg" alt="Rosaires Games" className="absolute inset-0 size-full dark:hidden" />
      <img src="/brand/rosaires_body_dark.svg" alt="Rosaires Games" className="absolute inset-0 hidden size-full dark:block" />
    </div>
  )
}

// One wave period is 240 units wide; the path repeats it so drifting by half loops seamlessly.
const wave = `M0,40${' c60,-22 180,22 240,0'.repeat(12)}`

/** The two rivers from the logo, drifting under the hero. */
function Rivers() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 110"
      preserveAspectRatio="xMinYMid slice"
      className="block h-20 w-full md:h-28"
    >
      <g className="animate-wave-drift" fill="none" strokeLinecap="round" strokeWidth="14">
        {/* Celeste, white gap, celeste: the flag stripes from the logo. */}
        <path d={wave} className="stroke-celeste" />
        <path d={wave} transform="translate(-60 46)" className="stroke-celeste" />
      </g>
    </svg>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-12 pb-8 md:grid-cols-[1.15fr_1fr] md:pt-20">
        <div className="flex flex-col items-start">
          <p className="mb-6 font-display font-semibold text-eyebrow text-muted-foreground uppercase">
            — Rosario × Buenos Aires —
          </p>
          <h1 className="font-display font-black text-[clamp(2.75rem,7vw,5.25rem)] uppercase leading-[0.95] tracking-tight">
            Games made{' '}
            <span className="bg-[linear-gradient(transparent_62%,var(--sol)_62%,var(--sol)_92%,transparent_92%)] px-1 dark:bg-sol dark:text-primary-foreground">
              between
            </span>{' '}
            two rivers
          </h1>
          <p className="mt-6 max-w-lg text-pretty text-lead text-muted-foreground">
            Rosaires Games is a two-person indie studio from Argentina. We make strange, atmospheric
            games to play with friends.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic className="inline-block">
              <Button asChild size="lg" className="group">
                <a href="#games">
                  See our first game
                  <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </Button>
            </Magnetic>
            <Button asChild size="lg" variant="ghost">
              <a href="#studio">Meet the studio</a>
            </Button>
          </div>
        </div>
        <SunMark className="mx-auto w-full max-w-md md:max-w-none md:scale-125" />
      </div>
      <Rivers />
    </section>
  )
}

const marqueeWords = ['Rosario', 'Buenos Aires', 'Co-op horror', 'Made by two', 'PSX nights', 'Hecho en Argentina']

function Band() {
  return (
    <div className="border-y bg-primary py-4 text-primary-foreground">
      <Marquee duration={45} gap="2.5rem" pauseOnHover={false} fade={false}>
        {marqueeWords.map((word) => (
          <span key={word} className="flex items-center gap-10 font-display font-extrabold text-xl uppercase tracking-wider">
            {word}
            <SunIcon aria-hidden className="size-5 text-sol" />
          </span>
        ))}
      </Marquee>
    </div>
  )
}

/** A window into the game: this section runs on the game's tokens, not the studio's. */
function FeaturedGame() {
  return (
    <section
      id="games"
      data-theme="final-arrangements"
      className="relative isolate flex min-h-[85svh] items-end overflow-hidden"
    >
      <img
        src="/final-arrangements/img/shots/night.png"
        alt=""
        className="-z-20 absolute inset-0 size-full object-cover object-[60%_center]"
      />
      <div className="-z-10 absolute inset-0 bg-linear-to-r from-background via-background/60 to-transparent" />
      <div className="-z-10 absolute inset-0 bg-linear-to-t from-background via-transparent to-background/40" />
      <div aria-hidden className="scanlines -z-10 absolute inset-0 opacity-60" />
      <NoiseTexture animated opacity={0.12} className="-z-10" />

      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <Reveal variant="up" stagger={90} className="flex max-w-2xl flex-col items-start gap-6">
          <p className="font-sign text-sm text-muted-foreground uppercase tracking-[0.25em]">
            Our first game · In development
          </p>
          <h2 className="font-display text-[clamp(3rem,9vw,7rem)] uppercase leading-[0.88]">
            Final
            <br />
            Arrangements
          </h2>
          <p className="min-h-[3.5em] text-lead md:min-h-0">
            <Typewriter words="Every body needs to be ready by dawn." loop={false} typeSpeed={55} />
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="px-2.5 py-1 text-sm">Co-op · 1–4 players</Badge>
            <Badge variant="outline" className="px-2.5 py-1 text-sm">Psychological horror</Badge>
            <Badge variant="outline" className="px-2.5 py-1 text-sm">PC</Badge>
          </div>
          <Button asChild size="lg" className="group mt-2 border border-[#b31f17] hover:bg-accent">
            <a href="/final-arrangements/">
              <span className="group-hover:animate-flicker">Enter the funeral home</span>
              <ArrowRightIcon />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

const principles = [
  { title: 'Co-op first', text: 'Everything we make is designed for friends on the same call, from the first prototype.' },
  { title: 'Atmosphere over spectacle', text: 'Low-poly, dithered, foggy. Ordinary places that slowly feel wrong.' },
  { title: 'Made by hand', text: 'Two people, every system, every texture, every sound cue.' },
]

const team = [
  { name: 'Bruno Moyano', role: 'Co-founder' },
  { name: 'Matias Obezzi', role: 'Co-founder' },
]

function Studio() {
  return (
    <section id="studio" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="grid gap-14 md:grid-cols-2">
        <div>
          <p className="mb-4 font-display font-semibold text-eyebrow text-muted-foreground uppercase">— The studio —</p>
          <h2 className="font-display font-black text-title uppercase md:text-[3.25rem] md:leading-[1]">
            Two cities, <br />
            one sun
          </h2>
          <p className="mt-6 max-w-md text-pretty text-lead text-muted-foreground">
            Rosaires is Rosario and Buenos Aires in a single word. Our mark joins the Monumento a la
            Bandera and the Obelisco under the Sol de Mayo, with the rivers running below.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {team.map((person) => (
              <li key={person.name} className="flex items-center gap-4 rounded-lg border bg-card p-4">
                <span
                  aria-hidden
                  className="grid size-12 shrink-0 place-items-center rounded-full bg-secondary font-display font-extrabold text-secondary-foreground"
                >
                  {person.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')}
                </span>
                <span>
                  <span className="block font-display font-bold">{person.name}</span>
                  <span className="text-muted-foreground text-sm">{person.role}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Reveal variant="up" stagger={120} className="flex flex-col">
          {principles.map((item, index) => (
            <div key={item.title} className="flex gap-6 border-t py-7 last:border-b">
              <span className="font-display font-black text-3xl text-sol tabular-nums">0{index + 1}</span>
              <div>
                <h3 className="font-display font-bold text-heading">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.text}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

export default function App() {
  const [theme, setTheme] = useTheme()
  const mark = <img src={theme === 'dark' ? '/brand/rosaires_mark_dark.svg' : '/brand/rosaires_mark.svg'} alt="" />
  return (
    <>
      <Navbar01
        sticky
        brand={{ name: 'Rosaires', href: '/', logo: mark }}
        links={[
          { label: 'Games', href: '#games' },
          { label: 'Studio', href: '#studio' },
        ]}
        secondaryAction={null}
        primaryAction={{ label: 'Final Arrangements', href: '/final-arrangements/' }}
        actions={<ThemeSwitch theme={theme} onThemeChange={setTheme} />}
      />
      <main>
        <Hero />
        <Band />
        <FeaturedGame />
        <Studio />
      </main>
      <Footer01
        brand={{ name: 'Rosaires Games', href: '/', logo: mark }}
        description="An indie game studio from Rosario and Buenos Aires, Argentina."
        socials={[]}
        columns={[
          { title: 'Games', links: [{ label: 'Final Arrangements', href: '/final-arrangements/' }] },
          { title: 'Studio', links: [{ label: 'About us', href: '#studio' }] },
        ]}
        newsletter={null}
        legal={[]}
        copyright={`© ${new Date().getFullYear()} Rosaires Games · Hecho en Argentina`}
      />
    </>
  )
}
