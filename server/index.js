const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "03964689f5879a98fd5bdd8be35e4b1425b62d2618998c91dc44ca20bf8a9b35c3": 100, 
  //878f0d07f40df3ee93a174553dd30bfcfbd4e5739d28e528fcbf7ac2bae613fa

  "021dd727a622cce8c01cd1c05d67289b13d727c5faf3d09f3d3323c1a8e5a22f71": 50,
   //185c34b5f34bd7701c1f5122f1b2f7ac4cea60f3ffd41302885bd519d0cc4e92
  "02a7141ee9c4c36fdcabff69f89c1bbe32b60f1691ef811da8e032c81e9f85e1c6": 75, 
  //2ee7e3d63c48932be7f96a18bb5e4625cfd1f38afc094bc08b323c490fabdf24

};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
