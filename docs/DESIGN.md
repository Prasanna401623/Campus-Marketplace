# Campus Marketplace Design Doc

## Goal

Students can list, browse, edit, and delete marketplace listings within the university. The app is not focused on built-in buying or selling flows. Instead, students will contact each other using the details provided in the listing.

## Core Entities

A core entity is one of the main things the app stores and works with.

- User: a student account that can log in and manage listings
- Listing: a marketplace post created by a user

Relationship:
- One user can create many listings
- Each listing belongs to exactly one user

## User Flows

- Register: a student creates an account
- Log in: a student signs in and receives a JWT token
- Browse listings: a student views all available listings
- Create a listing: a logged-in student posts an item
- Edit a listing: the owner updates their own listing
- Delete a listing: the owner removes their own listing

## API Routes

API routes are the URLs the frontend uses to talk to the backend.

Authentication:

- `POST /api/auth/register` - create a new user account
- `POST /api/auth/login` - verify credentials and return a token
- `GET /api/auth/me` - return the currently authenticated user

Listings:

- `GET /api/listings` - return all listings
- `GET /api/listings/:id` - return one listing by id
- `POST /api/listings` - create a new listing
- `PATCH /api/listings/:id` - update an existing listing
- `DELETE /api/listings/:id` - delete a listing

Why these routes make sense:
- `POST` is used when creating data
- `GET` is used when reading data
- `PATCH` is used when updating existing data
- `DELETE` is used when removing data
- `/api` marks the routes as backend API endpoints instead of frontend pages

## Data Model

Start with two tables.

### users

- `id` - primary key
- `name` - user's display name
- `email` - unique login email
- `password_hash` - encrypted password, never plain text
- `created_at` - timestamp for account creation

### listings

- `id` - primary key
- `user_id` - foreign key pointing to `users.id`
- `title` - listing title
- `description` - details about the item
- `price` - asking price
- `category` - item category
- `image_url` - optional image link
- `contact_info` - way for students to reach the seller
- `created_at` - timestamp for when the listing was created
- `updated_at` - timestamp for the last update

## Rules

- Any user can browse listings
- Only logged-in users can create a listing
- Only the owner of a listing can edit it
- Only the owner of a listing can delete it
- The backend must validate required fields before saving data
- The backend must verify ownership before updating or deleting
- The backend should never let the frontend access the database directly

## Error Cases

Common error cases the backend should handle:

- Missing required fields
- Invalid email format
- Incorrect password
- Missing or invalid JWT token
- Listing not found
- User tries to edit or delete someone else's listing
- Unauthorized access

## Thinking About Routes

To design a route, answer these questions:

1. What is the user trying to do?
2. What data comes in?
3. What data should go out?
4. Who is allowed to do it?
5. What database action happens?

Example:

- Route: `POST /api/listings`
- Goal: create a new listing
- Input: title, description, price, category, image URL, contact info
- Output: the created listing
- Allowed: logged-in users only
- Database action: insert a new row into the `listings` table

## Request Flow

The app should demonstrate this lifecycle clearly:

Frontend -> API Request -> Backend Route -> Controller Logic -> Database Query -> API Response -> Frontend Update

That flow is the main learning goal of the project.
