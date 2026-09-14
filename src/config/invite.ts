// ─────────────────────────────────────────────────────────────
// EDIT THIS FILE ONLY when cloning this template for a client.
// ─────────────────────────────────────────────────────────────

export const invite = {
  bride: "Kavita",
  groom: "Saurabh",
  /** Shown big in the hero */
  dateLabel: "15.11.26",
  /** Local start / end of the main function (ISO, no timezone) */
  start: "2026-11-15T10:30:00",
  end: "2026-11-15T16:00:00",
  /** IANA timezone of the venue */
  timeZoneOffset: "+05:30",
  dayLine: "Sunday, 15th November 2026",
  timeLine: "10:30 AM onwards",
  eventTitle: "Wedding of Saurabh & Kavita",
  invitationNote:
    "Together with their families, Kavita and Saurabh invite you to share in the joy of their wedding — a celebration of love, laughter, and lifelong blessings.",
  venue: {
    name: "Exotica Wedding Lawn",
    address: "Near Yeour, Bendipada, Yeoor Hills, Thane, Maharashtra 400606",
    city: "Thane, Mumbai",
    /** Used for the Google Maps deep link */
    query: "Exotica wedding Lawn, near Yeour, Bendipada, Yeoor Hills, Thane, Maharashtra 400606",
    lat: 19.2355,
    lng: 72.923,
  },
  closing: "See you there",
  bgm: {
    title: "Kadhi Tu",
    artist: "Avinash Vishwajeet, Hrishikesh Ranade",
    src: "/bgm.mp3",
    spotifyUrl: "https://open.spotify.com/track/4HiQt4ehQpZEbNFuVzxfvi",
  },
} as const;

export const mapsUrl = "https://maps.app.goo.gl/BSK4BFJsdt76qSGi9?g_st=ic";

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  invite.venue.query,
)}`;
