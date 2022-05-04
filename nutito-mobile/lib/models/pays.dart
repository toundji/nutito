import 'dart:convert';

class Pays {
  int? id;
  String? name;
  String? dialCode;
  int? createur_id;
  int? editeur_id;
  DateTime? create_at;
  DateTime? update_at;
  Pays({
    this.id,
    this.name,
    this.dialCode,
    this.createur_id,
    this.editeur_id,
    this.create_at,
    this.update_at,
  });

  Pays copyWith({
    int? id,
    String? name,
    String? dialCode,
    int? createur_id,
    int? editeur_id,
    DateTime? create_at,
    DateTime? update_at,
  }) {
    return Pays(
      id: id ?? this.id,
      name: name ?? this.name,
      dialCode: dialCode ?? this.dialCode,
      createur_id: createur_id ?? this.createur_id,
      editeur_id: editeur_id ?? this.editeur_id,
      create_at: create_at ?? this.create_at,
      update_at: update_at ?? this.update_at,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'dialCode': dialCode,
      'createur_id': createur_id,
      'editeur_id': editeur_id,
      'create_at': create_at?.millisecondsSinceEpoch,
      'update_at': update_at?.millisecondsSinceEpoch,
    };
  }

  factory Pays.fromMap(Map<String, dynamic> map) {
    return Pays(
      id: map['id']?.toInt(),
      name: map['name'],
      dialCode: map['dialCode'],
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

  factory Pays.fromJson(String source) => Pays.fromMap(json.decode(source));

  @override
  String toString() {
    return 'Pays(id: $id, name: $name, dialCode: $dialCode, createur_id: $createur_id, editeur_id: $editeur_id, create_at: $create_at, update_at: $update_at)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is Pays &&
        other.id == id &&
        other.name == name &&
        other.dialCode == dialCode &&
        other.createur_id == createur_id &&
        other.editeur_id == editeur_id &&
        other.create_at == create_at &&
        other.update_at == update_at;
  }

  @override
  int get hashCode {
    return id.hashCode ^
        name.hashCode ^
        dialCode.hashCode ^
        createur_id.hashCode ^
        editeur_id.hashCode ^
        create_at.hashCode ^
        update_at.hashCode;
  }
}
