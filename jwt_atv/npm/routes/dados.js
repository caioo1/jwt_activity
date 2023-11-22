const axios = require("axios");
var express = require("express");
var router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const token = req.headers["x_access_token"];
    console.log(token);
    console.log(req.headers);

    const config = {
      headers: {
        Authorization: token,
      },
    };

    await axios
      .get("https://mauricio.inf.br/p6/api/list.php", config)
      .then((dadoss) => {
        res.json({ dados: dadoss.data });
      })
      .catch(function (error) {
        res.status(401).json({ message: "Credenciais inválidas" });
      });
  } catch (error) {
    console.error("Erro ao receber dados!", error.message);
    res.status(500).json({ message: "erro interno no servidor!" });
  }
});

module.exports = router;
