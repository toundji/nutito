import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:nutito/screens/licence/licence.screen.dart';

import '../../components/future-page.dart';
import '../../utils/app-util.dart';

class AppDrawer extends StatefulWidget {
  AppDrawer({Key? key}) : super(key: key);

  @override
  State<AppDrawer> createState() => _AppDrawerState();
}

class _AppDrawerState extends State<AppDrawer> {
  @override
  Widget build(BuildContext context) {
    double _dwPaddingTop = MediaQuery.of(context).padding.top;
    double _appBarHeigth = kToolbarHeight;
    return Container(
      padding: EdgeInsets.only(
          top: _dwPaddingTop +
              _appBarHeigth +
              1 +
              MediaQuery.of(context).size.height * 0.1,
          bottom: _dwPaddingTop),
      width: MediaQuery.of(context).size.width * 0.6,
      child: Drawer(
        child: ListView(
          padding: EdgeInsets.only(top: 0),
          children: [
            _notifTile("Profile", CupertinoIcons.person_fill, FuturePage()),
            _notifTile("Licence", CupertinoIcons.lock_shield, LicenceScreen()),
            _notifTile("Entreprise", Icons.engineering, FuturePage()),
            _notifTile("Bilan", Icons.summarize, FuturePage()),
            _notifTile("Opérations", Icons.attractions, FuturePage()),
            _notifTile("Agents", CupertinoIcons.person_3, FuturePage()),
          ],
        ),
      ),
    );
  }

  _notifTile(String title, IconData icon, Widget widget, {notifEvent}) {
    return ListTile(
      title: Text(
        title,
        style: TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.bold,
        ),
      ),
      leading: Icon(
        icon,
        color: Colors.black,
      ),
      onTap: () {
        Navigator.pop(context);
        AppUtil.goToScreen(context, widget);
      },
    );
  }

  _simpleTile(IconData icon, String title, Widget widget) {
    return ListTile(
      title: Text(
        title,
        style: TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.bold,
        ),
      ),
      leading: Icon(icon),
    );
  }
}
