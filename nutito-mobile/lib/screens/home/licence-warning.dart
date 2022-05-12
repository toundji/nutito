import 'package:flutter/material.dart';
import 'package:nutito/components/app-decore.dart';

class LicenceWarning extends StatelessWidget {
  const LicenceWarning({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(maxHeight: 250),
      child: Card(
        margin: EdgeInsets.symmetric(vertical: 16, horizontal: 0),
        child: Padding(
          padding: EdgeInsets.symmetric(vertical: 16, horizontal: 16),
          child: Row(
            children: [
              Expanded(
                flex: 2,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "Votre licenece est espirer, Clicquer sur le boutton suivant pour activer",
                      style: TextStyle(fontSize: 16),
                    ),
                    AppDecore.submitButton(context, "Cliquer ici", () {}, vp: 8)
                  ],
                ),
              ),
              Expanded(child: Image.asset("assets/images/warning.gif"))
            ],
          ),
        ),
      ),
    );
  }
}
