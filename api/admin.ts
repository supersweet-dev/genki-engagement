import { neon } from "@neondatabase/serverless";
import { timingSafeEqual } from "node:crypto";

type VercelRequest = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  setHeader: (name: string, value: string | string[]) => void;
  end: (body?: string) => void;
  redirect: (statusOrUrl: number | string, url?: string) => void;
};

type RsvpRow = {
  id: number;
  created_at: string;
  event_slug: string;
  event_city: string;
  event_date: string;
  name: string;
  phone: string;
  guests: number;
  attending: boolean;
  overnight_travel: boolean;
  note: string | null;
};

const cookieName = "genki_admin";

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

function getQuery(req: VercelRequest, key: string) {
  const value = req.query?.[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function getCookie(req: VercelRequest, key: string) {
  const header = Array.isArray(req.headers?.cookie) ? req.headers.cookie.join("; ") : req.headers?.cookie ?? "";
  return header
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${key}=`))
    ?.slice(key.length + 1) ?? "";
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

function layout(title: string, body: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>${escapeHtml(title)}</title>
    <style>
      :root {
        --paper: #35e0ec;
        --ink: #000;
        font-family: Copperplate, "Copperplate Gothic Light", "Copperplate Gothic Bold", fantasy;
      }

      * {
        box-sizing: border-box;
      }

      body {
        min-height: 100vh;
        margin: 0;
        background:
          linear-gradient(90deg, rgba(0, 0, 0, 0.09) 1px, transparent 1px) 0 0 / 11px 11px,
          radial-gradient(circle at center, var(--ink) 0 1px, transparent 1px) 0 0 / 7px 7px,
          var(--paper);
        color: var(--ink);
        text-transform: uppercase;
      }

      main {
        width: min(100%, 76rem);
        margin: 0 auto;
        padding: clamp(1rem, 4vw, 3rem);
      }

      h1 {
        margin: 0 0 1rem;
        font-size: clamp(2.8rem, 11vw, 8rem);
        line-height: 0.82;
      }

      h2 {
        margin: 0;
        font-size: clamp(1.6rem, 5vw, 3.4rem);
        line-height: 0.9;
      }

      a,
      button {
        color: inherit;
      }

      .highlight,
      button {
        display: inline-flex;
        width: fit-content;
        background: var(--ink);
        color: var(--paper);
        padding: 0.55rem 0.75rem;
      }

      form {
        display: grid;
        max-width: 32rem;
        gap: 1rem;
        padding: 1rem;
        border: 2px solid var(--ink);
        background: var(--paper);
      }

      label {
        display: grid;
        gap: 0.5rem;
      }

      input,
      button {
        border: 2px solid var(--ink);
        border-radius: 0;
        font: inherit;
        padding: 0.75rem;
      }

      button {
        cursor: pointer;
      }

      .summary {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
        gap: 0.75rem;
        margin: 1.5rem 0;
      }

      .metric,
      .event {
        border: 2px solid var(--ink);
        background: var(--paper);
      }

      .metric {
        padding: 1rem;
      }

      .metric strong {
        display: block;
        font-size: clamp(2rem, 8vw, 4.5rem);
        line-height: 0.85;
      }

      .events {
        display: grid;
        gap: 1rem;
      }

      .event header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 0.75rem;
        border-bottom: 2px solid var(--ink);
        padding: 1rem;
      }

      .event-grid {
        display: grid;
      }

      .rsvp {
        display: grid;
        grid-template-columns: minmax(9rem, 1.2fr) repeat(5, minmax(6rem, 0.8fr));
        gap: 0;
        border-bottom: 2px solid var(--ink);
      }

      .rsvp:last-child {
        border-bottom: 0;
      }

      .rsvp div {
        min-width: 0;
        padding: 0.75rem;
        border-right: 2px solid var(--ink);
        overflow-wrap: anywhere;
      }

      .rsvp div:last-child {
        border-right: 0;
      }

      .label {
        display: block;
        margin-bottom: 0.25rem;
        font-size: 0.7rem;
      }

      .note {
        grid-column: 1 / -1;
        border-top: 2px solid var(--ink);
      }

      .empty {
        padding: 1rem;
      }

      @media (max-width: 760px) {
        .rsvp {
          grid-template-columns: 1fr 1fr;
        }

        .rsvp div:nth-child(2n) {
          border-right: 0;
        }

        .note {
          grid-column: 1 / -1;
        }
      }
    </style>
  </head>
  <body>
    <main>${body}</main>
  </body>
</html>`;
}

function loginPage(message = "") {
  return layout(
    "Admin | Genki RSVP",
    `<h1>RSVP Admin</h1>
    ${message ? `<p class="highlight">${escapeHtml(message)}</p>` : ""}
    <form action="/admin" method="post">
      <label>
        Secret
        <input name="secret" type="password" autocomplete="current-password" required autofocus />
      </label>
      <button type="submit">Enter</button>
    </form>`
  );
}

function adminPage(rows: RsvpRow[]) {
  const attendingRows = rows.filter((row) => row.attending);
  const totalPeople = attendingRows.reduce((sum, row) => sum + row.guests, 0);
  const plusOnes = attendingRows.filter((row) => row.guests > 1).length;
  const overnightYes = rows.filter((row) => row.event_slug === "monterrey" && row.overnight_travel).length;
  const events = Array.from(new Set(rows.map((row) => row.event_slug)));

  const eventSections = events
    .map((slug) => {
      const eventRows = rows.filter((row) => row.event_slug === slug);
      const yesRows = eventRows.filter((row) => row.attending);
      const people = yesRows.reduce((sum, row) => sum + row.guests, 0);
      const eventName = eventRows[0]?.event_city ?? slug;
      const eventDate = eventRows[0]?.event_date ? formatDate(eventRows[0].event_date) : "";

      const rsvps = eventRows
        .map(
          (row) => `<article class="rsvp">
            <div><span class="label">Name</span>${escapeHtml(row.name)}</div>
            <div><span class="label">Phone</span>${escapeHtml(row.phone)}</div>
            <div><span class="label">Attending</span>${row.attending ? "Yes" : "No"}</div>
            <div><span class="label">Guests</span>${row.guests}</div>
            <div><span class="label">Overnight</span>${row.event_slug === "monterrey" ? (row.overnight_travel ? "Yes" : "No") : "-"}</div>
            <div><span class="label">Sent</span>${formatDateTime(row.created_at)}</div>
            ${row.note ? `<div class="note"><span class="label">Note</span>${escapeHtml(row.note)}</div>` : ""}
          </article>`
        )
        .join("");

      return `<section class="event">
        <header>
          <h2>${escapeHtml(eventName)}</h2>
          <span class="highlight">${escapeHtml(eventDate)} / ${yesRows.length} yes / ${people} people</span>
        </header>
        <div class="event-grid">${rsvps || `<p class="empty">No RSVPs yet.</p>`}</div>
      </section>`;
    })
    .join("");

  return layout(
    "Admin | Genki RSVP",
    `<h1>RSVP Admin</h1>
    <p><a class="highlight" href="/admin?logout=1">Log out</a></p>
    <section class="summary" aria-label="Summary">
      <div class="metric"><strong>${rows.length}</strong>Total RSVPs</div>
      <div class="metric"><strong>${attendingRows.length}</strong>Coming</div>
      <div class="metric"><strong>${totalPeople}</strong>Total People</div>
      <div class="metric"><strong>${plusOnes}</strong>Plus Ones</div>
      <div class="metric"><strong>${overnightYes}</strong>Overnight Yes</div>
    </section>
    <div class="events">${eventSections || `<section class="event"><p class="empty">No RSVPs yet.</p></section>`}</div>`
  );
}

function sendHtml(res: VercelResponse, html: string, status = 200) {
  res.status(status);
  res.setHeader("content-type", "text/html; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  res.end(html);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret) {
    sendHtml(res, loginPage("Admin secret is not configured."), 500);
    return;
  }

  if (getQuery(req, "logout") === "1") {
    res.setHeader("set-cookie", `${cookieName}=; Path=/admin; HttpOnly; SameSite=Lax; Max-Age=0`);
    res.redirect(303, "/admin");
    return;
  }

  if (req.method === "POST") {
    const submittedSecret = getField(req.body, "secret");

    if (safeEqual(submittedSecret, adminSecret)) {
      res.setHeader("set-cookie", `${cookieName}=${encodeURIComponent(adminSecret)}; Path=/admin; HttpOnly; SameSite=Lax; Max-Age=604800`);
      res.redirect(303, "/admin");
      return;
    }

    sendHtml(res, loginPage("Wrong secret."), 401);
    return;
  }

  if (req.method && req.method !== "GET") {
    res.status(405);
    res.setHeader("allow", "GET, POST");
    res.end("Method not allowed");
    return;
  }

  const cookieSecret = decodeURIComponent(getCookie(req, cookieName));

  if (!safeEqual(cookieSecret, adminSecret)) {
    sendHtml(res, loginPage());
    return;
  }

  const databaseUrl = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

  if (!databaseUrl) {
    sendHtml(res, loginPage("RSVP storage is not configured."), 500);
    return;
  }

  try {
    const sql = neon(databaseUrl);
    const rows = await sql`
      select
        id,
        created_at,
        event_slug,
        event_city,
        event_date,
        name,
        phone,
        guests,
        attending,
        overnight_travel,
        note
      from rsvps
      order by event_date asc, created_at desc
    `;

    sendHtml(res, adminPage(rows as RsvpRow[]));
  } catch (error) {
    console.error(error);
    sendHtml(res, loginPage("Could not load RSVPs."), 500);
  }
}
