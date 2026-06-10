export type DetailItem =
  | string
  | {
      text: string;
      href: string;
      label: string;
    };

export type TourStop = {
  slug: string;
  date: string;
  dateLabel: string;
  city: string;
  venue: string;
  address: string;
  addressHref?: string;
  time: string;
  rsvpDeadline?: string;
  acceptsRsvp?: boolean;
  showNoteField?: boolean;
  detailPhoto: string;
  details: DetailItem[];
};

export const tourStops: TourStop[] = [
  {
    slug: "minneapolis",
    date: "2026-07-17",
    dateLabel: "Jul17",
    city: "MINNEAPOLIS",
    venue: "Shin Karaoke",
    address: "Minneapolis, MN",
    time: "Details soon",
    showNoteField: false,
    detailPhoto: "/assets/hj-photo.png",
    details: [
      "Karaoke stop on the engagement tour.",
      "Bring your best chorus and your loudest congratulations.",
      "Final timing and room details will land here."
    ]
  },
  {
    slug: "mcallen",
    date: "2026-07-18",
    dateLabel: "Jul18",
    city: "MCALLEN",
    venue: "17th Street",
    address: "McAllen, TX",
    time: "Details soon",
    showNoteField: false,
    detailPhoto: "/assets/hj-photo2.png",
    details: [
      "A borderlands night stop.",
      "Let's (try) to party like when we were in college.",
      "Let's hit the usuals: Suerte, Flying Walrus, etc... if they still exist?"
    ]
  },
  {
    slug: "monterrey",
    date: "2026-08-15",
    dateLabel: "Aug15",
    city: "MONTERREY",
    venue: "RSVP for Quinta",
    address: "Nuevo Leon, TBD",
    time: "Details soon",
    rsvpDeadline: "RSVP by July 3",
    detailPhoto: "/assets/hj-photo3.png",
    details: [
      "RSVP by July 3 so we can lock the guest count and choose the right quinta.",
      "Place is TBD in Nuevo Leon, depending on who is in for the overnight adventure.",
      "Pool forecast: bring something you can splash in.",
      "Music and singing forecast: bring a song you are emotionally prepared to defend.",
      "BBQ forecast: smoke, snacks, and cold drinks."
    ]
  },
  {
    slug: "discord",
    date: "2026-08-29",
    dateLabel: "Aug29",
    city: "DISCORD",
    venue: "Game Night",
    address: "wedding server",
    addressHref: "https://discord.gg/QSc7EDSyN2",
    time: "Details soon",
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
    ]
  }
];

export function getTourStop(slug: string) {
  return tourStops.find((stop) => stop.slug === slug);
}
