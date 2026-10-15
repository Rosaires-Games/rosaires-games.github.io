import { ArrowRightIcon } from 'lucide-react'
import * as React from 'react'
import { Footer01 } from '@/components/footer-01'
import { Navbar01 } from '@/components/navbar-01'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Gallery } from '@/components/ui/gallery'
import { NoiseTexture } from '@/components/ui/noise-texture'
import { Reveal } from '@/components/ui/reveal'
import { Typewriter } from '@/components/ui/typewriter'

const img = (path: string) => `/final-arrangements/img/${path}`

/** Scroll depth as "corruption": drives the red vignette and the HUD readout. */
function useCorruption() {
  const [value, setValue] = React.useState(0)
  React.useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - innerHeight
      const next = max > 0 ? Math.min(1, scrollY / max) : 0
      document.documentElement.style.setProperty('--corruption', next.toFixed(3))
      setValue(Math.round(next * 100))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    return () => {
      removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])
  return value
}

function CorruptionHud() {
  const value = useCorruption()
  const hunting = value >= 70
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-4 bottom-4 z-(--z-sticky) hidden w-44 border bg-background/85 p-3 font-sign text-xs uppercase tracking-[0.2em] backdrop-blur md:block"
    >
      <div className="mb-2 flex justify-between">
        <span>Corruption</span>
        <span className="tabular-nums">{value}%</span>
      </div>
      <div className="h-1.5 bg-muted">
        <div className="h-full bg-primary" style={{ width: `${value}%` }} />
      </div>
      <p className={hunting ? 'mt-2 animate-flicker text-destructive' : 'mt-2 text-muted-foreground'}>
        {hunting ? 'It is hunting' : 'Board in the office'}
      </p>
    </div>
  )
}

function SectionHeading({ sign, title, children }: { sign: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="mb-4 font-sign text-muted-foreground text-sm uppercase tracking-[0.3em]">{sign}</p>
      <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] uppercase leading-[0.9]">{title}</h2>
      {children && <p className="mt-5 text-pretty text-lead text-muted-foreground">{children}</p>}
    </div>
  )
}

