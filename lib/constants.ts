export type EventItem = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events: EventItem[] = [
  {
    title: 'Next.js Conf 2026',
    image: '/images/event1.png',
    slug: 'nextjs-conf-2026',
    location: 'San Francisco, CA',
    date: 'October 25, 2026',
    time: '09:00 AM',
  },
  {
    title: 'React Summit 2026',
    image: '/images/event2.png',
    slug: 'react-summit-2026',
    location: 'Amsterdam, Netherlands',
    date: 'June 14, 2026',
    time: '10:00 AM',
  },
  {
    title: 'AI & ML Hackathon',
    image: '/images/event3.png',
    slug: 'ai-ml-hackathon',
    location: 'New York, NY',
    date: 'July 12, 2026',
    time: '08:00 AM',
  },
  {
    title: 'DevOps World 2026',
    image: '/images/event4.png',
    slug: 'devops-world-2026',
    location: 'Austin, TX',
    date: 'September 20, 2026',
    time: '09:30 AM',
  },
  {
    title: 'Web Security Summit',
    image: '/images/event5.png',
    slug: 'web-security-summit',
    location: 'London, UK',
    date: 'November 05, 2026',
    time: '11:00 AM',
  },
  {
    title: 'JavaScript Global Meetup',
    image: '/images/event6.png',
    slug: 'js-global-meetup',
    location: 'Remote',
    date: 'December 10, 2026',
    time: '06:00 PM',
  },
];
