import 'dart:developer';
import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:intl_phone_number_input/intl_phone_number_input.dart';
import 'package:nutito/models/pays.dart';
import 'package:nutito/models/user.dart';
import 'package:nutito/services/dio-client.service.dart';

import '../models/company.dart';

class AuthService extends ChangeNotifier {
  User? user;
  Company? company;

  PhoneNumber? phone;

  File? logo, profile;

  setMailAndPassword(String email, String password) {
    user ??= User();
    user?.password = password;
    user?.email = email;
    notifyListeners();
  }

  setPersonalInfo(User use, PhoneNumber phone, String pays) {
    user ??= User();
    user = use;
    user?.phone = "${phone.dialCode}${phone.parseNumber()}";
    this.phone = phone;
    user?.pays = Pays(name: pays);

    notifyListeners();
  }

  setMedia({required File logo, required File profile}) {
    this.profile = profile;
    this.logo = logo;
    notifyListeners();
  }

  Future checkMail() async {
    var body = {"email": user?.email};
    return await DioClient()
        .post("auth/is-awailable-email", body: body)
        .then((value) {})
        .onError((error, stackTrace) {
      log("Erreu de vérification du numéro de téléphone",
          error: error, stackTrace: stackTrace);
    });
  }
}
