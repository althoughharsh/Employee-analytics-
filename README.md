# Employee Performance and AI Recommendation System

A full-stack MERN application for managing employee performance and providing AI-driven recommendations using OpenRouter API.

## 🎯 Features

- **User Authentication**: Secure signup/login with JWT tokens
- **Employee Management**: Add, view, search, update, and delete employees
- **Performance Tracking**: Track employee performance scores and skills
- **AI-Powered Insights**: Get AI recommendations for employee development and promotion
- **Responsive Design**: Beautiful UI with Tailwind CSS and React animations
- **Protected Routes**: Secure access to employee data with authentication

## 📋 Project Architecture

### MVC Backend Structure (Node.js + Express + MongoDB)
```
server/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── employeeController.js  # Employee CRUD operations
│   └── aiController.js    # AI recommendation logic
├── models/
│   ├── User.js            # User schema
│   └── Employee.js        # Employee schema
├── routes/
│   ├── authRoutes.js      # Auth endpoints
│   ├── employeeRoutes.js  # Employee endpoints
│   └── aiRoutes.js        # AI endpoints
├── middleware/
│   ├── authMiddleware.js  # JWT verification
│   └── errorMiddleware.js # Error handling
└── server.js              # Express app setup
```

### Component-Based Frontend (React + Vite)
```
client/
├── src/
│   ├── pages/
│   │   ├── Login.jsx      # User login
│   │   ├── Signup.jsx     # User registration
│   │   ├── Dashboard.jsx  # Employee list & search
│   │   ├── AddEmployee.jsx  # Add new employee
│   │   └── AIRecommendation.jsx  # AI insights
│   ├── components/
│   │   ├── Navbar.jsx     # Navigation
│   │   └── ProtectedRoute.jsx  # Route protection
│   ├── context/
│   │   └── AuthContext.jsx  # Global auth state
│   ├── utils/
│   │   └── api.js         # API configuration
│   ├── App.jsx            # Main app component
│   └── main.jsx           # App entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- OpenRouter API key for AI features

### Installation

#### 1. Clone & Setup
```bash
# Clone the repository
git clone <repository-url>
cd ESE_AI_FSD

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

#### 2. Configure Environment Variables

**Server (.env)**
```bash
cd server
cp .env.example .env
```
Edit `server/.env`:
```
MONGO_URI=mongodb://localhost:27017/employee-ai-db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
OPENROUTER_API_KEY=your_openrouter_api_key_here
PORT=5000
NODE_ENV=development
```

**Client (.env)**
```bash
cd client
cp .env.example .env
```
Edit `client/.env`:
```
VITE_API_URL=http://localhost:5000
```

#### 3. MongoDB Setup
Ensure MongoDB is running:
```bash
# For local MongoDB
mongod
```
Or use MongoDB Atlas by updating `MONGO_URI` in `server/.env`

