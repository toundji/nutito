import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:intl_phone_number_input/intl_phone_number_input.dart';
import 'package:nutito/screens/auth/register/info-entreprise.dart';
import 'package:nutito/screens/auth/register/register-adresse.screen.dart';
import 'package:provider/provider.dart';

import '../../../components/app-decore.dart';
import '../../../components/personal_alert.dart';
import '../../../models/user.dart';
import '../../../services/auth.service.dart';
import '../../../utils/app-util.dart';
import '../../../utils/color-const.dart';
import '../../../utils/size-const.dart';
import '../../home/home.screen.dart';
import '../login.screen.dart';

class RegisterPersonalInfoScreen extends StatefulWidget {
  RegisterPersonalInfoScreen({Key? key}) : super(key: key);

  @override
  State<RegisterPersonalInfoScreen> createState() =>
      _RegisterPersonalInfoScreenState();
}

class _RegisterPersonalInfoScreenState
    extends State<RegisterPersonalInfoScreen> {
  GlobalKey<FormState> _formKey = GlobalKey<FormState>(),
      _firstKey = GlobalKey<FormState>(),
      _secondKey = GlobalKey<FormState>();
  String? errorMessage;
  PhoneNumber? phone = PhoneNumber(isoCode: "BJ");
  bool phoneisValide = false;

  ScrollController _scrollController = ScrollController();

  User? user;

  bool genre = true;
  String? country;

  @override
  void initState() {
    super.initState();
    user = context.read<AuthService>().user;
    phone = context.read<AuthService>().phone ?? phone;
    genre = user?.genre ?? true;
    country = user?.pays?.name;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          controller: _scrollController,
          child: Column(
            children: [
              Container(
                child: Image.asset(
                  "assets/logos/logo.jpeg",
                  fit: BoxFit.contain,
                  height: 100,
                ),
              ),
              AppDecore.getTitle("Inscription 2/4".toUpperCase()),
              Padding(
                padding:
                    EdgeInsets.only(top: 20, left: 16, right: 16, bottom: 16),
                child: AppDecore.getTitle("Vos informations personnelles",
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
                        AppDecore.getTitle("Identitté"),
                        SizedBox(height: 25),
                        TextFormField(
                          initialValue: user?.first_name,
                          onChanged: onFirstNameChanged,
                          validator: firstNameValidator,
                          decoration: AppDecore.input("Nom"),
                        ),
                        SizedBox(height: 16),
                        TextFormField(
                          initialValue: user?.last_name,
                          onChanged: onLastNameChanged,
                          validator: lastNameValidator,
                          decoration: AppDecore.input("Prénom"),
                        ),
                        SizedBox(height: 16),
                        Padding(
                            padding: EdgeInsets.only(bottom: SizeConst.padding),
                            child: InternationalPhoneNumberInput(
                              onInputValidated: (value) {
                                log("$value");
                                phoneisValide = value;
                              },
                              initialValue: phone,
                              countries: ["BJ", "CI"],
                              errorMessage: "Numméro de téléphone est invalide",
                              spaceBetweenSelectorAndTextField: 0.0,
                              validator: phoneValidator,
                              onInputChanged: onPhoneChanged,
                              inputDecoration: AppDecore.input("Téléphone * "),
                              selectorConfig: SelectorConfig(
                                  leadingPadding: SizeConst.padding,
                                  trailingSpace: false,
                                  setSelectorButtonAsPrefixIcon: true),
                            )),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Radio<bool?>(
                                    value: true,
                                    groupValue: genre,
                                    onChanged: (bool? value) {
                                      user?.genre = value ?? true;
                                      genre = value ?? true;
                                      setState(() {});
                                    }),
                                Text("MASCULIN")
                              ],
                            ),
                            Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Radio<bool?>(
                                    value: false,
                                    groupValue: genre,
                                    onChanged: (bool? value) {
                                      user?.genre = value ?? true;
                                      genre = value ?? false;

                                      setState(() {});
                                    }),
                                Text("FEMININ")
                              ],
                            ),
                          ],
                        ),
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
                        AppDecore.getTitle("Adresse"),
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
                        SizedBox(height: 20),
                        SizedBox(
                            width: MediaQuery.of(context).size.width * 0.5,
                            child: AppDecore.submitButton(
                                context, "Valider", onSubmitSecond))
                      ],
                    ),
                  ),
                ),
              ),
              if (_hasError)
                Padding(
                    padding: EdgeInsets.only(top: 16),
                    child: Text(
                      errorMessage!,
                      style: TextStyle(color: ColorConst.error),
                    )),
            ],
          ),
        ),
      ),
    );
  }

  Future _scrollToThirst() async {
    final context = _firstKey.currentContext!;
    await Scrollable.ensureVisible(context);
  }

  Future _scrollToSecond() async {
    final context = _secondKey.currentContext!;
    await Scrollable.ensureVisible(context);
  }

  String? phoneValidator(String? value) {
    if (value == null) return "Le numéro de téléphone est obligatoire";
    if (!phoneisValide) return "Le numéro de téléphone est invalide";
    return null;
  }

  onPhoneChanged(PhoneNumber? value) {
    phone = value;
  }

  String? firstNameValidator(String? value) {
    if (value == null)
      return "Le nom est obligartoire";
    else if (value.length < 3)
      return "Vous devez entrez 3 cararères au minimum";
    else if (value.length > 50)
      return "Vous devez entrez 50 cararères au maximum";
    return null;
  }

  onFirstNameChanged(String? value) {
    user?.first_name = value;
  }

  String? lastNameValidator(String? value) {
    if (value == null)
      return "Le prénom est obligartoire";
    else if (value.length < 3)
      return "Vous devez entrez 3 cararères au minimum";
    else if (value.length > 50)
      return "Vous devez entrez 50 cararères au maximum";
    return null;
  }

  onLastNameChanged(String? value) {
    user?.last_name = value;
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

  onSubmitFirst() async {
    if (_firstKey.currentState != null && _firstKey.currentState!.validate()) {
      _scrollToSecond();
    }
  }

  onSubmitSecond() async {
    if (_firstKey.currentState == null || !_firstKey.currentState!.validate()) {
      _scrollToThirst();
    } else if (_secondKey.currentState != null &&
        _secondKey.currentState!.validate()) {
      context.read<AuthService>().setPersonalInfo(user!, phone!, country!);
      AppUtil.goToScreen(context, RegisterCompnayScreen());
    }
  }

  bool get _hasError => errorMessage != null && errorMessage!.isNotEmpty;
}
