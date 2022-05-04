import 'dart:convert';

import 'package:nutito/models/company.dart';

class Licence {
  int? id;
  Company? compnay;
  int? amount;
  int? expire_date;
  String? moyen;
  String? code;
  String? translation_id;
  String? translation_info;
  int? createur_id;
  int? editeur_id;
  DateTime? create_at;
  DateTime? update_at;
  Licence({
    this.id,
    this.compnay,
    this.amount,
    this.expire_date,
    this.moyen,
    this.code,
    this.translation_id,
    this.translation_info,
    this.createur_id,
    this.editeur_id,
    this.create_at,
    this.update_at,
  });

  Licence copyWith({
    int? id,
    Company? compnay,
    int? amount,
    int? expire_date,
    String? moyen,
    String? code,
    String? translation_id,
    String? translation_info,
    int? createur_id,
    int? editeur_id,
    DateTime? create_at,
    DateTime? update_at,
  }) {
    return Licence(
      id: id ?? this.id,
      compnay: compnay ?? this.compnay,
      amount: amount ?? this.amount,
      expire_date: expire_date ?? this.expire_date,
      moyen: moyen ?? this.moyen,
      code: code ?? this.code,
      translation_id: translation_id ?? this.translation_id,
      translation_info: translation_info ?? this.translation_info,
      createur_id: createur_id ?? this.createur_id,
      editeur_id: editeur_id ?? this.editeur_id,
      create_at: create_at ?? this.create_at,
      update_at: update_at ?? this.update_at,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'compnay': compnay?.toMap(),
      'amount': amount,
      'expire_date': expire_date,
      'moyen': moyen,
      'code': code,
      'translation_id': translation_id,
      'translation_info': translation_info,
      'createur_id': createur_id,
      'editeur_id': editeur_id,
      'create_at': create_at?.millisecondsSinceEpoch,
      'update_at': update_at?.millisecondsSinceEpoch,
    };
  }

  factory Licence.fromMap(Map<String, dynamic> map) {
    return Licence(
      id: map['id']?.toInt(),
      compnay: map['compnay'] != null ? Company.fromMap(map['compnay']) : null,
      amount: map['amount']?.toInt(),
      expire_date: map['expire_date']?.toInt(),
      moyen: map['moyen'],
      code: map['code'],
      translation_id: map['translation_id'],
      translation_info: map['translation_info'],
      createur_id: map['createur_id']?.toInt(),
      editeur_id: map['editeur_id']?.toInt(),
      create_at: map['create_at'] != null
          ? DateTime.fromMillisecondsSinceEpoch(map['create_at'])
          : null,
      update_at: map['update_at'] != null
          ? DateTime.fromMillisecondsSinceEpoch(map['update_at'])
          : null,
    );
  }

  String toJson() => json.encode(toMap());

  factory Licence.fromJson(String source) =>
      Licence.fromMap(json.decode(source));

  @override
  String toString() {
    return 'Licence(id: $id, compnay: $compnay, amount: $amount, expire_date: $expire_date, moyen: $moyen, code: $code, translation_id: $translation_id, translation_info: $translation_info, createur_id: $createur_id, editeur_id: $editeur_id, create_at: $create_at, update_at: $update_at)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is Licence &&
        other.id == id &&
        other.compnay == compnay &&
        other.amount == amount &&
        other.expire_date == expire_date &&
        other.moyen == moyen &&
        other.code == code &&
        other.translation_id == translation_id &&
        other.translation_info == translation_info &&
        other.createur_id == createur_id &&
        other.editeur_id == editeur_id &&
        other.create_at == create_at &&
        other.update_at == update_at;
  }

  @override
  int get hashCode {
    return id.hashCode ^
        compnay.hashCode ^
        amount.hashCode ^
        expire_date.hashCode ^
        moyen.hashCode ^
        code.hashCode ^
        translation_id.hashCode ^
        translation_info.hashCode ^
        createur_id.hashCode ^
        editeur_id.hashCode ^
        create_at.hashCode ^
        update_at.hashCode;
  }
}
