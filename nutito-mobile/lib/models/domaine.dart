import 'dart:convert';

class Domaine {
  int? id;
  String? nom;
  String? description;
  int? createur_id;
  int? editeur_id;
  DateTime? create_at;
  DateTime? update_at;
  Domaine({
    this.id,
    this.nom,
    this.description,
    this.createur_id,
    this.editeur_id,
    this.create_at,
    this.update_at,
  });

  Domaine copyWith({
    int? id,
    String? nom,
    String? description,
    int? createur_id,
    int? editeur_id,
    DateTime? create_at,
    DateTime? update_at,
  }) {
    return Domaine(
      id: id ?? this.id,
      nom: nom ?? this.nom,
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
      'nom': nom,
      'description': description,
      'createur_id': createur_id,
      'editeur_id': editeur_id,
      'create_at': create_at?.millisecondsSinceEpoch,
      'update_at': update_at?.millisecondsSinceEpoch,
    };
  }

  factory Domaine.fromMap(Map<String, dynamic> map) {
    return Domaine(
      id: map['id']?.toInt(),
      nom: map['nom'],
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

  factory Domaine.fromJson(String source) =>
      Domaine.fromMap(json.decode(source));

  @override
  String toString() {
    return 'Domaine(id: $id, nom: $nom, description: $description, createur_id: $createur_id, editeur_id: $editeur_id, create_at: $create_at, update_at: $update_at)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is Domaine &&
        other.id == id &&
        other.nom == nom &&
        other.description == description &&
        other.createur_id == createur_id &&
        other.editeur_id == editeur_id &&
        other.create_at == create_at &&
        other.update_at == update_at;
  }

  @override
  int get hashCode {
    return id.hashCode ^
        nom.hashCode ^
        description.hashCode ^
        createur_id.hashCode ^
        editeur_id.hashCode ^
        create_at.hashCode ^
        update_at.hashCode;
  }
}
