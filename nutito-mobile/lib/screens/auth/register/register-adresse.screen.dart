import 'package:flutter/material.dart';
import 'package:nutito/components/app-decore.dart';
import 'package:nutito/screens/auth/register/info-entreprise.dart';
import 'package:provider/provider.dart';

import '../../../components/personal_alert.dart';
import '../../../models/user.dart';
import '../../../services/auth.service.dart';
import '../../../utils/app-util.dart';
import '../../../utils/color-const.dart';
import '../../home/home.screen.dart';

class RegisterAdresseScreen extends StatefulWidget {
  RegisterAdresseScreen({Key? key}) : super(key: key);

  @override
  State<RegisterAdresseScreen> createState() => _RegisterAdresseScreenState();
}

class _RegisterAdresseScreenState extends State<RegisterAdresseScreen> {
  User? user;
  GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  String? errorMessage;
  String? country;

  @override
  void initState() {
    super.initState();
    user = context.read<AuthService>().user;
    country = user?.pays?.name;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppDecore.registerAppBar(context, "Inscription 3/4"),
      body: SingleChildScrollView(
        child: Card(
          elevation: 10.0,
          margin: EdgeInsets.all(16),
          shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.vertical(top: Radius.circular(16))),
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  AppDecore.getTitle("Info Adresse"),
                  SizedBox(height: 25),
                  TextFormField(
                    initialValue: country,
                    onChanged: onCountryChanged,
                    validator: countryValidator,
                    decoration: AppDecore.input("Pays"),
                  ),
                  SizedBox(height: 16),
                  TextFormField(
                    initialValue: user?.ville,
                    onChanged: onCityChanged,
                    validator: cityValidator,
                    decoration: AppDecore.input("Ville"),
                  ),
                  SizedBox(height: 16),
                  TextFormField(
                    initialValue: user?.adresse,
                    onChanged: onAdresseChanged,
                    validator: adresseValidator,
                    decoration: AppDecore.input("Adresse",
                        helper: "Village/Quartier/Maison"),
                  ),
                  SizedBox(height: 16),
                  if (_hasError)
                    Padding(
                        padding: EdgeInsets.only(top: 16),
                        child: Text(
                          errorMessage!,
                          style: TextStyle(color: ColorConst.error),
                        )),
                  SizedBox(height: 20),
                  SizedBox(
                      width: MediaQuery.of(context).size.width * 0.5,
                      child:
                          AppDecore.submitButton(context, "Valider", onSubmit))
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  String? countryValidator(String? value) {
    if (value == null)
      return "Le nom est obligartoire";
    else if (value.length < 3)
      return "Vous devez entrez 3 cararères au minimum";
    else if (value.length > 50)
      return "Vous devez entrez 50 cararères au maximum";
    return null;
  }

  onCountryChanged(String? value) {
    country = value;
  }

  String? cityValidator(String? value) {
    if (value == null)
      return "La ville est obligartoire";
    else if (value.length < 3)
      return "Vous devez entrez 3 cararères au minimum";
    else if (value.length > 50)
      return "Vous devez entrez 50 cararères au maximum";
    return null;
  }

  onCityChanged(String? value) {
    user?.ville = value;
  }

  String? adresseValidator(String? value) {
    if (value == null)
      return "L'adresse est obligartoire";
    else if (value.length < 3)
      return "Vous devez entrez 3 cararères au minimum";
    else if (value.length > 50)
      return "Vous devez entrez 50 cararères au maximum";
    return null;
  }

  onAdresseChanged(String? value) {
    user?.adresse = value;
  }

  onSubmit() async {
    if (_formKey.currentState != null && _formKey.currentState!.validate()) {
      AppUtil.goToScreen(context, RegisterCompnayScreen());
      return;
    } else {
      setState(() {
        errorMessage = "Formulaire invalide";
      });
    }
  }

  bool get _hasError => errorMessage != null && errorMessage!.isNotEmpty;
}
