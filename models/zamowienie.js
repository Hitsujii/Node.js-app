class Zamowienie {
    constructor(id, pozycje, dataZamowienia, status, cenaCalkowita) {
      this.id = id;
      this.pozycje = pozycje;
      this.dataZamowienia = dataZamowienia;
      this.status = status;
      this.cenaCalkowita = cenaCalkowita;
    }
  }
  
  module.exports = Zamowienie;
  