const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); 
const authRouter = require('./routes/auth');
const assignmentsRoutes = require('./routes/assignments'); 
const assignmentsRouter = require('./routes/assignments');
const transfersRouter = require('./routes/transfers');
const transferRoutes = require('./routes/transfers');
const purchasesRoutes = require('./routes/purchases');
const purchasesRouter = require('./routes/purchases');
const dashboardRouter = require('./routes/dashboard');
// Import assignments routes
// Import auth routes

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors({
  origin: "https://army2.vercel.app", // your Vercel frontend URL
}));

app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', authRouter);
app.use('/api', assignmentsRoutes);
app.use('/api/assignments', assignmentsRouter);
app.use('/api', transferRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api', purchasesRoutes);
app.use('/api', dashboardRouter);
app.use('/api/purchases', purchasesRouter);
app.use(express.json()); // Needed to read POST request body




// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
