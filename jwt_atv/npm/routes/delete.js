var express = require("express");
var router = express.Router();
const axios = require("axios");

router.use(express.json());

router.delete("/", async (req, res, next) => {
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
      .delete("https://mauricio.inf.br/p6/api/del.php", config)
      .then((dadoss) => {
        res.json({ mensagem: dadoss.data });
      })
      .catch(function (error) {
        res.status(401).json({ message: "Não foi possível deletar o veículo" });
      });
  } catch (error) {
    console.error("Erro ao receber dados!", error.message);
    res.status(500).json({ message: "erro interno no servidor!" });
  }
});

module.exports = router;
