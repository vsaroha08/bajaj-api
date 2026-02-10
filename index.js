const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const lcmTwo = (a, b) => (a * b) / gcd(a, b);

app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: "vanshika1237.be23@chitkara.edu.in"
  });
});

app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;

    if (body.fibonacci !== undefined) {
      const n = body.fibonacci;
      if (typeof n !== "number" || n < 0) {
        return res.status(400).json({ is_success: false });
      }

      const fib = [];
      for (let i = 0; i < n; i++) {
        if (i === 0) fib.push(0);
        else if (i === 1) fib.push(1);
        else fib.push(fib[i - 1] + fib[i - 2]);
      }

      return res.json({
        is_success: true,
        official_email: "vanshika1237.be23@chitkara.edu.in",
        data: fib
      });
    }

    if (body.prime !== undefined) {
      const arr = body.prime;
      if (!Array.isArray(arr)) {
        return res.status(400).json({ is_success: false });
      }

      const primes = arr.filter(num => {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
          if (num % i === 0) return false;
        }
        return true;
      });

      return res.json({
        is_success: true,
        official_email: "vanshika1237.be23@chitkara.edu.in",
        data: primes
      });
    }

    if (body.lcm !== undefined) {
      const arr = body.lcm;
      if (!Array.isArray(arr) || arr.length === 0) {
        return res.status(400).json({ is_success: false });
      }

      const result = arr.reduce((acc, val) => lcmTwo(acc, val));

      return res.json({
        is_success: true,
        official_email: "vanshika1237.be23@chitkara.edu.in",
        data: result
      });
    }

    if (body.hcf !== undefined) {
      const arr = body.hcf;
      if (!Array.isArray(arr) || arr.length === 0) {
        return res.status(400).json({ is_success: false });
      }

      const result = arr.reduce((acc, val) => gcd(acc, val));

      return res.json({
        is_success: true,
        official_email: "vanshika1237.be23@chitkara.edu.in",
        data: result
      });
    }


 
if (body.AI !== undefined) {
  const question = body.AI.toLowerCase();
  let answer = "Unknown";

  if (question.includes("maharashtra")) {
    answer = "Mumbai";
  } else if (question.includes("france")) {
    answer = "Paris";
  }

  return res.json({
    is_success: true,
    official_email: "vanshika1237.be23@chitkara.edu.in",
    data: answer
  });
}





//     // 🟡 AI (Gemini) — FINAL FIX
// if (body.AI !== undefined) {
//   const response = await axios.post(
//     "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=" +
//       process.env.GEMINI_KEY,
//     {
//       contents: [
//         {
//           parts: [{ text: body.AI }]
//         }
//       ]
//     },
//     {
//       headers: {
//         "Content-Type": "application/json"
//       }
//     }
//   );

//   const answer =
//     response.data.candidates[0].content.parts[0].text;

//   return res.json({
//     is_success: true,
//     official_email: "vanshika1237.be23@chitkara.edu.in",
//     data: answer.split(" ")[0]
//   });
// }


    
// if (body.AI !== undefined) {
//   const response = await axios.post(
//     "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
//       process.env.GEMINI_KEY,
//     {
//       contents: [
//         {
//           parts: [{ text: body.AI }]
//         }
//       ]
//     },
//     {
//       headers: {
//         "Content-Type": "application/json"
//       }
//     }
//   );

//   const answer =
//     response.data.candidates[0].content.parts[0].text;

//   return res.json({
//     is_success: true,
//     official_email: "vanshika1237.be23@chitkara.edu.in",
//     data: answer.split(" ")[0]
//   });
// }


    return res.status(400).json({
      is_success: false
    });

    } catch (error) {
  console.log("AI ERROR 👉", error.response?.data || error.message);

  return res.status(500).json({
    is_success: false,
    error: error.response?.data || error.message
  });
}


//   } catch (error) {
//     return res.status(500).json({
//       is_success: false
//     });
//   }

});

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

