📱 Social Media Backend
A scalable and real-time backend for a social media application, built with Node.js, Express, TypeScript, Prisma, PostgreSQL, and Redis. This project supports features like authentication, user profiles, posts, comments, likes, follows, and real-time notifications.

🚀 Features
User Authentication: Register, login, and secure routes using JWT.

User Profiles: View and update user information.

Posts: Create, read, update, and delete posts.

Comments: Add and manage comments on posts.

Likes: Like and unlike posts.

Follows: Follow and unfollow users.

Notifications: Real-time notifications using Redis Pub/Sub and Socket.IO.

Testing: Ensure code quality with Jest and Supertest.

🛠️ Tech Stack
Backend: Node.js, Express, TypeScript

Database: PostgreSQL, Prisma ORM

Caching & Pub/Sub: Redis

Authentication: JWT, Bcrypt

Real-time: Socket.IO

Testing: Jest, Supertest

📬 API Endpoints
Here are some of the main API endpoints:

Auth:

POST /api/auth/register – Register a new user

POST /api/auth/login – Login and receive a JWT

Users:

GET /api/users/:id – Get user profile

PUT /api/users/:id – Update user profile

Posts:

POST /api/posts – Create a new post

GET /api/posts – Get all posts

GET /api/posts/:id – Get a single post

PUT /api/posts/:id – Update a post

DELETE /api/posts/:id – Delete a post

Comments:

POST /api/posts/:postId/comments – Add a comment to a post

GET /api/posts/:postId/comments – Get comments for a post

Likes:

POST /api/posts/:postId/like – Like a post

DELETE /api/posts/:postId/unlike – Unlike a post

Follows:

POST /api/users/:id/follow – Follow a user

DELETE /api/users/:id/unfollow – Unfollow a user

Notifications:

GET /api/notifications – Get user notifications

Note: All protected routes require a valid JWT token in the Authorization header.

📄 License
This project is licensed under the MIT License.
