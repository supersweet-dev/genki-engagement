alter table rsvps
  drop constraint if exists rsvps_event_slug_check;

alter table rsvps
  add constraint rsvps_event_slug_check
  check (event_slug in ('minneapolis', 'mcallen', 'monterrey', 'discord'));
