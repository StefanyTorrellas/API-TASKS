const diffMinutes = (fechaToken) => {
  var date = new Date();
  var fechaToken = new Date(fechaToken);
  var diffMins = date - fechaToken; // milliseconds between now & Christmas

  var diffMins = Math.round(((diffMins % 86400000) % 3600000) / 60000); // minutes
  return diffMins;
};

module.exports = {
  diffMinutes,
};
