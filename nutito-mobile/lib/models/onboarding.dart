class Onboarding {
  late String title;
  late String content;
  late String image;
  bool isSvg = false;
  Onboarding({
    required this.title,
    required this.content,
    required this.image,
    this.isSvg = false,
  });

  static Onboarding get first {
    return Onboarding(
        title: "Bulan",
        content: "Obtenez le bulan de vos opérations au jour le jour",
        image: "assets/images/revenue.gif",
        isSvg: false);
  }

  static Onboarding get second {
    return Onboarding(
        title: "Historique",
        content: "Obtenez l'history de vos opérations en un clique",
        image: "assets/images/invoice.gif");
  }

  static Onboarding get third {
    return Onboarding(
        title: "Impresseion",
        content:
            "Téléchargez le pdf de vos opérations à distance à n'importe quel moment",
        image: "assets/images/spreadsheets.gif");
  }
}
