import 'dart:convert';

class Fichier {
  int? id;
  String? location;
  String? name;
  String? mimetype;
  String? entity;
  String? entity_id;
  int? size;
  int? createur_id;
  int? editeur_id;
  DateTime? create_at;
  DateTime? update_at;
  Fichier({
    this.id,
    this.location,
    this.name,
    this.mimetype,
    this.entity,
    this.entity_id,
    this.size,
    this.createur_id,
    this.editeur_id,
    this.create_at,
    this.update_at,
  });

  Fichier copyWith({
    int? id,
    String? location,
    String? name,
    String? mimetype,
    String? entity,
    String? entity_id,
    int? size,
    int? createur_id,
    int? editeur_id,
    DateTime? create_at,
    DateTime? update_at,
  }) {
    return Fichier(
      id: id ?? this.id,
      location: location ?? this.location,
      name: name ?? this.name,
      mimetype: mimetype ?? this.mimetype,
      entity: entity ?? this.entity,
      entity_id: entity_id ?? this.entity_id,
      size: size ?? this.size,
      createur_id: createur_id ?? this.createur_id,
      editeur_id: editeur_id ?? this.editeur_id,
      create_at: create_at ?? this.create_at,
      update_at: update_at ?? this.update_at,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'location': location,
      'name': name,
      'mimetype': mimetype,
      'entity': entity,
      'entity_id': entity_id,
      'size': size,
      'createur_id': createur_id,
      'editeur_id': editeur_id,
      'create_at': create_at?.millisecondsSinceEpoch,
      'update_at': update_at?.millisecondsSinceEpoch,
    };
  }

  factory Fichier.fromMap(Map<String, dynamic> map) {
    return Fichier(
      id: map['id']?.toInt(),
      location: map['location'],
      name: map['name'],
      mimetype: map['mimetype'],
      entity: map['entity'],
      entity_id: map['entity_id'],
      size: map['size']?.toInt(),
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

  factory Fichier.fromJson(String source) =>
      Fichier.fromMap(json.decode(source));

  @override
  String toString() {
    return 'Fichier(id: $id, location: $location, name: $name, mimetype: $mimetype, entity: $entity, entity_id: $entity_id, size: $size, createur_id: $createur_id, editeur_id: $editeur_id, create_at: $create_at, update_at: $update_at)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is Fichier &&
        other.id == id &&
        other.location == location &&
        other.name == name &&
        other.mimetype == mimetype &&
        other.entity == entity &&
        other.entity_id == entity_id &&
        other.size == size &&
        other.createur_id == createur_id &&
        other.editeur_id == editeur_id &&
        other.create_at == create_at &&
        other.update_at == update_at;
  }

  @override
  int get hashCode {
    return id.hashCode ^
        location.hashCode ^
        name.hashCode ^
        mimetype.hashCode ^
        entity.hashCode ^
        entity_id.hashCode ^
        size.hashCode ^
        createur_id.hashCode ^
        editeur_id.hashCode ^
        create_at.hashCode ^
        update_at.hashCode;
  }
}
