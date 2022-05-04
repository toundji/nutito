import 'package:flutter/material.dart';
import 'package:nutito/models/company.dart';
import 'package:nutito/screens/auth/register/media-info.screen.dart';
import 'package:provider/provider.dart';

import '../../../components/app-decore.dart';
import '../../../components/personal_alert.dart';
import '../../../models/user.dart';
import '../../../services/auth.service.dart';
import '../../../utils/app-util.dart';
import '../../../utils/color-const.dart';
import '../../home/home.screen.dart';

class RegisterCompnayScreen extends StatefulWidget {
  RegisterCompnayScreen({Key? key}) : super(key: key);

  @override
  State<RegisterCompnayScreen> createState() => _RegisterCompnayScreenState();
}

class _RegisterCompnayScreenState extends State<RegisterCompnayScreen> {
  GlobalKey<FormState> _formKey = GlobalKey<FormState>(),
      _firstKey = GlobalKey<FormState>(),
      _secondKey = GlobalKey<FormState>(),
      _thirdKey = GlobalKey<FormState>(),
      _lastKey = GlobalKey<FormState>();

  String? errorMessage;
  User? user;
  Company? company;

  @override
  void initState() {
    super.initState();
    user = context.read<AuthService>().user;
    company = context.read<AuthService>().company;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Form(
            child: Column(
              children: [
                Container(
                  child: Image.asset(
                    "assets/logos/logo.jpeg",
                    fit: BoxFit.contain,
                    height: 100,
                  ),
                ),
                AppDecore.getTitle("Inscription 4/7".toUpperCase()),
                Padding(
                  padding:
                      EdgeInsets.only(top: 20, left: 16, right: 16, bottom: 16),
                  child: AppDecore.getTitle("Information sur l'entreprise",
                      color: ColorConst.text, scal: 1),
                ),
                Card(
                  elevation: 10.0,
                  margin: EdgeInsets.all(16),
                  shape: const RoundedRectangleBorder(
                      borderRadius:
                          BorderRadius.vertical(top: Radius.circular(16))),
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    child: Form(
                      key: _firstKey,
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          AppDecore.getTitle("Info Entreprise"),
                          SizedBox(height: 25),
                          TextFormField(
                            initialValue: company?.name,
                            onChanged: (value) {
                              company?.name = value;
                            },
                            validator: (value) => AppDecore.nameValidator(
                                "nom de votre entreprise", value),
                            decoration: AppDecore.input("Nom"),
                          ),
                          SizedBox(height: 16),
                          TextFormField(
                            initialValue: company?.ifu,
                            onChanged: (value) {
                              company?.ifu = value;
                            },
                            keyboardType: TextInputType.number,
                            validator: (value) => AppDecore.nameValidator(
                                "IFU de votre entreprise", value),
                            decoration: AppDecore.input("IFU"),
                          ),
                          SizedBox(height: 16),
                          TextFormField(
                            initialValue: company?.rccm,
                            keyboardType: TextInputType.number,
                            onChanged: (value) {
                              company?.rccm = value;
                            },
                            validator: (value) => AppDecore.nameValidator(
                                "RCCM de votre entreprise", value),
                            decoration: AppDecore.input("RCCM"),
                          ),
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
                              child: AppDecore.submitButton(
                                  context, "Suivant", onSubmitFirst))
                        ],
                      ),
                    ),
                  ),
                ),
                Card(
                  elevation: 10.0,
                  margin: EdgeInsets.all(16),
                  shape: const RoundedRectangleBorder(
                      borderRadius:
                          BorderRadius.vertical(top: Radius.circular(16))),
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    child: Form(
                      key: _secondKey,
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          AppDecore.getTitle("Type"),
                          SizedBox(height: 20),
                          DropdownButtonFormField<String>(
                            onChanged: (value) {},
                            validator: (value) => AppDecore.requiredValidator(
                                "La catégorie", value),
                            decoration: AppDecore.input("Categorie "),
                            items: ["PME", "SA", "SSA"]
                                .map((e) => DropdownMenuItem(
                                      child: Text(e),
                                      value: e,
                                    ))
                                .toList(),
                          ),
                          SizedBox(height: 16),
                          SizedBox(height: 16),
                          DropdownButtonFormField<String>(
                            onChanged: (value) {},
                            validator: (value) => AppDecore.requiredValidator(
                                "Le domaine", value),
                            decoration: AppDecore.input("Domaine "),
                            items: [
                              "Commence",
                              "Restaurant",
                              "Authel",
                              "Informatique"
                            ]
                                .map((e) => DropdownMenuItem(
                                      child: Text(e),
                                      value: e,
                                    ))
                                .toList(),
                          ),
                          SizedBox(height: 16),
                          TextFormField(
                            minLines: 3,
                            maxLines: 20,
                            decoration: AppDecore.input("Raison Sociale"),
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
                              child: AppDecore.submitButton(
                                  context, "Suivant", onSubmitSeconde))
                        ],
                      ),
                    ),
                  ),
                ),
                Card(
                  elevation: 10.0,
                  margin: EdgeInsets.all(16),
                  shape: const RoundedRectangleBorder(
                      borderRadius:
                          BorderRadius.vertical(top: Radius.circular(16))),
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    child: Form(
                      key: _thirdKey,
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          AppDecore.getTitle("Adresse"),
                          SizedBox(height: 25),
                          TextFormField(
                            decoration: AppDecore.input("Pays"),
                          ),
                          SizedBox(height: 16),
                          TextFormField(
                            initialValue: user?.ville,
                            decoration: AppDecore.input("Ville"),
                          ),
                          SizedBox(height: 16),
                          TextFormField(
                            initialValue: user?.adresse,
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
                              child: AppDecore.submitButton(
                                  context, "suivant", onSubmitThird))
                        ],
                      ),
                    ),
                  ),
                ),
                Card(
                  elevation: 10.0,
                  margin: EdgeInsets.all(16),
                  shape: const RoundedRectangleBorder(
                      borderRadius:
                          BorderRadius.vertical(top: Radius.circular(16))),
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    child: Form(
                      key: _lastKey,
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          AppDecore.getTitle("Agent"),
                          SizedBox(height: 20),
                          const Text(
                            "Quelle est votre fonction dans l'entreprise ?",
                            style: TextStyle(fontSize: 16),
                          ),
                          SizedBox(height: 20),
                          DropdownButtonFormField<String>(
                            onChanged: (value) {},
                            decoration: AppDecore.input("Fonction "),
                            items: ["Comptable", "Sécrétaire", "Directeur"]
                                .map((e) => DropdownMenuItem(
                                      child: Text(e),
                                      value: e,
                                    ))
                                .toList(),
                          ),
                          if (_hasError)
                            Padding(
                                padding: EdgeInsets.only(top: 16),
                                child: Text(
                                  errorMessage!,
                                  style: TextStyle(color: ColorConst.error),
                                )),
                          SizedBox(height: 16),
                          SizedBox(
                              width: MediaQuery.of(context).size.width * 0.5,
                              child: AppDecore.submitButton(
                                  context, "Suivant", onSubmit))
                        ],
                      ),
                    ),
                  ),
                ),
                SizedBox(
                    width: MediaQuery.of(context).size.width * 0.5,
                    child: AppDecore.submitButton(
                      context,
                      "Valider",
                      onSubmit,
                      scal: 1.4,
                    ))
              ],
            ),
          ),
        ),
      ),
    );
  }

  Future _scrollTo(key) async {
    final context = key.currentContext!;
    await Scrollable.ensureVisible(context);
  }

  onSubmitFirst() async {
    if (_firstKey.currentState != null && _firstKey.currentState!.validate()) {
      _scrollTo(_secondKey);
    }
  }

  onSubmitSeconde() async {
    if (_firstKey.currentState == null || !_firstKey.currentState!.validate()) {
      _scrollTo(_firstKey);
    }
    if (_secondKey.currentState != null &&
        _secondKey.currentState!.validate()) {
      _scrollTo(_thirdKey);
    }
  }

  onSubmitThird() async {
    if (_firstKey.currentState == null || !_firstKey.currentState!.validate()) {
      _scrollTo(_firstKey);
    }

    if (_secondKey.currentState == null ||
        !_secondKey.currentState!.validate()) {
      _scrollTo(_secondKey);
    }
    if (_thirdKey.currentState != null && _thirdKey.currentState!.validate()) {
      _scrollTo(_lastKey);
    }
  }

  onSubmit() async {
    if (_firstKey.currentState == null || !_firstKey.currentState!.validate()) {
      _scrollTo(_firstKey);
    }

    if (_secondKey.currentState == null ||
        !_secondKey.currentState!.validate()) {
      _scrollTo(_secondKey);
    }
    if (_thirdKey.currentState == null || !_thirdKey.currentState!.validate()) {
      _scrollTo(_thirdKey);
    }
    if (_lastKey.currentState != null && _lastKey.currentState!.validate()) {
      context.read<AuthService>().company = company;
      AppUtil.goToScreen(context, RegisterMediaScreen());
    }
  }

  bool get _hasError => errorMessage != null && errorMessage!.isNotEmpty;
}
