const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3001;

// Middleware
app.use(express.json()); // Allows parsing JSON requests
app.use(cors()); // Enables CORS for cross-origin requests

// Database connection
const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "nodejsdb"
});

// Super Admin Registration
app.post("/superadmin/register", (req, res) => {
    const { name, email, password } = req.body;

    // Insert new super admin into the database
    con.query(
        "INSERT INTO superadmin (name, email, password) VALUES (?, ?, ?)",
        [name, email, password],
        (err, result) => {
            if (err) {
                console.error("Error inserting super admin:", err);
                res.status(500).send({ message: "Internal Server Error" });
            } else {
                console.log("Super Admin registered successfully:", result.insertId);
                res.send({ message: "Super Admin registered successfully", superAdminId: result.insertId });
            }
        }
    );
});

// Super Admin Login
app.post("/superadmin/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Check if the provided email and password match a super admin record
    con.query("SELECT * FROM superadmin WHERE email = ? AND password = ?", [email, password], (err, result) => {
        if (err) {
            console.error("Error fetching super admin:", err);
            res.status(500).send({ message: "Internal Server Error" });
        } else {
            if (result.length > 0) {
                console.log("Super Admin login successful");
                res.send({ message: "Super Admin login successful", superAdminId: result[0].id });
            } else {
                console.log("Super Admin login failed: Incorrect email or password");
                res.status(401).send({ message: "Incorrect email or password" });
            }
        }
    });
});

// Get all Super Admins
app.get("/superadmin", (req, res) => {
    // Fetch all super admins from the database
    con.query("SELECT * FROM superadmin", (err, result) => {
        if (err) {
            console.error("Error fetching super admins:", err);
            res.status(500).send({ message: "Internal Server Error" });
        } else {
            console.log("Super admins fetched successfully");
            res.send(result);
        }
    });
});

// Admin Registration
app.post("/admin/register", (req, res) => {
    const { name, email, password, institute, whatsappnumber } = req.body;

    // Insert new admin into the database
    con.query(
        "INSERT INTO admin (name, email, password, institute, whatsappnumber) VALUES (?, ?, ?, ?, ?)",
        [name, email, password, institute, whatsappnumber],
        (err, result) => {
            if (err) {
                console.error("Error inserting admin:", err);
                res.status(500).send({ message: "Internal Server Error" });
            } else {
                console.log("Admin registered successfully:", result.insertId);
                res.send({ message: "Admin registered successfully", adminId: result.insertId });
            }
        }
    );
});


// Admin Login
app.post("/admin/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Check if the provided email and password match an admin record
    con.query("SELECT * FROM admin WHERE email = ? AND password = ?", [email, password], (err, result) => {
        if (err) {
            console.error("Error fetching admin user:", err);
            res.status(500).send({ message: "Internal Server Error" });
        } else {
            if (result.length > 0) {
                console.log("Admin login successful");
                res.send({ message: "Admin login successful", adminId: result[0].id });
            } else {
                console.log("Admin login failed: Incorrect email or password");
                res.status(401).send({ message: "Incorrect email or password" });
            }
        }
    });
});

// Get all admin users
app.get("/admin", (req, res) => {
    // Fetch all admin users from the database
    con.query("SELECT * FROM admin", (err, result) => {
        if (err) {
            console.error("Error fetching admin users:", err);
            res.status(500).send({ message: "Internal Server Error" });
        } else {
            console.log("Admin users fetched successfully");
            res.send(result);
        }
    });
});


// User registration with details
app.post("/user/register", (req, res) => {
    const { name, email, password, institute, whatsappnumber, address, district, state } = req.body;

    // Insert new user into the database
    con.query(
        "INSERT INTO users (name, email, password, institute, whatsappnumber, address, district, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [name, email, password, institute, whatsappnumber, address, district, state],
        (err, result) => {
            if (err) {
                console.error("Error inserting user:", err);
                res.status(500).send({ message: "Internal Server Error" });
            } else {
                console.log("User registered successfully:", result.insertId);
                res.send({ message: "User registered successfully", userId: result.insertId });
            }
        }
    );
});


// User Login
app.post("/user/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Check if the provided email and password match a user record
    con.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, result) => {
        if (err) {
            console.error("Error fetching user:", err);
            res.status(500).send({ message: "Internal Server Error" });
        } else {
            if (result.length > 0) {
                console.log("User login successful");
                res.send(result);
            } else {
                console.log("User login failed: Incorrect email or password");
                res.status(401).send({ message: "Incorrect email or password" });
            }
        }
    });
});

// Get all users
app.get("/user", (req, res) => {
    // Fetch all users from the database
    con.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.error("Error fetching users:", err);
            res.status(500).send({ message: "Internal Server Error" });
        } else {
            res.send(result);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
