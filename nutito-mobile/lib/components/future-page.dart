import 'package:flutter/material.dart';

import 'app-decore.dart';

class FuturePage extends StatelessWidget {
  const FuturePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppDecore.appBar(context, "Page en cours"),
      body: Center(
        child: Padding(
          padding: EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Padding(
                padding: EdgeInsets.symmetric(vertical: 16),
                child: Text(
                  "Nous construisons cette page. Elle n'est pas encore terminé. Elle sera diponible bientôt. Mercie de bien vouloir patienter",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontFamily: 'Poppins',
                    fontSize: 16,
                  ),
                ),
              ),
              Image.asset("assets/images/unbuild.png")
            ],
          ),
        ),
      ),
    );
  }
}
