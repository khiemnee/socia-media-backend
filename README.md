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

📌 Auth Routes (/api/auth)

POST /register – Register new user with avatar upload

POST /login – User login

POST /refreshToken – Refresh JWT access token

POST /logOut – Logout and clear token (requires auth)

GET /me – Get current user info (requires auth)

👤 User Routes (/api/user)

GET /:id – Get user by ID (requires auth)

PUT /updateProfile – Update user profile, including avatar upload (requires auth)

POST /follow/:id – Follow a user by ID (requires auth)

DELETE /unfollow/:id – Unfollow a user by ID (requires auth)

GET /following/:id – Get list of users that a user is following (requires auth)

GET /followers/:id – Get list of users that follow a user (requires auth)

📝 Post Routes (/api/posts)

POST /create – Create a new post (requires auth)

GET / – Get all posts with optional filters (requires auth)

GET /get/:id – Get a specific post by ID (requires auth)

PUT /update/:id – Update a post by ID (author only)

DELETE /delete/:id – Delete a post by ID (author or admin)

POST /like/:id – Like a post (requires auth)

DELETE /unlike/:id – Unlike a post (requires auth)

GET /feed – Get posts from followed users (requires auth)

💬 Comment Routes (/api/comment)

POST /create/:id – Add a comment to a post by post ID (requires auth)

GET /post/:id – Get all comments of a post by post ID (requires auth)

PUT /update/:id/:postId – Update a comment by comment ID and post ID (requires auth, author only)

DELETE /delete/:id/:postId – Delete a comment by comment ID and post ID (requires auth, author or admin)

🔔 Notification Routes (/api/notifications)

GET / – Get all notifications for the authenticated user (requires auth)

PUT /update/:id – Mark a notification as read by ID (requires auth)

DELETE /delete/:id – Delete a notification by ID (requires auth)

Note: All protected routes require a valid JWT token in the Authorization header.

📄 License
This project is licensed under the MIT License.
