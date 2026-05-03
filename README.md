# Dev Events

The Hub for Every Dev Event You Can't Miss. Hackathons, Meetups, and Conferences, All in One Place.

## Features

- **Event Discovery**: Browse featured and recent developer events.
- **Detailed Event Pages**: Get all the information you need, including venue, date, agenda, and organizer.
- **Similar Events**: Find related events based on tags.
- **Admin API**: Secure endpoint for hosts to post new events with image upload support.
- **Modern Tech Stack**: Built with the latest Next.js features, including Server Components, Server Actions, and the new caching model.
- **Analytics**: Integrated with PostHog for user insights.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (Version 16 experimental)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Version 4)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/)
- **Image Hosting**: [Cloudinary](https://cloudinary.com/)
- **Analytics**: [PostHog](https://posthog.com/)

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB database
- Cloudinary account
- PostHog account (optional)

### Environment Setup

Create a `.env.local` file in the root directory and add the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_URL=your_cloudinary_url
NEXT_PUBLIC_BASE_URL=http://localhost:3000
ADMIN_SECRET_KEY=your_secret_key_for_admin_actions

# Analytics (Optional)
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=your_posthog_token
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd dev-events
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Documentation

### Create Event
- **Endpoint**: `POST /api/events`
- **Headers**: `x-admin-key: <ADMIN_SECRET_KEY>`
- **Body**: `FormData` containing event details and an image file.

## Project Structure

- `actions/`: Server actions for data fetching and mutations.
- `app/`: Next.js App Router pages and API routes.
- `components/`: Reusable React components.
- `database/`: Mongoose schemas and models.
- `lib/`: Utility functions and database connection logic.
- `public/`: Static assets.

## License

This project is licensed under the MIT License.
