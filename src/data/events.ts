export type DetailItem =
  | string
  | {
      text: string;
      href: string;
      label: string;
    };

export type LocalizedDetailItem =
  | {
      es: string;
      en: string;
    }
  | {
      esText: string;
      enText: string;
      href: string;
      esLabel: string;
      enLabel: string;
    };

export type TourStop = {
  slug: string;
  date: string;
  dateLabel: string;
  city: string;
  venue: string;
  venueEs: string;
  address: string;
  addressEs: string;
  addressHref?: string;
  time: string;
  timeEs: string;
  rsvpDeadline?: string;
  rsvpDeadlineEs?: string;
  acceptsRsvp?: boolean;
  showNoteField?: boolean;
  detailPhoto: string;
  details: DetailItem[];
  detailsEs: LocalizedDetailItem[];
};

export const tourStops: TourStop[] = [
  {
    slug: "minneapolis",
    date: "2026-07-17",
    dateLabel: "Jul17",
    city: "MINNEAPOLIS",
    venue: "Shin Karaoke",
    venueEs: "Shin Karaoke",
    address: "Minneapolis, MN",
    addressEs: "Minneapolis, MN",
    time: "Details soon",
    timeEs: "Detalles pronto",
    showNoteField: false,
    detailPhoto: "/assets/hj-photo.png",
    details: [
      "Karaoke stop on the engagement tour.",
      "Bring your best chorus and your loudest congratulations.",
      "Final timing and room details will land here."
    ],
    detailsEs: [
      { es: "Parada de karaoke en el tour de compromiso.", en: "Karaoke stop on the engagement tour." },
      { es: "Trae tu mejor coro y tus felicitaciones mas ruidosas.", en: "Bring your best chorus and your loudest congratulations." },
      { es: "Los detalles finales de hora y cuarto van a caer aqui.", en: "Final timing and room details will land here." }
    ]
  },
  {
    slug: "mcallen",
    date: "2026-07-18",
    dateLabel: "Jul18",
    city: "MCALLEN",
    venue: "17th Street",
    venueEs: "17th Street",
    address: "McAllen, TX",
    addressEs: "McAllen, TX",
    time: "Details soon",
    timeEs: "Detalles pronto",
    showNoteField: false,
    detailPhoto: "/assets/hj-photo2.png",
    details: [
      "A borderlands night stop.",
      "Let's (try) to party like when we were in college.",
      "Let's hit the usuals: Suerte, Flying Walrus, etc... if they still exist?"
    ],
    detailsEs: [
      { es: "Una parada nocturna en la frontera.", en: "A borderlands night stop." },
      { es: "Vamos a intentar pistear como cuando estabamos en la uni.", en: "Let's (try) to party like when we were in college." },
      { es: "Vamos a caerle a los de siempre: Suerte, Flying Walrus, etc... si todavia existen?", en: "Let's hit the usuals: Suerte, Flying Walrus, etc... if they still exist?" }
    ]
  },
  {
    slug: "monterrey",
    date: "2026-08-15",
    dateLabel: "Aug15",
    city: "MONTERREY",
    venue: "RSVP for Quinta",
    venueEs: "RSVP para Quinta",
    address: "Nuevo Leon, TBD",
    addressEs: "Nuevo Leon, por confirmar",
    time: "Details soon",
    timeEs: "Detalles pronto",
    rsvpDeadline: "RSVP by July 3",
    rsvpDeadlineEs: "RSVP antes del 3 de julio",
    detailPhoto: "/assets/hj-photo3.png",
    details: [
      "RSVP by July 3 so we can lock the guest count and choose the right quinta.",
      "Place is TBD in Nuevo Leon, depending on who is in for the overnight adventure.",
      "Forecast: pool splashes, BBQ smoke, too much sun, and singing like the quinta came with a spotlight."
    ],
    detailsEs: [
      { es: "RSVP antes del 3 de julio para cerrar el conteo y escoger la quinta correcta.", en: "RSVP by July 3 so we can lock the guest count and choose the right quinta." },
      { es: "Lugar por confirmar en Nuevo Leon, dependiendo de quien se apunte a la aventura con noche incluida.", en: "Place is TBD in Nuevo Leon, depending on who is in for the overnight adventure." },
      { es: "Pronostico: alberca, humo de BBQ, demasiado sol, y canto como si la quinta viniera con reflector.", en: "Forecast: pool splashes, BBQ smoke, too much sun, and singing like the quinta came with a spotlight." }
    ]
  },
  {
    slug: "discord",
    date: "2026-08-29",
    dateLabel: "Aug29",
    city: "DISCORD",
    venue: "Game Night",
    venueEs: "Noche de Juegos",
    address: "wedding server",
    addressEs: "servidor de la boda",
    addressHref: "https://discord.gg/QSc7EDSyN2",
    time: "Details soon",
    timeEs: "Detalles pronto",
    acceptsRsvp: false,
    detailPhoto: "/assets/hj-photo4.png",
    details: [
      "Game night from wherever your best internet lives.",
      "We will also use the server for wedding updates, tiny announcements, and any side quests that become official.",
      "Yes, Genki is our ship name and it is cute.",
      {
        text: "Meet us in the ",
        href: "https://discord.gg/QSc7EDSyN2",
        label: "wedding server"
      }
    ],
    detailsEs: [
      { es: "Noche de juegos desde donde viva tu mejor internet.", en: "Game night from wherever your best internet lives." },
      { es: "Tambien vamos a usar el servidor para updates de la boda, anuncios chiquitos y side quests que se vuelvan oficiales.", en: "We will also use the server for wedding updates, tiny announcements, and any side quests that become official." },
      { es: "Si, Genki es nuestro ship name y esta cute.", en: "Yes, Genki is our ship name and it is cute." },
      {
        esText: "Caele al ",
        enText: "Meet us in the ",
        href: "https://discord.gg/QSc7EDSyN2",
        esLabel: "servidor de la boda",
        enLabel: "wedding server"
      }
    ]
  }
];

export function getTourStop(slug: string) {
  return tourStops.find((stop) => stop.slug === slug);
}
