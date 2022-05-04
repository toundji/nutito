import 'dart:math';

import 'package:flutter/material.dart';
import 'package:form_field_validator/form_field_validator.dart';
import 'package:nutito/components/app-decore.dart';
import 'package:nutito/components/shake-transition.dart';
import 'package:nutito/screens/auth/register/register.screen.dart';
import 'package:nutito/utils/app-util.dart';
import 'package:nutito/utils/color-const.dart';
import 'package:provider/provider.dart';

import '../../components/personal_alert.dart';
import '../../utils/size-const.dart';
import '../home/home.screen.dart';

class LoginScreen extends StatefulWidget {
  LoginScreen({Key? key}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  String? errorMessage;
  String? password;
  String? email;
  GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  bool saveInfo = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).scaffoldBackgroundColor,
        elevation: 0.0,
        bottom: PreferredSize(
            preferredSize: const Size(double.infinity, 100),
            child: Container(
              child: Image.asset(
                "assets/logos/logo.jpeg",
                fit: BoxFit.contain,
                height: 100,
              ),
            )),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            ShakeTransition(
              child: Card(
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
                        AppDecore.getTitle("Conexion"),
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
                        Row(
                          children: [
                            const Flexible(
                                child: SizedBox(
                              width: 20,
                            )),
                            Checkbox(
                                value: saveInfo,
                                onChanged: (value) {
                                  setState(() {
                                    saveInfo = value ?? false;
                                  });
                                }),
                            Text("Se souvenir de moi"),
                          ],
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
            ),
            Padding(
              padding: EdgeInsets.all(SizeConst.padding),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    "Je n'ai pas de compte ! ",
                    style: TextStyle(fontSize: 14.0),
                  ),
                  TextButton(
                    onPressed: () {
                      AppUtil.goToScreen(context, RegisterScreen());
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

  onSubmit() async {
    if (_formKey.currentState != null && _formKey.currentState!.validate()) {
      var formValue = {
        "email": email,
        "password": password,
      };
      PersonalAlert.showLoading(context);
      Random random = Random();
      bool success = random.nextBool();
      Future.delayed(Duration(seconds: 1)).then((value) {
        if (success) {
          PersonalAlert.showSuccess(context,
                  message: "Vous êtes connecter avec succès")
              .then(
            (value) => AppUtil.goToScreen(context, HomeScreen()),
          );
        } else {
          setState(() {
            errorMessage = "Nom utilisateur ou mot de passe invalide";
          });
          PersonalAlert.showError(context, message: "Données invalide");
        }
      });
      // context
      //     .read<>()
      //     .login(phone.toString(), password!)
      //     .then((value) {
      //   PersonalAlert.showSuccess(context,
      //           message: "Vous êtes connecter avec succès")
      //       .then(
      //     (value) => AppUtil.goToScreen(context, HomeScreen()),
      //   );
      // }).onError((error, stackTrace) {
      //   PersonalAlert.showError(context, message: "$error").then((value) {});
      // });
    }
  }

  onMailChanged(value) {
    email = value;
  }

  MultiValidator emailValidator() {
    return MultiValidator([
      EmailValidator(errorText: "Format email invalid"),
    ]);
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
