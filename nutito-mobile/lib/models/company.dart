import 'dart:convert';

import 'package:flutter/foundation.dart';

import 'agent.dart';
import 'category-company.dart';
import 'domaine.dart';
import 'licence.dart';
import 'user.dart';

class Company {
  int? id;
  String? name;
  String? description;
  String? city;
  String? adresse;
  String? ifu;
  String? rccm;
  CategoryCompany? category;
  Licence? licence;
  List<Licence>? licences;
  Domaine? domaine;
  int? createur_id;
  int? editeur_id;
  DateTime? create_at;
  DateTime? update_at;
  List<Agent> agents = [];
  User? createur;
  Company({
    this.id,
    this.name,
    this.description,
    this.city,
    this.adresse,
    this.ifu,
    this.rccm,
    this.category,
    this.licence,
    this.licences,
    this.domaine,
    this.createur_id,
    this.editeur_id,
    this.create_at,
    this.update_at,
    required this.agents,
    this.createur,
  });

  Company copyWith({
    int? id,
    String? name,
    String? description,
    String? city,
    String? adresse,
    String? ifu,
    String? rccm,
    CategoryCompany? category,
    Licence? licence,
    List<Licence>? licences,
    Domaine? domaine,
    int? createur_id,
    int? editeur_id,
    DateTime? create_at,
    DateTime? update_at,
    List<Agent>? agents,
    User? createur,
  }) {
    return Company(
      id: id ?? this.id,
      name: name ?? this.name,
      description: description ?? this.description,
      city: city ?? this.city,
      adresse: adresse ?? this.adresse,
      ifu: ifu ?? this.ifu,
      rccm: rccm ?? this.rccm,
      category: category ?? this.category,
      licence: licence ?? this.licence,
      licences: licences ?? this.licences,
      domaine: domaine ?? this.domaine,
      createur_id: createur_id ?? this.createur_id,
      editeur_id: editeur_id ?? this.editeur_id,
      create_at: create_at ?? this.create_at,
      update_at: update_at ?? this.update_at,
      agents: agents ?? this.agents,
      createur: createur ?? this.createur,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'city': city,
      'adresse': adresse,
      'ifu': ifu,
      'rccm': rccm,
      'category': category?.toMap(),
      'licence': licence?.toMap(),
      'licences': licences?.map((x) => x.toMap()).toList(),
      'domaine': domaine?.toMap(),
      'createur_id': createur_id,
      'editeur_id': editeur_id,
      'create_at': create_at?.millisecondsSinceEpoch,
      'update_at': update_at?.millisecondsSinceEpoch,
      'agents': agents.map((x) => x.toMap()).toList(),
      'createur': createur?.toMap(),
    };
  }

  factory Company.fromMap(Map<String, dynamic> map) {
    return Company(
      id: map['id']?.toInt(),
      name: map['name'],
      description: map['description'],
      city: map['city'],
      adresse: map['adresse'],
      ifu: map['ifu'],
      rccm: map['rccm'],
      category: map['category'] != null
          ? CategoryCompany.fromMap(map['category'])
          : null,
      licence: map['licence'] != null ? Licence.fromMap(map['licence']) : null,
      licences: map['licences'] != null
          ? List<Licence>.from(map['licences']?.map((x) => Licence.fromMap(x)))
          : null,
      domaine: map['domaine'] != null ? Domaine.fromMap(map['domaine']) : null,
      createur_id: map['createur_id']?.toInt(),
      editeur_id: map['editeur_id']?.toInt(),
      create_at: map['create_at'] != null
          ? DateTime.fromMillisecondsSinceEpoch(map['create_at'])
          : null,
      update_at: map['update_at'] != null
          ? DateTime.fromMillisecondsSinceEpoch(map['update_at'])
          : null,
      agents: List<Agent>.from(map['agents']?.map((x) => Agent.fromMap(x))),
      createur: map['createur'] != null ? User.fromMap(map['createur']) : null,
    );
  }

  String toJson() => json.encode(toMap());

  factory Company.fromJson(String source) =>
      Company.fromMap(json.decode(source));

  @override
  String toString() {
    return 'Company(id: $id, name: $name, description: $description, city: $city, adresse: $adresse, ifu: $ifu, rccm: $rccm, category: $category, licence: $licence, licences: $licences, domaine: $domaine, createur_id: $createur_id, editeur_id: $editeur_id, create_at: $create_at, update_at: $update_at, agents: $agents, createur: $createur)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is Company &&
        other.id == id &&
        other.name == name &&
        other.description == description &&
        other.city == city &&
        other.adresse == adresse &&
        other.ifu == ifu &&
        other.rccm == rccm &&
        other.category == category &&
        other.licence == licence &&
        listEquals(other.licences, licences) &&
        other.domaine == domaine &&
        other.createur_id == createur_id &&
        other.editeur_id == editeur_id &&
        other.create_at == create_at &&
        other.update_at == update_at &&
        listEquals(other.agents, agents) &&
        other.createur == createur;
  }

  @override
  int get hashCode {
    return id.hashCode ^
        name.hashCode ^
        description.hashCode ^
        city.hashCode ^
        adresse.hashCode ^
        ifu.hashCode ^
        rccm.hashCode ^
        category.hashCode ^
        licence.hashCode ^
        licences.hashCode ^
        domaine.hashCode ^
        createur_id.hashCode ^
        editeur_id.hashCode ^
        create_at.hashCode ^
        update_at.hashCode ^
        agents.hashCode ^
        createur.hashCode;
  }
}
