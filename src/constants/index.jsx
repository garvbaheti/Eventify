import { Bell, Download, SquarePen, Ticket, Users } from "lucide-react";
import { GlobeLock } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";


export const navItems = [
  { label: "Features", href: "about" },
  { label: "Know How", href: "workflow" },
  { label: "Developers", href: "developers" },
  { label: "Contact Us", href: "contactus" },
];



export const features = [

  {
    icon: <SquarePen />,
    text: "Easy Event Creation",
    description:
      "Effortlessly craft events with our intuitive tools. Simplify event creation and reach your audience seamlessly. Easy event planning, perfected",
  },
  {
    icon: <Ticket />,
    text: "Seamless Register for event",
    description:
      "Effortlessly register for any event. Simplify event outreach and connect with your audience effortlessly",
  },
  {
    icon: <GlobeLock />,
    text: "Flexible Event Privacy",
    description:
      "Customize event privacy effortlessly. Tailor your event's visibility to suit your needs with our flexible privacy options",
  },

];

export const checklistItems = [
  {
    title: "Sign Up by creating your account",
    description:
      "This will help in tracking the events of a person and will help in smooth management",
  },
  {
    title: "Fill up a simple form to create your event",
    description:
      "By this the user can give necessary details of the event.",
  },
  {
    title: "Register for Event",
    description:
      "Eventify also provides a options for attendees to register",
  },
];

export const pricingOptions = [
  {
    title: "Free",
    image: user1,
    name: "Rahul Jyoti Mishra",
    features: [

    ],
  },
  {
    title: "Pro",
    image: user2,
    name: "Shubham Sharma",
    features: [

    ],
  },
  {
    title: "",
    image: user3,
    name: "Anurudh Gupta",
    features: [

    ],
  },
  {
    title: "Enterprise",
    image: user4,
    name: "Garv Baheti",
    features: [

    ],
  },
];


