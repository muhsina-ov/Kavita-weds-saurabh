import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import paper from "@/assets/paper.jpg";
import { ActionBar } from "@/components/invite/ActionBar";
import { AddToCalendar } from "@/components/invite/AddToCalendar";
import { Countdown } from "@/components/invite/Countdown";
import { Envelope } from "@/components/invite/Envelope";
import { Hero } from "@/components/invite/Hero";
import { InviteFooter } from "@/components/invite/InviteFooter";
import { Note } from "@/components/invite/Note";
import { ScrollThread } from "@/components/invite/ScrollThread";
import { Venue } from "@/components/invite/Venue";
import { AudioPlayer } from "@/components/invite/AudioPlayer";
import { invite } from "@/config/invite";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const title = `${invite.groom} & ${invite.bride} — ${invite.dayLine.split(",")[1]?.trim() ?? invite.dateLabel}`;
const description = `${invite.groom} & ${invite.bride} invite you to celebrate their wedding on ${invite.dayLine} at ${invite.venue.name}, ${invite.venue.city}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${title} · Wedding Invitation` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} · Wedding Invitation` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Invitation,
});

function Invitation() {
  useSmoothScroll();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <AudioPlayer autoPlayTrigger={opened} />
      <Envelope onOpen={() => setOpened(true)} />
      <ScrollThread />
      <main
        className="grain relative min-h-screen bg-paper text-ink"
        style={{ backgroundImage: `url(${paper})`, backgroundSize: "480px" }}
      >
        <Hero ready={opened} />
        <Note />
        <Countdown />
        <Venue />
        <AddToCalendar />
        <InviteFooter />
      </main>
      <ActionBar />
    </>
  );
}
