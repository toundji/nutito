import 'dart:convert';

class Role {
  int? id;
  String? name;
  String? description;
  int? createur_id;
  int? editeur_id;
  DateTime? create_at;
  DateTime? update_at;
  Role({
    this.id,
    this.name,
    this.description,
    this.createur_id,
    this.editeur_id,
    this.create_at,
    this.update_at,
  });

  Role copyWith({
    int? id,
    String? name,
    String? description,
    int? createur_id,
    int? editeur_id,
    DateTime? create_at,
    DateTime? update_at,
  }) {
    return Role(
      id: id ?? this.id,
      name: name ?? this.name,
      description: description ?? this.description,
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
      'description': description,
      'createur_id': createur_id,
      'editeur_id': editeur_id,
      'create_at': create_at?.millisecondsSinceEpoch,
      'update_at': update_at?.millisecondsSinceEpoch,
    };
  }

  factory Role.fromMap(Map<String, dynamic> map) {
    return Role(
      id: map['id']?.toInt(),
      name: map['name'],
      description: map['description'],
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

  factory Role.fromJson(String source) => Role.fromMap(json.decode(source));

  @override
  String toString() {
    return 'Role(id: $id, name: $name, description: $description, createur_id: $createur_id, editeur_id: $editeur_id, create_at: $create_at, update_at: $update_at)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is Role &&
        other.id == id &&
        other.name == name &&
        other.description == description &&
        other.createur_id == createur_id &&
        other.editeur_id == editeur_id &&
        other.create_at == create_at &&
        other.update_at == update_at;
  }

  @override
  int get hashCode {
    return id.hashCode ^
        name.hashCode ^
        description.hashCode ^
        createur_id.hashCode ^
        editeur_id.hashCode ^
        create_at.hashCode ^
        update_at.hashCode;
  }
}
