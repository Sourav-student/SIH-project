"use client"
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

type CMSCategory = "site" | "tribe" | "festival" | "article";

type HeritageEntry = {
  id: string;
  title: string;
  slug?: string;
  category: CMSCategory;
  shortSummary: string;
  description: string;
  location?: string;
  lat?: number;
  lng?: number;
  images?: string[];
  tags?: string[];
  published?: boolean;
  contributor?: string;
  date?: string;
};

const initialEntries: HeritageEntry[] = [
  {
    id: "betla",
    title: "Betla National Park",
    slug: "betla-national-park",
    category: "site",
    shortSummary:
      "A verdant sanctuary within the Palamau Tiger Reserve known for sal forests and wildlife safaris.",
    description:
      "Betla National Park is part of the Palamau Tiger Reserve. Historically a hunting ground, it now focuses on conservation and eco-tourism with tribal settlements nearby. Known for sal forests, diverse wildlife and guided safaris.",
    location: "Palamu, Jharkhand",
    lat: 24.0529,
    lng: 84.3662,
    images: ["/images/betla.jpg"],
    tags: ["eco", "wildlife", "forest"],
    published: true,
    contributor: "Admin",
    date: "2023-10-01",
  },
  {
    id: "netarhat",
    title: "Netarhat",
    slug: "netarhat",
    category: "site",
    shortSummary:
      "A scenic plateau known for sunrise viewpoints, pine forests and colonial-era bungalows.",
    description:
      "Netarhat is cool climate and panoramic views made it a retreat historically. Today it is popular for sunrise viewpoints, trekking and nature-based tourism.",
    location: "Latehar, Jharkhand",
    images: ["/images/netarhat.jpg"],
    tags: ["viewpoint", "plateau"],
    published: true,
    contributor: "LocalGuide",
    date: "2022-02-14",
  },
  {
    id: "hundru",
    title: "Hundru Falls",
    category: "site",
    shortSummary: "A spectacular waterfall on the Subarnarekha River with strong local folklore.",
    description:
      "Hundru Falls is a seasonal waterfall that attracts families and nature lovers, especially during the monsoon. Several local folk tales are associated with the falls.",
    location: "Ranchi district",
    images: ["/images/hundru.jpg"],
    tags: ["waterfall", "folklore"],
    published: true,
    contributor: "VisitorA",
    date: "2022-08-05",
  },
  {
    id: "deoghar",
    title: "Deoghar (Baidyanath Temple)",
    category: "site",
    shortSummary:
      "One of the 12 Jyotirlinga pilgrimage sites; draws large crowds during Shravan.",
    description:
      "Deoghar is tourism history is dominated by religious visits. Seasonal markets and a centuries-old temple tradition shape the city is cultural calendar.",
    location: "Deoghar",
    images: ["/images/deoghar.jpg"],
    tags: ["pilgrimage", "religion"],
    published: true,
    contributor: "ResearcherB",
    date: "2021-07-20",
  },
  {
    id: "santhal",
    title: "Santhal (Tribal Profile)",
    category: "tribe",
    shortSummary:
      "The Santhal community is celebrated for music, dance and vibrant mural traditions.",
    description:
      "One of India is largest tribal communities, Santhals maintain rich musical traditions, festivals like Sohrai and distinct agricultural practices. Preserving and sharing their oral traditions is central to cultural conservation.",
    images: ["/images/santhal.jpg"],
    tags: ["tribe", "music", "festival"],
    published: true,
    contributor: "AnthropologyDept",
    date: "2020-03-10",
  },
];

export default function HistoryPage() {
  const [entries, setEntries] = useState<HeritageEntry[]>(initialEntries);

  return (
    <>
      <section className="bg-gradient-to-r from-orange-400 to-red-400 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold">History & Heritage — Jharkhand</h1>
              <p className="mt-3 max-w-2xl">
                Discover tribal traditions, historical evolution, and eco-cultural sites. Respectful, verified
                stories and images from local communities and visitors.
              </p>
            </div>
            <div className="w-full md:w-1/3">
              <div className="rounded-lg overflow-hidden shadow-lg bg-white/20 p-4">
                <p className="text-sm">Quick facts</p>
                <ul className="mt-2 text-sm">
                  <li>• Diverse tribal communities (Santhal, Munda, Ho, Oraon)</li>
                  <li>• Important eco-sites (Betla, Netarhat, Hundru)</li>
                  <li>• Conservation & sustainable tourism focus</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW + TIMELINE */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-lg p-6 shadow">
            <h2 className="text-2xl font-semibold mb-3">Cultural Overview</h2>
            <p className="mb-4">
              Jharkhand is cultural fabric is woven by tribal communities, oral traditions, handicrafts and rituals.
              This page preserves and shares those stories while providing practical tips for eco-responsible visitors.
            </p>

            <h3 className="text-lg font-medium mt-4 mb-2">Key Traditions & Festivals</h3>
            <div className="flex flex-wrap gap-2">
              {["Sohrai", "Sarhul", "Karma", "Chait Parab"].map((f) => (
                <span key={f} className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm">
                  {f}
                </span>
              ))}
            </div>

            <h3 className="text-lg font-medium mt-6 mb-2">Tourism History — Timeline</h3>
            <ol className="border-l-2 border-emerald-200 ml-4 pl-6 space-y-4">
              <li>
                <div className="text-sm text-emerald-600 font-semibold">Pre-colonial & Colonial era</div>
                <div className="text-sm">Local pilgrimage sites and forest retreats documented by early travellers.</div>
              </li>
              <li>
                <div className="text-sm text-emerald-600 font-semibold">Post-Independence</div>
                <div className="text-sm">Infrastructure growth; nature reserves like Betla gained attention.</div>
              </li>
              <li>
                <div className="text-sm text-emerald-600 font-semibold">1990s–2010s</div>
                <div className="text-sm">Eco-tourism awareness, wildlife safaris and trekking routes emerged.</div>
              </li>
              <li>
                <div className="text-sm text-emerald-600 font-semibold">2010s–Present</div>
                <div className="text-sm">Digital promotion and community-driven tourism; focus on sustainability.</div>
              </li>
            </ol>
          </div>

          {/* QUICK TIPS CARD */}
          <aside className="bg-white rounded-lg p-6 shadow">
            <h3 className="font-semibold mb-3">Visitor Tips</h3>
            <ul className="space-y-2 text-sm">
              <li>• Best time: Oct–Mar (monsoon for waterfalls)</li>
              <li>• Respect sacred groves and local customs</li>
              <li>• Buy crafts directly from artisans</li>
              <li>• Avoid single-use plastics</li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}