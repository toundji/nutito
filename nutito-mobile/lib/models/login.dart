import 'dart:convert';

class Login {
  String? email;
  String? password;
  Login({
    this.email,
    this.password,
  });

  Map<String, dynamic> toMap() {
    return {
      'email': email,
      'password': password,
    };
  }
}
