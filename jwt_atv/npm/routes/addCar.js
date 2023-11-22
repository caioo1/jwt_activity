var express = require("express");
var router = express.Router();
const axios = require("axios");

const url = "https://mauricio.inf.br/p6/api/add.php";

router.post("/", async (req, res, next) => {
  try {
    const token = req.headers["x_access_token"];
    console.log(token);
    console.log(req.headers);

    const config = {
      headers: {
        Authorization: token,
      },
    };

    const { placa, marca, modelo, ano_fabric, cor } = req.body;

    await axios
      .post(
        url,
        {
          placa: placa,
          marca: marca,
          modelo: modelo,
          ano_de_fabricação: ano_fabric,
          cor: cor,
        },
        config
      )
      .then((dadoss) => {
        res.json({ carro_adicionado: dadoss.data });
      })
      .catch(function (error) {
        res.status(401).json({ message: "Carro não adicionado" });
      });
  } catch (error) {
    console.error("Erro ao receber dados!", error.message);
    res.status(500).json({ message: "erro interno no servidor!" });
  }
});

module.exports = router;
