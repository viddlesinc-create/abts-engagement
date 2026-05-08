import { CLIENT_PROFILE } from '@/lib/client-profile';
import { FaqAccordion, type Faq } from '@/components/FaqAccordion';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export type Tier = {
  name: string;
  subtitle: string;
  price: string;
  priceUnit?: string;
  best: string;
  cta: string;
  ctaHref: string;
  badge?: string;
  featured?: boolean;
};

export type Step = { num: number; title: string; body: string };
export type Route = { name: string; meta: string; body: string; chip?: string };
export type Review = { stars: number; text: string; author: string };

export type PillarPageProps = {
  hero: {
    eyebrow?: string;
    title: string;
    subtitle: string;
    pricePill: string;
    primaryCta: string;
    primaryCtaHref: string;
    backgroundImage: string;
  };
  trustBadges: string[];
  howItWorks: Step[];
  ladder: Tier[];
  ladderHeading?: string;
  ladderSubheading?: string;
  included: string[];
  routes?: Route[];
  routesHeading?: string;
  reviews: Review[];
  faqs: Faq[];
  faqHeading: string;
  upsellLines: string[];
  finalCta: {
    title: string;
    subtitle: string;
    href: string;
  };
};

export function PillarPage({ data }: { data: PillarPageProps }) {
  return (
    <>
      <SiteHeader variant="reservations" />
      <main className="flex-1">
        {/* HERO */}
        <section
          className="relative isolate overflow-hidden bg-coast-900 text-sand"
          style={{
            backgroundImage: `linear-gradient(rgba(26,58,92,0.78), rgba(42,77,110,0.72)), url('${data.hero.backgroundImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
            {data.hero.eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-widest text-sand/80">
                {data.hero.eyebrow}
              </p>
            ) : null}
            <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
              {data.hero.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base/relaxed text-sand/90 md:text-lg">
              {data.hero.subtitle}
            </p>
            <div className="mt-7 inline-block rounded-full bg-sunset px-5 py-1.5 text-sm font-bold text-white shadow">
              {data.hero.pricePill}
            </div>
            <div className="mx-auto mt-7 max-w-md">
              <a
                href={data.hero.primaryCtaHref}
                data-intent="upgrade"
                className="block rounded-lg bg-sunset px-7 py-4 text-base font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-sunset-900"
              >
                {data.hero.primaryCta}
              </a>
            </div>
            <p className="mt-5 text-sm text-sand/85">
              📞{' '}
              <a
                href={`tel:${CLIENT_PROFILE.contact.mainPhone}`}
                data-intent="phone"
                className="font-semibold underline-offset-2 hover:underline"
              >
                {CLIENT_PROFILE.contact.mainPhoneDisplay}
              </a>{' '}
              — Call to Book
            </p>
          </div>
        </section>

        {/* TRUST BAR */}
        <div className="border-y border-ink/10 bg-sand/60 px-6 py-5">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-coast-900">
            {data.trustBadges.map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
        </div>

        {/* HOW IT WORKS */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-extrabold text-coast-900 md:text-4xl">How It Works</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {data.howItWorks.map((s) => (
                <div
                  key={s.num}
                  className="rounded-2xl border border-ink/10 bg-sand/30 p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-coast-900 font-display text-xl font-bold text-sand">
                    {s.num}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-coast-900">{s.title}</h3>
                  <p className="mt-2 text-sm text-ink/70">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LADDER */}
        <section className="bg-sand/40 py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-extrabold text-coast-900 md:text-4xl">
              {data.ladderHeading ?? 'Choose Your Experience'}
            </h2>
            {data.ladderSubheading ? (
              <p className="mt-3 max-w-prose text-ink/70">{data.ladderSubheading}</p>
            ) : null}
            <div className="mt-10 grid items-start gap-6 md:grid-cols-3">
              {data.ladder.map((t) => (
                <div
                  key={t.name}
                  className={
                    'relative rounded-2xl border bg-white p-7 transition-shadow ' +
                    (t.featured
                      ? 'border-sunset shadow-xl md:scale-[1.03]'
                      : 'border-ink/10 hover:shadow-md')
                  }
                >
                  {t.badge ? (
                    <span
                      className={
                        'absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider ' +
                        (t.featured
                          ? 'bg-sunset text-white'
                          : 'bg-premium-gold text-ink-900')
                      }
                    >
                      {t.badge}
                    </span>
                  ) : null}
                  <h3 className="text-xl font-bold text-coast-900">{t.name}</h3>
                  <p className="mt-2 text-sm text-ink/70">{t.subtitle}</p>
                  <div className="mt-4 font-display text-4xl font-extrabold text-coast">
                    {t.price}
                    <span className="text-base font-normal text-ink/60">{t.priceUnit ?? ''}</span>
                  </div>
                  <p className="mt-3 min-h-[3rem] text-xs text-ink/60">{t.best}</p>
                  <a
                    href={t.ctaHref}
                    data-intent={t.featured ? 'upgrade' : 'tier'}
                    className={
                      'mt-5 block rounded-lg px-5 py-3 text-center text-sm font-bold transition-colors ' +
                      (t.featured
                        ? 'bg-sunset text-white hover:bg-sunset-900'
                        : 'border-2 border-coast text-coast hover:bg-coast hover:text-sand')
                    }
                  >
                    {t.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT'S INCLUDED */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl font-extrabold text-coast-900 md:text-4xl">What's Included</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {data.included.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-ink/10 bg-sand/30 p-4 text-sm text-ink"
                >
                  <span className="text-sunset" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ROUTES */}
        {data.routes && data.routes.length > 0 ? (
          <section className="bg-sand/40 py-16">
            <div className="mx-auto max-w-5xl px-6">
              <h2 className="text-3xl font-extrabold text-coast-900 md:text-4xl">
                {data.routesHeading ?? 'Recommended Routes'}
              </h2>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {data.routes.map((r) => (
                  <article
                    key={r.name}
                    className="rounded-2xl border border-ink/10 bg-white p-6"
                  >
                    <h3 className="text-lg font-bold text-coast-900">{r.name}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-sunset">
                      {r.meta}
                    </p>
                    <p className="mt-3 text-sm text-ink/70">{r.body}</p>
                    {r.chip ? (
                      <span className="mt-3 inline-block rounded-full bg-coast/10 px-3 py-1 text-xs font-semibold text-coast">
                        {r.chip}
                      </span>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* MID-PAGE CTA */}
        <section className="bg-coast-900 py-12 text-center text-sand">
          <div className="mx-auto max-w-2xl px-6">
            <h2 className="text-2xl font-extrabold md:text-3xl">Ready to Ride?</h2>
            <a
              href={data.hero.primaryCtaHref}
              data-intent="upgrade"
              className="mt-5 inline-block rounded-lg bg-sunset px-7 py-3.5 font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-sunset-900"
            >
              {data.hero.primaryCta}
            </a>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-extrabold text-coast-900 md:text-4xl">
              What Our Guests Say
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {data.reviews.map((r) => (
                <figure
                  key={r.author}
                  className="rounded-2xl border border-ink/10 bg-sand/30 p-6"
                >
                  <div className="text-sunset" aria-label={`${r.stars} stars`}>
                    {'★'.repeat(r.stars)}
                  </div>
                  <blockquote className="mt-3 text-sm italic leading-relaxed text-ink/80">
                    {r.text}
                  </blockquote>
                  <figcaption className="mt-4 text-xs font-semibold text-coast">
                    {r.author}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-sand/40 py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-center text-3xl font-extrabold text-coast-900 md:text-4xl">
              {data.faqHeading}
            </h2>
            <div className="mt-10">
              <FaqAccordion faqs={data.faqs} />
            </div>
          </div>
        </section>

        {/* UPSELL */}
        <section className="bg-white py-12">
          <div className="mx-auto max-w-2xl px-6">
            <div className="rounded-2xl border-2 border-sunset/30 bg-sunset/5 p-7">
              <p className="text-xs font-bold uppercase tracking-wider text-sunset">
                Most guests also add
              </p>
              <ul className="mt-4 space-y-2 text-sm text-ink">
                {data.upsellLines.map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <span className="text-sunset" aria-hidden>
                      ✓
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-ink/60">You can add these at checkout.</p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section
          id="book"
          className="bg-coast-900 py-16 text-center text-sand"
        >
          <div className="mx-auto max-w-2xl px-6">
            <h2 className="text-3xl font-extrabold md:text-4xl">{data.finalCta.title}</h2>
            <p className="mt-4 text-sand/85">{data.finalCta.subtitle}</p>
            <a
              href={data.finalCta.href}
              data-intent="upgrade"
              className="mt-7 inline-block rounded-lg bg-sunset px-7 py-4 font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-sunset-900"
            >
              Reserve Now →
            </a>
          </div>
        </section>
      </main>
      <SiteFooter variant="reservations" />
    </>
  );
}
