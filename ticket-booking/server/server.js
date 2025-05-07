const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const cors = require("cors");
const QRCode = require("qrcode");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const contactRoutes = require('./routes/contact'); 
app.use(contactRoutes); 

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const museumList = {
  Chennai: [
    "Government Museum, Egmore",
    "Children's Museum, Egmore",
    "Birla Planetarium",
    "Fort Museum",
    "Railway Museum",
    
    "Regional Railway Museum, Perambur",
  ],
  Madurai: ["Gandhi Memorial Museum", "Madurai Government Museum"],
  Coimbatore: ["Gass Forest Museum", "Gedee Car Museum"],
  Thanjavur: [
    "Thanjavur Maratha Palace Museum",
    "Raja Serfoji Saraswathi Mahal Library",
  ],
  Kanchipuram: ["Kanchi Kudil Museum", "Archaeological Museum, Kanchipuram"],
  Tiruchirappalli: ["Government Museum, Tiruchirappalli"],
  Salem: ["Government Museum, Salem"],
  Tirunelveli: ["Government Museum, Tirunelveli"],
  Vellore: ["Government Museum, Vellore"],
  Cuddalore: ["Government Museum, Cuddalore"],
  Dindigul: ["Government Museum, Dindigul"],
  Erode: ["Government Museum, Erode"],
  Kanyakumari: ["Government Museum, Kanyakumari", "Wax Museum, Kanyakumari"],
  Namakkal: ["Government Museum, Namakkal"],
  Sivaganga: ["Government Museum, Sivaganga"],
  Theni: ["No museums available in this district."],
  Thoothukudi: ["Government Museum, Thoothukudi"],
  Tiruppur: ["No museums available in this district."],
  Virudhunagar: ["No museums available in this district."],
  Krishnagiri: ["No museums available in this district."],
  Dharmapuri: ["No museums available in this district."],
  Perambalur: ["No museums available in this district."],
  Ariyalur: ["No museums available in this district."],
  Karur: ["Government Museum, Karur"],
  Nagapattinam: ["Government Museum, Nagapattinam"],
  Pudukkottai: ["Government Museum, Pudukkottai"],
  Ramanathapuram: ["Government Museum, Ramanathapuram"],
  Nilgiris: ["Government Museum, Udhagamandalam (Ooty)"],
  Thiruvallur: ["No museums available in this district."],
  Tiruvarur: ["Government Museum, Tiruvarur"],
  Thiruvannamalai: ["Government Museum, Thiruvannamalai"],
  Tirupathur: ["No museums available in this district."],
  Ranipet: ["No museums available in this district."],
  Mayiladuthurai: ["No museums available in this district."],
  Chengalpattu: ["No museums available in this district."],
  Tenkasi: ["No museums available in this district."],
  Kallakurichi: ["No museums available in this district."],
};

let userState = {};

io.on("connection", (socket) => {
  console.log("User connected");

  socket.emit(
    "bot message",
    '👋 Hello! I am PEAS, your guide assistant. Please type "hi" to start the conversation!'
  );

  socket.on("disconnect", () => {
    console.log("User disconnected");
    delete userState[socket.id];
  });

  socket.on("chat message", async (msg) => {
    const userMsg = msg.trim().toLowerCase();
    if (!userState[socket.id]) {
      userState[socket.id] = { step: 0 };
    }

    const state = userState[socket.id];

    switch (state.step) {
      case 0:
        if (userMsg.includes("hi")) {
          socket.emit(
            "bot message",
            "Hi! What district are you in? (e.g., Chennai, Madurai, etc.)"
          );
          state.step++;
        } else {
          socket.emit(
            "bot message",
            'Please type "hi" to start the conversation.'
          );
        }
        break;

      case 1:
        state.district = msg.trim();
        state.formattedDistrict =
          state.district.charAt(0).toUpperCase() +
          state.district.slice(1).toLowerCase();
        if (museumList[state.formattedDistrict]) {
          let museums = museumList[state.formattedDistrict];
          let museumListMessage = museums
            .map((museum, i) => `${i + 1}. ${museum}`)
            .join("\n");
          socket.emit(
            "bot message",
            `Here are the museums in ${state.formattedDistrict}:\n\n${museumListMessage}`
          );
          socket.emit(
            "bot message",
            "Please type the number of the museum you want to visit."
          );
          state.step++;
        } else {
          socket.emit("bot message", "Please enter a valid district name.");
        }
        break;

      case 2:
        
        const selectedNumber = parseInt(msg.trim());
        if (
          isNaN(selectedNumber) ||
          !museumList[state.formattedDistrict][selectedNumber - 1]
        ) {
          socket.emit(
            "bot message",
            "Please enter a valid number from the list."
          );
        } else {
          state.museum =
            museumList[state.formattedDistrict][selectedNumber - 1];
          socket.emit(
            "bot message",
            `Great! What time would you like to visit ${state.museum}? (e.g., 11:00 AM)`
          );
          state.step++;
        }
        break;

      case 3:
        state.time = msg.trim();
        socket.emit("bot message", "How many people are visiting? (e.g., 3)");
        state.step++;
        break;

      case 4:
        if (isNaN(msg.trim())) {
          socket.emit("bot message", "Please type a valid number.");
        } else {
          state.totalPeople = parseInt(msg.trim());
          socket.emit(
            "bot message",
            "How many adults and how many children? (e.g., 2 adults and 1 child)"
          );
          state.step++;
        }
        break;

      case 5:
        const parts = msg.match(/\d+/g);
        if (!parts || parts.length !== 2) {
          socket.emit(
            "bot message",
            'Please reply correctly like "2 adults and 1 child".'
          );
        } else {
          state.adults = parseInt(parts[0]);
          state.children = parseInt(parts[1]);

          for (let i = 1; i <= state.adults; i++) {
            let qrData = `Ticket for ${state.museum} at ${state.time} (Adult ${i})`;
            const qrCode = await QRCode.toDataURL(qrData);
            socket.emit(
              "bot message",
              `🎟️ Ticket for Adult ${i}\n<img src="${qrCode}" alt="QR Code for Adult ${i}">`
            );
          }

          socket.emit(
            "bot message",
            "✅ Your tickets have been booked successfully!\n\nThank you for visiting. Come again later!"
          );
          delete userState[socket.id]; 
        }
        break;
    }
  });
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
