const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();
const pool = mysql.createPool({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: "sqltester",
  password: process.env.PASSWORD,
  connectionLimit: 10,
});

const http = require('http');
const server = http.createServer(app); // Create an HTTP server instance
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
  }
}); // Initialize Socket.IO with the HTTP server


const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "API управления тикетами",
      version: "0.1.0",
      description:
        "Это простое приложение CRUD API, созданное с помощью Express и документированное с помощью Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://89.38.128.168:8080",
      },
    ],
  },
  apis: ["./routes/*.yaml"],
};

const specs = swaggerJsdoc(options);

app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use("/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true }));

app.post("/ticket", (req, res) => {
  const ticket = req.body;
  pool.query(
    "insert into ticket (`summary`,`priority`, `content`, `status`, `from`) value (?,?,?,?,?)",
    [ticket.summary, ticket.priority, ticket.content, 'Created', ticket.from],
    (error, result) => {
      if (error) {
        console.error(error);
        res.send(error);
        return;
      }

      res.send({ ...ticket, id: result.insertId });
    }
  );
});

app.put("/ticket/:id", (req, res) => {
  const id = req.params.id;
  const ticket = req.body;
  pool.query(
    "update ticket set ? where id = ?",
    [ticket, id],
    (error, result) => {
      if (error) {
        console.error(error);
        res.send(error);
        return;
      }

      res.send({ ...ticket, id });
    }
  );
});

app.get("/ticket/user/:username", (req, res) => {
  const username = req.params.username;

  pool.query("SELECT * FROM ticket WHERE `from` = ?", [username], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send({ message: 'Error fetching tickets for the user', error });
    }

    res.send(results);
  });
});

app.delete("/ticket/:id", (req, res) => {
  const id = req.params.id;
  pool.query("delete from ticket where id = ?", [id], (error, result) => {
    if (error) {
      console.error(error);
      res.send(error);
      return;
    }

    res.send({ message: "Success" });
  });
});

app.get("/ticket/all", (req, res) => {
  pool.query("select * from ticket", (error, result) => {
    if (error) {
      console.error(error);
      res.send(error);
      return;
    }

    res.send(result);
  });
});



app.get("/ticket/:id", (req, res) => {
  const id = req.params.id;
  pool.query("select * from ticket where id = ?", [id], (error, result) => {
    if (error) {
      console.error(error);
      res.send(error);
      return;
    }

    res.send(result);
  });
});

app.post('/register', async (req, res) => {
  const { email, login, password, full_name, user_type } = req.body;

  if (!email || !login || !password || !full_name) {
      return res.status(400).send({ message: 'All fields are required' });
  }

  // const hashedPassword = await bcrypt.hash(password, 10);

  pool.getConnection((err, connection) => {
      if (err) throw err;
      const query = 'INSERT INTO users (email, login, password, full_name, user_type) VALUES (?, ?, ?, ?, ?)';
      connection.query(query, [email, login, password, full_name, user_type], (error, results) => {
          connection.release();
          if (error) {
              return res.status(500).send({ message: 'Error in registering user', error });
          }
          res.status(201).send({ message: 'User registered successfully', userId: results.insertId });
      });
  });
});

app.post('/login', async (req, res) => {
  const { login, password } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    const query = 'SELECT * FROM users WHERE login = ?';
    connection.query(query, [login], async (error, results) => {
      connection.release();
      if (error || results.length === 0) {
        return res.status(401).send({ message: 'Invalid login credentials' });
      }

      const user = results[0];
      if (password == user.password) {
        // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const token = Date.now();
        res.send({ message: 'Login successful', token, user:  user});
      } else {
        res.status(401).send({ message: 'Invalid login credentials' });
      }
    });
  });
});

app.put('/user/:id', async (req, res) => {
  const { email, full_name, password } = req.body;
  const userId = req.params.id;
  console.log(req.body)

  // let hashedPassword = null;
  // if (password) {
  //   hashedPassword = await bcrypt.hash(password, 10);
  // }

  pool.getConnection((err, connection) => {
    if (err) throw err;
    const query = 'UPDATE users SET email = ?, full_name = ?, password = ? WHERE id = ?';
    connection.query(query, [email, full_name, password, userId], (error, results) => {
      connection.release();
      if (error) {
        return res.status(500).send({ message: 'Error updating user data', error });
      }
      res.send({ message: 'User data updated successfully'});
    });
  });
});

app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;

  // if (req.body.id !== parseInt(userId, 10)) {
  //   return res.status(403).send({ message: 'Forbidden' });
  // }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error connecting to the database', error: err });
    }

    const query = 'SELECT id, email, login, full_name, user_type FROM users WHERE id = ?';
    connection.query(query, [userId], (error, results) => {
      connection.release();

      if (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error fetching user data', error });
      }

      if (results.length === 0) {
        return res.status(404).send({ message: 'User not found' });
      }

      const user = results[0];
      res.send({ user });
    });
  });
});

app.post('/send-message', (req, res) => {
  const { user_id, message } = req.body;

  if (!user_id || !message) {
    return res.status(400).send({ message: 'User ID and message are required' });
  }

  pool.getConnection((err, connection) => {
    if (err) throw err;
    const query = 'INSERT INTO messages (user_id, message) VALUES (?, ?)';
    connection.query(query, [user_id, message], (error, results) => {
      connection.release();
      if (error) {
        return res.status(500).send({ message: 'Error in sending message', error });
      }
      res.status(201).send({ message: 'Message sent successfully' });
    });
  });
});

app.get('/chat-history', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const query = 'SELECT * FROM messages ORDER BY timestamp ASC';
    connection.query(query, (error, results) => {
      connection.release();
      if (error) {
        return res.status(500).send({ message: 'Error retrieving chat history', error });
      }
      res.status(200).send(results);
    });
  });
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('send_message', (data) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const query = 'INSERT INTO messages (user_id, message) VALUES (?, ?)';
      connection.query(query, [user_id, message], (error, results) => {
        connection.release();
        if (error) {
          return res.status(500).send({ message: 'Error in sending message', error });
        }
        res.status(201).send({ message: 'Message sent successfully' });
      });
    });
    // Then broadcast the message
    io.emit('new_message', data); // Broadcasts the message to all connected users
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Chat running on port 3000');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
