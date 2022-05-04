import 'dart:convert';

import 'package:flutter/foundation.dart';

import 'package:nutito/models/domaine.dart';
import 'package:nutito/models/fichier.dart';
import 'package:nutito/models/pays.dart';
import 'package:nutito/models/role.dart';

import 'agent.dart';
import 'company.dart';

class User {
  int? id;
  String? first_name;
  String? last_name;
  String? phone;
  String? email;
  String? ifu;
  String? password;
  DateTime? date_naiss;
  String? lieu_naiss;
  Pays? pays;
  String? ville;
  String? adresse;
  Fichier? fichier;
  List<Role>? roles = [];
  int? createur_id;
  int? editeur_id;
  late bool genre;
  DateTime? create_at;
  DateTime? update_at;
  List<Agent>? agents = [];
  List<Company>? compnaies = [];
  User({
    this.id,
    this.first_name,
    this.last_name,
    this.phone,
    this.email,
    this.ifu,
    this.password,
    this.date_naiss,
    this.lieu_naiss,
    this.pays,
    this.ville,
    this.adresse,
    this.fichier,
    this.roles,
    this.createur_id,
    this.editeur_id,
    this.genre = true,
    this.create_at,
    this.update_at,
    this.agents,
    this.compnaies,
  });

  User copyWith({
    int? id,
    String? first_name,
    String? last_name,
    String? phone,
    String? email,
    String? ifu,
    String? password,
    DateTime? date_naiss,
    String? lieu_naiss,
    Pays? pays,
    String? vile,
    String? adresse,
    Fichier? fichier,
    List<Role>? roles,
    int? createur_id,
    int? editeur_id,
    bool? genre,
    DateTime? create_at,
    DateTime? update_at,
    List<Agent>? agents,
    List<Company>? compnaies,
  }) {
    return User(
      id: id ?? this.id,
      first_name: first_name ?? this.first_name,
      last_name: last_name ?? this.last_name,
      phone: phone ?? this.phone,
      email: email ?? this.email,
      ifu: ifu ?? this.ifu,
      password: password ?? this.password,
      date_naiss: date_naiss ?? this.date_naiss,
      lieu_naiss: lieu_naiss ?? this.lieu_naiss,
      pays: pays ?? this.pays,
      ville: vile ?? this.ville,
      adresse: adresse ?? this.adresse,
      fichier: fichier ?? this.fichier,
      roles: roles ?? this.roles,
      createur_id: createur_id ?? this.createur_id,
      editeur_id: editeur_id ?? this.editeur_id,
      genre: genre ?? this.genre,
      create_at: create_at ?? this.create_at,
      update_at: update_at ?? this.update_at,
      agents: agents ?? this.agents,
      compnaies: compnaies ?? this.compnaies,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'first_name': first_name,
      'last_name': last_name,
      'phone': phone,
      'email': email,
      'ifu': ifu,
      'password': password,
      'date_naiss': date_naiss?.millisecondsSinceEpoch,
      'lieu_naiss': lieu_naiss,
      'pays': pays?.toMap(),
      'vile': ville,
      'adresse': adresse,
      'fichier': fichier?.toMap(),
      'roles': roles?.map((x) => x.toMap()).toList(),
      'createur_id': createur_id,
      'editeur_id': editeur_id,
      'genre': genre,
      'create_at': create_at?.millisecondsSinceEpoch,
      'update_at': update_at?.millisecondsSinceEpoch,
      'agents': agents?.map((x) => x.toMap()).toList(),
      'compnaies': compnaies?.map((x) => x.toMap()).toList(),
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      id: map['id']?.toInt(),
      first_name: map['first_name'],
      last_name: map['last_name'],
      phone: map['phone'],
      email: map['email'],
      ifu: map['ifu'],
      password: map['password'],
      date_naiss: map['date_naiss'] != null
          ? DateTime.fromMillisecondsSinceEpoch(map['date_naiss'])
          : null,
      lieu_naiss: map['lieu_naiss'],
      pays: map['pays'] != null ? Pays.fromMap(map['pays']) : null,
      ville: map['ville'],
      adresse: map['adresse'],
      fichier: map['fichier'] != null ? Fichier.fromMap(map['fichier']) : null,
      roles: List<Role>.from(map['roles']?.map((x) => Role.fromMap(x))),
      createur_id: map['createur_id']?.toInt(),
      editeur_id: map['editeur_id']?.toInt(),
      genre: map['genre'],
      create_at: map['create_at'] != null
          ? DateTime.fromMillisecondsSinceEpoch(map['create_at'])
          : null,
      update_at: map['update_at'] != null
          ? DateTime.fromMillisecondsSinceEpoch(map['update_at'])
          : null,
      agents: List<Agent>.from(map['agents']?.map((x) => Agent.fromMap(x))),
      compnaies:
          List<Company>.from(map['compnaies']?.map((x) => Company.fromMap(x))),
    );
  }

  String toJson() => json.encode(toMap());

  factory User.fromJson(String source) => User.fromMap(json.decode(source));

  @override
  String toString() {
    return 'User(id: $id, first_name: $first_name, last_name: $last_name, phone: $phone, email: $email, ifu: $ifu, password: $password, date_naiss: $date_naiss, lieu_naiss: $lieu_naiss, pays: $pays, vile: $ville, adresse: $adresse, fichier: $fichier, roles: $roles, createur_id: $createur_id, editeur_id: $editeur_id, genre: $genre, create_at: $create_at, update_at: $update_at, agents: $agents, compnaies: $compnaies)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is User &&
        other.id == id &&
        other.first_name == first_name &&
        other.last_name == last_name &&
        other.phone == phone &&
        other.email == email &&
        other.ifu == ifu &&
        other.password == password &&
        other.date_naiss == date_naiss &&
        other.lieu_naiss == lieu_naiss &&
        other.pays == pays &&
        other.ville == ville &&
        other.adresse == adresse &&
        other.fichier == fichier &&
        listEquals(other.roles, roles) &&
        other.createur_id == createur_id &&
        other.editeur_id == editeur_id &&
        other.genre == genre &&
        other.create_at == create_at &&
        other.update_at == update_at &&
        listEquals(other.agents, agents) &&
        listEquals(other.compnaies, compnaies);
  }

  @override
  int get hashCode {
    return id.hashCode ^
        first_name.hashCode ^
        last_name.hashCode ^
        phone.hashCode ^
        email.hashCode ^
        ifu.hashCode ^
        password.hashCode ^
        date_naiss.hashCode ^
        lieu_naiss.hashCode ^
        pays.hashCode ^
        ville.hashCode ^
        adresse.hashCode ^
        fichier.hashCode ^
        roles.hashCode ^
        createur_id.hashCode ^
        editeur_id.hashCode ^
        genre.hashCode ^
        create_at.hashCode ^
        update_at.hashCode ^
        agents.hashCode ^
        compnaies.hashCode;
  }
}
