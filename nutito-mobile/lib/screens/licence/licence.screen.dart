import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:nutito/components/app-decore.dart';
import 'package:nutito/screens/licence/licence-card.dart';
import 'package:nutito/utils/app-date.dart';
import 'package:nutito/utils/size-const.dart';

import '../../components/shake-transition.dart';
import '../../utils/color-const.dart';

class LicenceScreen extends StatefulWidget {
  LicenceScreen({Key? key}) : super(key: key);

  @override
  State<LicenceScreen> createState() => _LicenceScreenState();
}

class _LicenceScreenState extends State<LicenceScreen> {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Scaffold(
        appBar: AppBar(
          title: Text("Licences"),
          actions: [
            IconButton(onPressed: () {}, icon: Icon(CupertinoIcons.add)),
          ],
          elevation: 0.0,
        ),
        body: SingleChildScrollView(
          padding: EdgeInsets.symmetric(
              vertical: SizeConst.padding, horizontal: SizeConst.padding),
          physics: BouncingScrollPhysics(),
          child: Column(
            children: [
              LicenceCard(),
              AppDecore.submitButton(
                  context, "Rénouveler votre licence", () {}),
              _actions,
              ExpansionTile(
                title: Text("Détail"),
                leading: Icon(CupertinoIcons.info),
                children: [
                  _tile("Coût", "5000 f", Icons.money),
                  _tile("Moyen de payement", "kikiapay", Icons.money),
                  _tile(
                      "Date de création",
                      AppDate.dayDateTimeFormatString.format(DateTime.now()),
                      Icons.timelapse),
                  _tile(
                      "Date début",
                      AppDate.dayDateTimeFormatString.format(DateTime.now()),
                      Icons.timelapse),
                  _tile(
                      "Date expiration",
                      AppDate.dayDateTimeFormatString.format(DateTime.now()),
                      Icons.timelapse),
                  _tile("Durée totale", "1 mois", Icons.timelapse),
                  _tile("Durée restante", "5 jours", Icons.timelapse),
                  _tile("Sattut", "En cours", Icons.star_rate),
                  _tile("Créateur", "Ola BABA", Icons.person),
                  _tile("Bénéficiaire", "Nutito", Icons.person),
                ],
              )
            ],
          ),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {},
          child: Icon(CupertinoIcons.add_circled_solid),
        ));
  }

  _tile(String title, String content, IconData icon) {
    return ListTile(
      title: Text(title),
      subtitle: Text(content),
      leading: Icon(icon),
    );
  }

  get _actions {
    Size size = MediaQuery.of(context).size;

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        ShakeTransition(
          offset: -140,
          child: Card(
            child: Container(
              width: size.width * 0.4,
              height: size.width * 0.4,
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 16),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: const [
                  SizedBox(),
                  Icon(
                    CupertinoIcons.add_circled,
                    size: 32,
                    color: ColorConst.secondary,
                  ),
                  Text(
                    "Renouveler",
                    textAlign: TextAlign.center,
                    textScaleFactor: 1.2,
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: ColorConst.text,
                    ),
                  )
                ],
              ),
            ),
          ),
        ),
        ShakeTransition(
          child: Card(
            child: Container(
              width: size.width * 0.4,
              height: size.width * 0.4,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: const [
                  SizedBox(),
                  Icon(
                    Icons.history,
                    size: 32,
                    color: ColorConst.secondary,
                  ),
                  Text(
                    "Historyque",
                    textAlign: TextAlign.center,
                    textScaleFactor: 1.2,
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: ColorConst.text,
                    ),
                  )
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}
