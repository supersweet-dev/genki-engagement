export type TourStop = {
  slug: string;
  date: string;
  dateLabel: string;
  city: string;
  venue: string;
  address: string;
  time: string;
  rsvpDeadline?: string;
  details: string[];
};

export const tourStops: TourStop[] = [
  {
    slug: "austin",
    date: "2026-07-04",
    dateLabel: "Jul04",
    city: "AUSTIN",
    venue: "Kura Revolving Sushi",
    address: "Austin, TX",
    time: "Details soon",
    details: [
      "Sushi belt rendezvous.",
      "Neon paper, black ink, big feelings.",
      "Final timing and room details will land here."
    ]
  },
  {
    slug: "minneapolis",
    date: "2026-07-17",
    dateLabel: "Jul17",
    city: "MINNEAPOLIS",
    venue: "Shin Karaoke",
    address: "Minneapolis, MN",
    time: "Details soon",
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
    details: [
      "A borderlands night stop.",
      "Come dressed like you found the flyer on a telephone pole.",
      "Final timing and room details will land here."
    ]
  },
  {
    slug: "monterrey",
    date: "2026-08-15",
    dateLabel: "Aug15",
    city: "MONTERREY",
    venue: "Quinta TBD",
    address: "Nuevo Leon, TBD",
    time: "Details soon",
    rsvpDeadline: "RSVP by July 3",
    details: [
      "RSVP by July 3 so we can lock the guest count and choose the right quinta.",
      "Place is TBD in Nuevo Leon, depending on who is in for the overnight adventure.",
      "Pool forecast: bring something you can splash in.",
      "Music and singing forecast: bring a song you are emotionally prepared to defend.",
      "BBQ forecast: smoke, snacks, cold drinks, and a very loud little love party."
    ]
  }
];

export function getTourStop(slug: string) {
  return tourStops.find((stop) => stop.slug === slug);
}
