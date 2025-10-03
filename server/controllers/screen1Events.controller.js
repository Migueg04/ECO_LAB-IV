const handleChangeScreenEvent = (req, res) => {
  res.send({ message: "Cambio de pantalla exitoso" });
};

module.exports = {
  handleChangeScreenEvent,
};