#### 4. Get OpenRouter API Key
1. Go to [openrouter.ai](https://openrouter.ai)
2. Sign up and get your API key
3. Add it to `server/.env`

### Running the Application

#### Terminal 1 - Start Backend
```bash
cd server
npm run dev
```
Server runs on: http://localhost:5000

#### Terminal 2 - Start Frontend
```bash
cd client
npm run dev
```
Frontend runs on: http://localhost:5173

### Access the Application
Open your browser and go to: **http://localhost:5173**

## 📚 API Documentation

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login to account

### Employees (Protected)
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Add new employee
- `GET /api/employees/search?department=<name>` - Search by department
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### AI Recommendations (Protected)
- `POST /api/ai/recommend` - Get AI recommendations

All protected endpoints require:
```
Authorization: Bearer <jwt_token>
```

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **API Integration**: OpenRouter (for AI)

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Routing**: React Router v7
- **Animations**: Framer Motion

## 📦 Build & Deploy

### Build Frontend
```bash
cd client
npm run build
```
Output: `client/dist/`

### Environment Variables for Production
Update `.env` files with production values:
- Use MongoDB Atlas URI instead of local
- Set `NODE_ENV=production` for server
- Update `VITE_API_URL` to your production server URL
- Use strong JWT_SECRET

### Deploy Options
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, Railway, Render, AWS
- **Database**: MongoDB Atlas

## 🔐 Security Notes

⚠️ **Before pushing to GitHub:**
1. Never commit `.env` files (use `.env.example`)
2. Use strong JWT_SECRET in production
3. Enable MongoDB authentication
4. Use HTTPS in production
5. Set proper CORS origins
6. Validate all user inputs
7. Use environment-specific configurations

## 🐛 Troubleshooting

### MongoDB Connection Issues
```
Error: connect ECONNREFUSED 127.0.0.1:27017
→ Ensure MongoDB is running or update MONGO_URI to Atlas
```

### JWT Token Errors
```
Error: Not authorized, token failed
→ Check JWT_SECRET matches in .env
```

### API Not Found (404)
```
Error: Cannot POST /api/auth/signup
→ Ensure server is running on port 5000
→ Check VITE_API_URL in client/.env
```

### OpenRouter API Errors
```
Error: Failed to get recommendation from AI
→ Check OPENROUTER_API_KEY is valid
→ Verify API key has sufficient credits
```

## 📝 Scripts

### Server
```bash
npm start    # Run production
npm run dev  # Run with nodemon (development)
```

### Client
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🚀 GitHub Checklist

Before pushing to GitHub:
- [ ] Add `.env` to `.gitignore`
- [ ] Run `npm install` to verify dependencies
- [ ] Test all features locally
- [ ] Create `.env.example` files
- [ ] Update README with setup instructions
- [ ] Verify no hardcoded credentials
- [ ] Remove unnecessary files
- [ ] Add meaningful commit messages
- [ ] Create initial commit with project structure

## 📄 License

ISC

## 👨‍💻 Author

Your Name / Organization

---

**Happy coding! 🎉**

3. **Login**: POST `http://localhost:5000/api/auth/login`. Copy the `token` from the response. Take a screenshot.
4. **Add Employee**: POST `http://localhost:5000/api/employees`. Go to Headers -> Authorization -> Bearer Token (paste token). Body -> raw -> JSON:
   ```json
   {
     "name": "John Doe",
     "email": "john@company.com",
     "department": "Engineering",
     "skills": ["React", "Node.js"],
     "performanceScore": 95,
     "experience": 4
   }
   ```
   Take a screenshot of the successful insertion. Then try inserting the same email again to show the **Duplicate Email Error** screenshot.
5. **Search**: GET `http://localhost:5000/api/employees/search?department=Engineering` (with token). Take a screenshot.
6. **AI**: POST `http://localhost:5000/api/ai/recommend` (with token). Take a screenshot of the structured JSON response.

### 3. UI Testing (Frontend)
1. Open a new terminal, run `cd client` and then `npm run dev`.
2. Open `http://localhost:5173` in your browser.
3. Take screenshots of:
   - The modern Login/Signup page.
   - The Dashboard displaying the employee cards.
   - The Add Employee form.
   - The AI Recommendations page showing the generated insights.

---

## Phase 8: Deployment Guide

### Backend (Render)
1. Push your code to GitHub.
2. Go to [Render](https://render.com) and create a new **Web Service**.
3. Connect your repository. Set Root Directory to `server`.
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add Environment Variables: `MONGO_URI` (Must be an Atlas URI, not localhost), `JWT_SECRET`, `OPENROUTER_API_KEY`.
7. Deploy.

### Frontend (Render or Vercel)
1. Go to Vercel (or Render Static Site).
2. Connect the same repository. Set Root Directory to `client`.
3. Framework Preset: Vite.
4. Add Environment Variable: Change the Axios base URL in your React code from `http://localhost:5000` to your deployed Render backend URL.
5. Deploy.

---

## Convert this to PDF
You can use a markdown-to-pdf converter, or open this file in VSCode, right-click, and select "Markdown PDF: Export (pdf)" if you have the extension installed. This will fulfill Phase 9 perfectly.
#   E m p l o y e e - a n a l y t i c s -  
 