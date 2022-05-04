import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:form_field_validator/form_field_validator.dart';
import 'package:nutito/components/app-decore.dart';
import 'package:nutito/screens/auth/register/register-personal-info.screen.dart';
import 'package:nutito/services/auth.service.dart';
import 'package:nutito/utils/app-util.dart';
import 'package:nutito/utils/color-const.dart';
import 'package:provider/provider.dart';

import '../../../components/personal_alert.dart';
import '../../../models/user.dart';
import '../../../utils/size-const.dart';
import '../../home/home.screen.dart';
import '../login.screen.dart';
import 'dart:math';

class RegisterScreen extends StatefulWidget {
  RegisterScreen({Key? key}) : super(key: key);

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  String? errorMessage;
  String? password;
  String? email;
  String? confirmPassword;

  GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  bool saveInfo = false;

  @override
  void initState() {
    super.initState();
    User? user = context.read<AuthService>().user;
    password = user?.password;
    email = user?.email;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppDecore.registerAppBar(context, "INSCRIPTION 1/4"),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Card(
              elevation: 10.0,
              margin: EdgeInsets.all(16),
              shape: const RoundedRectangleBorder(
                  borderRadius:
                      BorderRadius.vertical(top: Radius.circular(16))),
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                child: Form(
                  key: _formKey,
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      AppDecore.getTitle("Info Conexion"),
                      SizedBox(height: 25),
                      TextFormField(
                        onChanged: onMailChanged,
                        validator: emailValidator(),
                        keyboardType: TextInputType.emailAddress,
                        decoration: AppDecore.input("Email"),
                      ),
                      SizedBox(height: 16),
                      TextFormField(
                        onChanged: onPasswordChanged,
                        initialValue: password,
                        validator: passwordValidator,
                        obscureText: true,
                        decoration: AppDecore.input("Password"),
                      ),
                      SizedBox(height: 16),
                      TextFormField(
                        onChanged: onConfirmChanged,
                        initialValue: confirmPassword,
                        obscureText: true,
                        validator: confirmValidator,
                        decoration: AppDecore.input("Confirmer"),
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
                              context, "Valider", onSubmit))
                    ],
                  ),
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.all(SizeConst.padding),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    "J'ai déjà un compte ! ",
                    style: TextStyle(fontSize: 14.0),
                  ),
                  TextButton(
                    onPressed: () {
                      AppUtil.goToScreen(context, LoginScreen());
                    },
                    child: const Text(
                      "S'inscrire",
                      style: TextStyle(fontSize: 18.0),
                    ),
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  onMailChanged(value) {
    email = value;
  }

  MultiValidator emailValidator() {
    return MultiValidator([
      EmailValidator(errorText: "Format email invalid"),
      RequiredValidator(errorText: "L'email est obligatoire")
    ]);
  }

  String? confirmValidator(String? value) {
    if (password != null && value != password)
      return "Les deux mots de passe ne corresponde pas.";
    return null;
  }

  onConfirmChanged(String? value) {
    confirmPassword = value;
  }

  onSubmit() async {
    if (_formKey.currentState != null && _formKey.currentState!.validate()) {
      var formValue = {
        "email": email,
        "password": password,
      };
      context.read<AuthService>().setMailAndPassword(email!, password!);
      AppUtil.goToScreen(context, RegisterPersonalInfoScreen());
      return;
      PersonalAlert.showLoading(context, message: "Vérification du mail");

      context.read<AuthService>().checkMail().then((value) {
        PersonalAlert.showSuccess(context,
                message:
                    "Nous avons envoyé un code sur votre email. Vérifier et confirmer")
            .then(
          (value) => AppUtil.goToScreen(context, RegisterPersonalInfoScreen()),
        );
      }).onError((error, stackTrace) {
        PersonalAlert.showError(context, message: "$error").then((value) {});
      });
    }
  }

  String? passwordValidator(String? value) {
    if (value == null)
      return "Le mot de passe est obligartoire";
    else if (value.length < 6)
      return "Vous devez entrez 6 cararères au minimum";
    else if (value.length > 15)
      return "Vous devez entrez 15 cararères au maximum";
    return null;
  }

  onPasswordChanged(String? value) {
    password = value;
  }

  bool get _hasError => errorMessage != null && errorMessage!.isNotEmpty;
}