function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-svh items-end overflow-hidden">
      <img src={img('shots/night.png')} alt="" className="-z-20 absolute inset-0 size-full object-cover" />
      <div className="-z-10 absolute inset-0 bg-linear-to-t from-background via-background/20 to-background/50" />
      <div className="-z-10 absolute inset-0 bg-linear-to-r from-background/80 via-transparent to-transparent" />
      <div aria-hidden className="scanlines -z-10 absolute inset-0" />
      <div className="mx-auto w-full max-w-6xl px-6 pt-32 pb-16 md:pb-24">
        <p className="mb-6 font-sign text-muted-foreground text-sm uppercase tracking-[0.35em]">Rosaires Games presents</p>
        <h1 className="font-display text-[clamp(3.5rem,12vw,10rem)] uppercase leading-[0.82]">
          Final
          <br />
          Arrangements
        </h1>
        <p className="mt-8 min-h-[3em] max-w-xl text-lead md:text-[1.6rem]">
          <Typewriter words="Every body needs to be ready by dawn." loop={false} typeSpeed={60} delay={400} />
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="outline" className="px-2.5 py-1 text-sm">Co-op · 1–4 players</Badge>
          <Badge variant="outline" className="px-2.5 py-1 text-sm">First-person horror</Badge>
          <Badge variant="outline" className="px-2.5 py-1 text-sm">Windows · Linux</Badge>
          <Badge variant="outline" className="px-2.5 py-1 text-sm">English · Español</Badge>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg" className="border border-[#b31f17] hover:bg-accent">
            <a href="#release">Coming soon to PC</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#shift">
              Read the job offer
              <ArrowRightIcon />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

const offer = [
  ['Position', 'Night staff. Up to four openings.'],
  ['Hours', 'From closing time until dawn.'],
  ['Duties', 'Register the dead. Embalm. Hold the wake. Cremate. Release.'],
  ['Requirements', 'Steady hands. Neat paperwork. Do not look at the doorway.'],
  ['Pay', 'Chips, after every shift.'],
]

function Shift() {
  return (
    <section id="shift" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="grid items-center gap-14 md:grid-cols-2">
        <Reveal variant="up">
          {/* The intake form uses the game's paper slips: ink on aged paper, red stamps. */}
          <article className="-rotate-1 relative bg-paper p-8 text-ink shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)] md:p-10">
            <p className="font-sign text-red-ink text-xs uppercase tracking-[0.3em]">Funeral home · Staff wanted</p>
            <h2 className="mt-3 border-ink border-b-2 pb-4 font-display text-4xl uppercase md:text-5xl">The night shift</h2>
            <dl className="mt-6 grid gap-4">
              {offer.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[7.5rem_1fr] gap-3 border-ink/30 border-b border-dashed pb-3">
                  <dt className="font-display text-red-ink uppercase">{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <span
              aria-hidden
              className="absolute -top-5 -right-3 rotate-[12deg] bg-paper border-4 border-red-ink px-3 py-1 font-display text-3xl text-red-ink uppercase opacity-80"
            >
              Hired
            </span>
          </article>
        </Reveal>
        <div>
          <SectionHeading sign="The premise" title="Bodies arrive all night">
            You and up to three friends run the night shift at a funeral home. Every order has to be
            processed before the sun comes up, and the building does not want you to finish.
          </SectionHeading>
          <figure className="border bg-card p-2">
            <img src={img('shots/paperwork.png')} alt="The paperwork desk in the director's office" className="w-full" />
            <figcaption className="px-1 pt-2 font-sign text-muted-foreground text-xs uppercase tracking-[0.2em]">
              The paperwork desk
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

const stations = [
  ['reception', 'Reception', 'Bodies come in. Someone has to sign for them.'],
  ['paperwork', 'Paperwork', 'Forms, names, causes. Get one wrong and it counts.'],
  ['cold_room', 'Cold room', 'Keep them cold until their turn.'],
  ['prep_table', 'Prep table', 'Mix the fluid to the house protocol. Then embalm.'],
  ['chapel', 'Chapel', 'Hold the wake. Light the candles. Ignore the organ.'],
  ['oven', 'Oven', 'Cremation takes time. Plan around it.'],
  ['urns', 'Urns', 'Ashes go in the right urn, with the right name.'],
  ['hearse_door', 'Hearse door', 'Where the night begins and ends.'],
  ['delivery', 'Delivery', 'Finished orders leave here before dawn.'],
] as const

function Stations() {
  return (
    <section id="stations" className="border-y bg-card/60">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeading sign="Gameplay" title={<>Nine stations.<br />One night.</>}>
          Fill orders by moving between stations, Overcooked-style, with several jobs running at once.
          Bodies only move on gurneys, and two people pushing go faster.
        </SectionHeading>
        <Reveal variant="up" stagger={50} className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {stations.map(([icon, name, text]) => (
            <div key={icon} className="group flex gap-4 bg-background p-6 transition-colors hover:bg-accent">
              <img src={img(`icons/station_${icon}.png`)} alt="" className="size-10 shrink-0" />
              <div>
                <h3 className="font-sign text-lg uppercase tracking-[0.15em] group-hover:animate-flicker">{name}</h3>
                <p className="mt-1 text-muted-foreground text-sm">{text}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

const incidents = [
  ['The organ plays', 'Nobody is in the chapel. The organ plays anyway.'],
  ['A figure in the doorway', 'It stands where the hallway ends. Do not stare.'],
  ['Wet footprints', 'They lead into the cold room. None lead out.'],
  ['Writing on the wall', 'A message that was not there an hour ago.'],
  ['The wrong name', 'The form says one name. The body says another.'],
  ['The red room', 'Every light in the room turns red at once.'],
  ['The clocks stop', 'Every clock in the building stops at the same minute.'],
  ['Hands on the window', 'Handprints, on the outside of the glass.'],
]

function Anomalies() {
  return (
    <section id="anomalies" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeading sign="Anomalies" title="The building keeps score">
        Every mistake feeds the corruption, and it only shows on a board in the office. As it rises,
        the funeral home starts doing things on its own. Past 70%, something hunts the crew.
      </SectionHeading>
      <Reveal variant="up" stagger={60} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {incidents.map(([title, text], index) => (
          <article key={title} className="relative flex flex-col border bg-card p-5 transition-colors hover:border-[#b31f17]">
            <p className="font-sign text-muted-foreground text-xs uppercase tracking-[0.2em]">
              Incident #{String(index * 7 + 13).padStart(3, '0')}
            </p>
            <h3 className="mt-3 font-display text-2xl uppercase leading-none">{title}</h3>
            <p className="mt-3 flex-1 text-muted-foreground text-sm">{text}</p>
            <span className="mt-5 self-start border-2 border-destructive px-2 py-0.5 font-display text-destructive text-xs uppercase tracking-widest">
              Unresolved
            </span>
          </article>
        ))}
      </Reveal>
      <div className="mt-10 grid gap-6 border-primary border-l-4 bg-accent/40 p-6 md:grid-cols-[auto_1fr] md:items-center">
        <p className="font-display text-5xl text-destructive">70%</p>
        <p className="text-lead">
          Get caught and you are out of the shift until a teammate drags you back. If everyone goes
          down, the night is lost.
        </p>
      </div>
    </section>
  )
}

const places = [
  {
    name: 'The funeral home',
    when: 'Nights 1 to 5',
    text: 'The job. Cold corridors, fog, and orders that pile up until dawn.',
    tint: '#4d5261',
  },
  {
    name: 'Flat 4B',
    when: 'Between shifts',
    text: 'Home. Rest, patch yourself up and pay the bills in Obols.',
    tint: '#6b5c4d',
  },
  {
    name: "The Ferryman's",
    when: 'If you dare',
    text: 'A smoky casino where the night pays out in Chips, or takes them.',
    tint: '#5c4d42',
  },
]

function Nights() {
  return (
    <section id="nights" className="border-y bg-card/60">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeading sign="The campaign" title={<>Five nights.<br />Then you go home.</>}>
          Health is yours. Sanity is shared by the whole crew.
        </SectionHeading>
        <Reveal variant="up" stagger={100} className="grid gap-4 md:grid-cols-3">
          {places.map((place) => (
            <article
              key={place.name}
              className="relative flex min-h-72 flex-col justify-end overflow-hidden border p-6"
              style={{ background: `linear-gradient(to top, var(--background) 10%, ${place.tint})` }}
            >
              <div aria-hidden className="scanlines absolute inset-0 opacity-50" />
              <p className="relative font-sign text-hud-gold text-xs uppercase tracking-[0.25em]">{place.when}</p>
              <h3 className="relative mt-2 font-display text-3xl uppercase">{place.name}</h3>
              <p className="relative mt-2 text-muted-foreground">{place.text}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

const crew = [
  ['director_f', 'Funeral director'],
  ['embalmer_f', 'Embalmer'],
  ['cremador_m', 'Cremator'],
  ['chaplain_m', 'Chaplain'],
  ['forense_f', 'Forensic'],
  ['florist_f', 'Florist'],
  ['guard_m', 'Guard'],
  ['janitor_m', 'Janitor'],
  ['intern_m', 'Intern'],
  ['receptionist_f', 'Receptionist'],
  ['driver_f', 'Driver'],
  ['asistente_m', 'Assistant'],
] as const

function Crew() {
  return (
    <section id="crew" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeading sign="The crew" title="Pick your badge">
        Every role works the same night. Choose who you clock in as.
      </SectionHeading>
      <Carousel label="Crew roles">
        <CarouselContent gap="1rem">
          {crew.map(([file, role], index) => (
            <CarouselItem key={file} className="w-52">
              <article className="group border bg-paper text-ink">
                <p className="bg-primary px-3 py-1.5 font-sign text-primary-foreground text-xs uppercase tracking-[0.25em]">
                  Night staff
                </p>
                <img
                  src={img(`portraits/${file}.png`)}
                  alt={role}
                  className="aspect-square w-full bg-ink object-cover grayscale transition-[filter] duration-(--duration-slow) group-hover:grayscale-0"
                />
                <div className="p-3">
                  <h3 className="font-display text-xl uppercase leading-tight">{role}</h3>
                  <p className="mt-1 font-sign text-[0.7rem] text-ink/60 uppercase tracking-[0.2em]">
                    ID 04-{String(index + 1).padStart(2, '0')}
                  </p>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-6 flex gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </section>
  )
}

const shots = [
  { src: img('shots/night.png'), alt: 'A figure at the end of the corridor', width: 960, height: 540 },
  { src: img('shots/bodies.png'), alt: 'A body on a gurney at reception', width: 960, height: 540 },
  { src: img('shots/embalming.png'), alt: 'Mixing embalming fluid to the house protocol', width: 960, height: 540 },
  { src: img('shots/paperwork.png'), alt: "The director's office", width: 960, height: 540 },
]

function Media() {
  return (
    <section id="media" className="border-y bg-card/60">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeading sign="Evidence" title="Screenshots" />
        <Gallery images={shots} columns={{ base: 1, sm: 2 }} aspect="16 / 9" gap="1rem" />
      </div>
    </section>
  )
}

const faq = [
  ['When does it come out?', 'When the last body is ready. The game is in development and there is no release date yet.'],
  ['What platforms?', 'PC: Windows and Linux.'],
  ['Can I play alone?', 'Yes. It is built for 1 to 4 players. In online co-op, one player hosts the shift.'],
  ['What languages?', 'English and Spanish, text and interface.'],
  ['How much will it cost?', 'Not announced yet.'],
  ['Who is making it?', 'Rosaires Games, a two-person studio from Rosario and Buenos Aires, Argentina.'],
]

function Faq() {
  return (
    <section id="faq" className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-[1fr_1.4fr] md:py-32">
      <SectionHeading sign="Before you clock in" title="Questions" />
      <Accordion type="single" collapsible>
        {faq.map(([question, answer]) => (
          <AccordionItem key={question} value={question}>
            <AccordionTrigger className="font-sign text-base uppercase tracking-[0.12em]">{question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

function Release() {
  return (
    <section id="release" className="relative isolate overflow-hidden border-t">
      <div className="-z-10 absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#380a09,transparent_70%)]" />
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-28 text-center md:py-40">
        <img src={img('icon_game.png')} alt="" className="mb-8 size-24" />
        <h2 className="font-display text-[clamp(3rem,9vw,6.5rem)] uppercase leading-[0.85]">Dawn is coming</h2>
        <p className="mt-6 text-lead text-muted-foreground">The shift starts soon on PC. No date yet.</p>
        <Button asChild size="lg" variant="outline" className="mt-10">
          <a href="/">Meet the studio behind it</a>
        </Button>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <Navbar01
        sticky
        brand={{ name: 'Final Arrangements', href: '#top', logo: <img src={img('icon_game.png')} alt="" /> }}
        links={[
          { label: 'The shift', href: '#shift' },
          { label: 'Stations', href: '#stations' },
          { label: 'Anomalies', href: '#anomalies' },
          { label: 'Crew', href: '#crew' },
          { label: 'FAQ', href: '#faq' },
        ]}
        secondaryAction={{ label: 'Rosaires Games', href: '/' }}
        primaryAction={{ label: 'Coming soon', href: '#release' }}
      />
      <main>
        <Hero />
        <Shift />
        <Stations />
        <Anomalies />
        <Nights />
        <Crew />
        <Media />
        <Faq />
        <Release />
      </main>
      <Footer01
        brand={{ name: 'Final Arrangements', href: '#top', logo: <img src={img('icon_game.png')} alt="" /> }}
        description="A Rosaires Games production. Every body needs to be ready by dawn."
        socials={[]}
        columns={[
          { title: 'Game', links: [{ label: 'The shift', href: '#shift' }, { label: 'FAQ', href: '#faq' }] },
          { title: 'Studio', links: [{ label: 'Rosaires Games', href: '/' }] },
        ]}
        newsletter={null}
        legal={[]}
        copyright={`© ${new Date().getFullYear()} Rosaires Games`}
        watermark={false}
      />
      <NoiseTexture animated opacity={0.06} className="pointer-events-none fixed inset-0 z-(--z-overlay)" />
      <div aria-hidden className="corruption-vignette pointer-events-none fixed inset-0 z-(--z-overlay)" />
      <CorruptionHud />
    </>
  )
}
