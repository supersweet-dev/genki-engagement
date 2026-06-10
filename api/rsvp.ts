import { neon } from "@neondatabase/serverless";

type VercelRequest = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  setHeader: (name: string, value: string) => void;
  json: (body: unknown) => void;
  end: (body?: string) => void;
  redirect: (statusOrUrl: number | string, url?: string) => void;
};

const eventSlugs = new Set(["minneapolis", "mcallen", "monterrey"]);
const eventsWithOptionalNotes = new Set(["minneapolis", "mcallen"]);

function getField(body: unknown, key: string) {
  if (typeof body === "string") {
    return new URLSearchParams(body).get(key)?.trim() ?? "";
  }

  if (body instanceof URLSearchParams) {
    return body.get(key)?.trim() ?? "";
  }

  if (!body || typeof body !== "object") {
    return "";
  }

  const value = (body as Record<string, unknown>)[key];

  if (Array.isArray(value)) {
    return String(value[0] ?? "").trim();
  }

  return String(value ?? "").trim();
}

function sendError(res: VercelResponse, message: string, status = 400) {
  res.status(status);
  res.setHeader("content-type", "text/html; charset=utf-8");
  res.end(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>RSVP Error</title>
  </head>
  <body>
    <h1>RSVP Error</h1>
    <p>${message}</p>
    <p><a href="/">Back to tour dates</a></p>
  </body>
</html>`);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405);
    res.setHeader("allow", "POST");
    res.end("Method not allowed");
    return;
  }

  const databaseUrl = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

  if (!databaseUrl) {
    sendError(res, "RSVP storage is not configured yet.", 500);
    return;
  }

  const eventSlug = getField(req.body, "event_slug");
  const eventCity = getField(req.body, "event_city");
  const eventDate = getField(req.body, "event_date");
  const name = getField(req.body, "name");
  const phone = getField(req.body, "phone");
  const guests = Number.parseInt(getField(req.body, "guests"), 10);
  const attending = getField(req.body, "attending");
  const overnightTravelAnswer = getField(req.body, "overnight_travel");
  const overnightTravel = overnightTravelAnswer === "yes";
  const note = getField(req.body, "note");
  const website = getField(req.body, "website");
  const userAgent = Array.isArray(req.headers?.["user-agent"])
    ? req.headers?.["user-agent"][0]
    : req.headers?.["user-agent"] ?? "";

  if (website) {
    res.redirect(303, `/rsvp/${eventSlug || "minneapolis"}/thanks`);
    return;
  }

  if (!eventSlugs.has(eventSlug)) {
    sendError(res, "Please choose a valid tour stop.");
    return;
  }

  if (!name || !phone || !Number.isInteger(guests) || guests < 1 || guests > 4) {
    sendError(res, "Please complete your name, phone, and guest count.");
    return;
  }

  if (attending !== "yes" && attending !== "no") {
    sendError(res, "Please tell us whether you can make it.");
    return;
  }

  if (eventSlug === "monterrey" && overnightTravelAnswer !== "yes" && overnightTravelAnswer !== "no") {
    sendError(res, "Please tell us whether you would travel overnight for Monterrey.");
    return;
  }

  if (!eventsWithOptionalNotes.has(eventSlug) && !note) {
    sendError(res, "Please add a song request or note.");
    return;
  }

  try {
    const sql = neon(databaseUrl);

    await sql`
      insert into rsvps (
        event_slug,
        event_city,
        event_date,
        name,
        phone,
        guests,
        attending,
        overnight_travel,
        note,
        user_agent
      )
      values (
        ${eventSlug},
        ${eventCity},
        ${eventDate},
        ${name},
        ${phone},
        ${guests},
        ${attending === "yes"},
        ${overnightTravel},
        ${note || null},
        ${userAgent}
      )
    `;
  } catch (error) {
    console.error(error);
    sendError(res, "We could not save that RSVP. Please try again.", 500);
    return;
  }

  res.redirect(303, `/rsvp/${eventSlug}/thanks`);
}
