var express = require("express");
var router = express.Router();
const axios = require("axios");

router.use(express.json());

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body.username);

    const formData = new FormData();
    formData.append("username", req.body.username);
    // Realize a solicitação POST para o serviço de autenticação
    await axios
      .post('https://www.mauricio.inf.br/p6/api/authenticate.php', formData)
      .then((dados) => {
        res.json({ token: dados.data.access_token });
      })
      .catch(function (error) {
        console.log(error);
        res.status(401).json({ message: "Credenciais inválidas" });
      });
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error.message);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});

module.exports = router;
