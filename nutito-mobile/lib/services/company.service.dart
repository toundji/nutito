import 'dart:ffi';

import 'package:flutter/cupertino.dart';
import 'package:nutito/models/company.dart';
import 'package:nutito/services/service.dart';

class CompanyService extends ChangeNotifier implements AppService<Company> {
  @override
  List<Company> all = [];

  @override
  String baseUrl = "companies";

  @override
  Company addIfNotExist(Company value) {
    // TODO: implement addIfNotExist
    throw UnimplementedError();
  }

  @override
  Future<Company> create(Company value) {
    // TODO: implement create
    throw UnimplementedError();
  }

  @override
  Future<Void> delete(Company value) {
    // TODO: implement delete
    throw UnimplementedError();
  }

  @override
  Future<Company> edit(Company value) {
    // TODO: implement edit
    throw UnimplementedError();
  }

  @override
  Company? get(int id) {
    // TODO: implement get
    throw UnimplementedError();
  }

  @override
  Future<Company?> getOrLoad(int id) {
    // TODO: implement getOrLoad
    throw UnimplementedError();
  }

  @override
  Future<Company?> load(int id) {
    // TODO: implement load
    throw UnimplementedError();
  }

  @override
  Future<List<Company>> loadAll([bool refresh = false]) {
    // TODO: implement loadAll
    throw UnimplementedError();
  }
}
