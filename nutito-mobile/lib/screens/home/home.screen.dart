import 'package:badges/badges.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:nutito/components/app-decore.dart';
import 'package:nutito/components/opacity-animation.dart';
import 'package:nutito/components/shake-transition.dart';
import 'package:nutito/utils/app-date.dart';
import 'package:nutito/utils/app-util.dart';
import 'package:syncfusion_flutter_gauges/gauges.dart';

import '../../utils/color-const.dart';
import 'home-action.dart';
import 'home-bilan.dart';

class HomeScreen extends StatefulWidget {
  HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String anotation = "20.000.000.000 f";
  var periode = "01/08 - 31/08";

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      appBar: _appBar,
      endDrawer: Drawer(child: Container()),
      body: SingleChildScrollView(
        padding: const EdgeInsets.only(top: 8, left: 16, right: 16, bottom: 25),
        child: Column(
          children: [
            HomeBilan(),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                ShakeTransition(
                  offset: -140,
                  child: Card(
                    child: Container(
                      width: size.width * 0.4,
                      height: size.width * 0.4,
                      padding:
                          EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: const [
                          SizedBox(),
                          Icon(
                            CupertinoIcons.eye,
                            size: 32,
                            color: ColorConst.secondary,
                          ),
                          Text(
                            "Vos Opérations",
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
                            CupertinoIcons.add,
                            size: 32,
                            color: ColorConst.secondary,
                          ),
                          Text(
                            " Nouvelle Opération",
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
            ),
            Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(height: 20),
                AppOpacityAnimation(
                  child: AppDecore.getTitle("Licence",
                      color: ColorConst.text,
                      align: TextAlign.start,
                      scal: 1.2),
                ),
                Row(
                  children: [
                    _getAction("Statut", CupertinoIcons.eye,
                        onPressed: onPress),
                    SizedBox(width: 16),
                    _getAction("Payer", CupertinoIcons.add, onPressed: onPress),
                  ],
                ),
                SizedBox(height: 20),
                AppOpacityAnimation(
                    child: AppDecore.getTitle("Agents",
                        color: ColorConst.text, scal: 1.2)),
                Row(
                  children: [
                    _getAction("Consulter", CupertinoIcons.eye,
                        onPressed: onPress),
                    SizedBox(width: 16),
                    _getAction("Nouveau", CupertinoIcons.add,
                        onPressed: onPress),
                  ],
                ),
              ],
            )
          ],
        ),
      ),
    );
  }

  VoidCallback onPress = () {};

  _getAction(String label, IconData icon, {required VoidCallback onPressed}) {
    return HomaAction(
      label,
      icon,
      onPressed: onPressed,
    );
  }

  AppBar get _appBar => AppBar(
        elevation: 0.0,
        title: Container(
          height: 48,
          width: 48,
          padding: EdgeInsets.symmetric(vertical: 3),
          decoration: const BoxDecoration(
            color: Colors.white,
            shape: BoxShape.circle,
          ),
          child: Image.asset("assets/logos/logo.jpeg", fit: BoxFit.contain),
        ),
        bottom: PreferredSize(
          preferredSize: Size(
            MediaQuery.of(context).size.width,
            MediaQuery.of(context).size.height * 0.1,
          ),
          child: Container(
            decoration: const BoxDecoration(
              color: ColorConst.primary,
              borderRadius: BorderRadius.vertical(
                bottom: Radius.circular(16),
              ),
            ),
            margin: EdgeInsets.only(
                bottom: MediaQuery.of(context).size.height * 0.1 * 0.4),
            child: const Text(
              "NUTUTO",
              textAlign: TextAlign.center,
              textScaleFactor: 1.4,
              style: TextStyle(
                  fontFamily: 'Poppins',
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                  fontSize: 18),
            ),
          ),
        ),
      );
}
