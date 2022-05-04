import 'package:nutito/models/compte.dart';
import 'package:nutito/models/fichier.dart';
import 'package:nutito/models/type-operation.dart';

class Operation {
  int? id;
  String? name;
  Compte? compte;
  DateTime? date;
  int? amount;
  TypeOperation? typeOperation;
  String? description;
  DateTime? month;
  bool type = false;
  Fichier? document;
  int? createur_id;
  int? editeur_id;
  DateTime? create_at;
  DateTime? update_at;
}
