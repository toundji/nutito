import 'dart:convert';

import 'package:nutito/models/company.dart';

import 'user.dart';

class Agent {
  User? user;
  Company? company;
  String? typeAgent;
  String? modifie;
  Agent({
    this.user,
    this.company,
    this.typeAgent,
    this.modifie,
  });

  Agent copyWith({
    User? user,
    Company? company,
    String? typeAgent,
    String? modifie,
  }) {
    return Agent(
      user: user ?? this.user,
      company: company ?? this.company,
      typeAgent: typeAgent ?? this.typeAgent,
      modifie: modifie ?? this.modifie,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'user': user?.toMap(),
      'company': company?.toMap(),
      'typeAgent': typeAgent,
      'modifie': modifie,
    };
  }

  factory Agent.fromMap(Map<String, dynamic> map) {
    return Agent(
      user: map['user'] != null ? User.fromMap(map['user']) : null,
      company: map['company'] != null ? Company.fromMap(map['company']) : null,
      typeAgent: map['typeAgent'],
      modifie: map['modifie'],
    );
  }

  String toJson() => json.encode(toMap());

  factory Agent.fromJson(String source) => Agent.fromMap(json.decode(source));

  @override
  String toString() {
    return 'Agent(user: $user, company: $company, typeAgent: $typeAgent, modifie: $modifie)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is Agent &&
        other.user == user &&
        other.company == company &&
        other.typeAgent == typeAgent &&
        other.modifie == modifie;
  }

  @override
  int get hashCode {
    return user.hashCode ^
        company.hashCode ^
        typeAgent.hashCode ^
        modifie.hashCode;
  }
}
