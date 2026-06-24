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
    detailPhoto: "/assets/hj-photo3.png",
    details: [
      "Karaoke stop on the engagement tour.",
      "Prepare your best songs and your loudest congratulations.",
      "Booking details landing soon."
    ],
    detailsEs: [
      { es: "Parada de karaoke en el tour de compromiso.", en: "Karaoke stop on the engagement tour." },
      { es: "Prepara tus mejores canciones y tus felicitaciones mas ruidosas.", en: "Prepare your best songs and your loudest congratulations." },
      { es: "Detalles de la reservacion aterrizando pronto.", en: "Booking details landing soon." }
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
    venue: "Quinta La Unión",
    venueEs: "Quinta La Unión",
    address: "Paseo del Rejoneador 944, Col. Campestre del Rejoneador, C.P. 67610, Montemorelos, Nuevo León",
    addressEs: "Paseo del Rejoneador 944, Col. Campestre del Rejoneador, C.P. 67610, Montemorelos, Nuevo León",
    addressHref: "https://maps.app.goo.gl/psvtZNBnCyFoCAR39?g_st=ic",
    time: "Aug 15, 2 PM - Aug 16, 10 AM",
    timeEs: "15 ago, 2 PM - 16 ago, 10 AM",
    rsvpDeadline: "RSVP by July 3",
    rsvpDeadlineEs: "RSVP antes del 3 de julio",
    detailPhoto: "/assets/quinta.jpg",
    details: [
      "Reservation confirmed: Quinta La Unión in Montemorelos.",
      "Arrive Saturday at 2 PM and stay through Sunday checkout at 10 AM.",
      "Pool, palapa, grill, Bluetooth speaker, Wi-Fi, parking, and plenty of green space.",
      "Three air-conditioned bedrooms sleep up to 17, with extra camping space. Pet-friendly. No glass allowed."
    ],
    detailsEs: [
      { es: "Reservación confirmada: Quinta La Unión en Montemorelos.", en: "Reservation confirmed: Quinta La Unión in Montemorelos." },
      { es: "Lleguen el sábado a las 2 PM y quédense hasta el checkout del domingo a las 10 AM.", en: "Arrive Saturday at 2 PM and stay through Sunday checkout at 10 AM." },
      { es: "Alberca, palapa, asador, bocina Bluetooth, Wi-Fi, estacionamiento y mucho espacio verde.", en: "Pool, palapa, grill, Bluetooth speaker, Wi-Fi, parking, and plenty of green space." },
      { es: "Tres recámaras con minisplit para hasta 17 personas, más espacio para camping. Pet-friendly. No se permite vidrio.", en: "Three air-conditioned bedrooms sleep up to 17, with extra camping space. Pet-friendly. No glass allowed." }
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
      "Likely games: Don't Starve Together, Among Us, R.E.P.O., or whatever fits the group.",
      "All three games are paid but may be on sale; Don't Starve Together includes two copies.",
      "Grab some beer or wine if you want!",
      "We will also use the server for wedding updates and official side quests.",
      "Yes, Genki is our ship name and it is cute."
    ],
    detailsEs: [
      { es: "Juegos probables: Don't Starve Together, Among Us, R.E.P.O., o lo que funcione para el grupo.", en: "Likely games: Don't Starve Together, Among Us, R.E.P.O., or whatever fits the group." },
      { es: "Los tres juegos son de paga, pero pueden estar en oferta; Don't Starve Together incluye dos copias.", en: "All three games are paid but may be on sale; Don't Starve Together includes two copies." },
      { es: "¡Compren cerveza o vino si quieren!", en: "Grab some beer or wine if you want!" },
      { es: "También usaremos el servidor para updates de la boda y side quests oficiales.", en: "We will also use the server for wedding updates and official side quests." },
      { es: "Si, Genki es nuestro ship name y esta cute.", en: "Yes, Genki is our ship name and it is cute." }
    ]
  }
];

export function getTourStop(slug: string) {
  return tourStops.find((stop) => stop.slug === slug);
}
