import type { Service } from '../types'

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="flex h-20 w-full flex-col items-center justify-center rounded-[8px] border border-black bg-white">
      <div
        className="flex flex-col items-center"
        style={{
          gap: service.gap,
          // Figma holds the shave tile's content 1.5px above centre.
          paddingBottom: service.id === 'shave' ? 3 : 0,
        }}
      >
        <span
          className="relative block shrink-0"
          style={{ width: service.frame.width, height: service.frame.height }}
        >
          <img
            src={service.icon}
            alt=""
            className="absolute inset-0 m-auto max-w-none"
            style={{ width: service.glyph.width, height: service.glyph.height }}
          />
        </span>

        <span className="text-center text-[10px] leading-[12px] font-medium whitespace-nowrap text-bookly-teal">
          {service.label}
        </span>
      </div>
    </div>
  )
}

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section id="services" aria-labelledby="services-heading" className="mt-5">
      <h2
        id="services-heading"
        className="px-5 text-right text-[16px] leading-[19px] font-black text-black"
      >
        الخدمات
      </h2>

      <ul className="mt-4 flex items-start justify-between px-5">
        {services.map((service) => (
          <li key={service.id} className="w-[70px] max-[359px]:w-16 hover:scale-105 transition-transform">
            <ServiceCard service={service} />
          </li>
        ))}
      </ul>
    </section>
  )
}
