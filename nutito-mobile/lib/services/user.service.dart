import 'dart:ffi';

import 'package:flutter/cupertino.dart';
import 'package:nutito/models/user.dart';
import 'package:nutito/services/service.dart';

class UserService extends ChangeNotifier implements AppService<User> {
  @override
  List<User> all = [];

  @override
  String baseUrl = "users";

  @override
  User addIfNotExist(User value) {
    // TODO: implement addIfNotExist
    throw UnimplementedError();
  }

  @override
  Future<User> create(User value) {
    // TODO: implement create
    throw UnimplementedError();
  }

  @override
  Future<Void> delete(User value) {
    // TODO: implement delete
    throw UnimplementedError();
  }

  @override
  Future<User> edit(User value) {
    // TODO: implement edit
    throw UnimplementedError();
  }

  @override
  User? get(int id) {
    // TODO: implement get
    throw UnimplementedError();
  }

  @override
  Future<User?> getOrLoad(int id) {
    // TODO: implement getOrLoad
    throw UnimplementedError();
  }

  @override
  Future<User?> load(int id) {
    // TODO: implement load
    throw UnimplementedError();
  }

  @override
  Future<List<User>> loadAll([bool refresh = false]) {
    // TODO: implement loadAll
    throw UnimplementedError();
  }
}
