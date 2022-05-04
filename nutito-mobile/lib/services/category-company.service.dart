import 'dart:ffi';

import 'package:flutter/cupertino.dart';
import 'package:nutito/models/category-company.dart';
import 'package:nutito/services/service.dart';

class CategoryCompanyService extends ChangeNotifier
    implements AppService<CategoryCompany> {
  @override
  List<CategoryCompany> all = [];

  @override
  String baseUrl = "categories-companies";

  @override
  CategoryCompany addIfNotExist(CategoryCompany value) {
    try {
      return all.firstWhere((element) => element.id == value.id);
    } catch (e) {
      all.add(value);
      notifyListeners();
      return value;
    }
  }

  @override
  Future<CategoryCompany> create(CategoryCompany value) {
    // TODO: implement create
    throw UnimplementedError();
  }

  @override
  Future<Void> delete(CategoryCompany value) {
    // TODO: implement delete
    throw UnimplementedError();
  }

  @override
  Future<CategoryCompany> edit(CategoryCompany value) {
    // TODO: implement edit
    throw UnimplementedError();
  }

  @override
  CategoryCompany? get(int id) {
    // TODO: implement get
    throw UnimplementedError();
  }

  @override
  Future<CategoryCompany?> getOrLoad(int id) {
    // TODO: implement getOrLoad
    throw UnimplementedError();
  }

  @override
  Future<CategoryCompany?> load(int id) {
    // TODO: implement load
    throw UnimplementedError();
  }

  @override
  Future<List<CategoryCompany>> loadAll([bool refresh = false]) {
    // TODO: implement loadAll
    throw UnimplementedError();
  }
}
