import 'dart:ffi';

import 'package:flutter/cupertino.dart';

import '../models/agent.dart';
import 'service.dart';

class AgentService extends ChangeNotifier implements AppService<Agent> {
  @override
  List<Agent> all = [];

  @override
  String baseUrl = "agent";

  @override
  Agent addIfNotExist(Agent value) {
    try {
      return all.firstWhere((element) =>
          element.user?.id == value.user?.id &&
          element.company?.id == value.company?.id);
    } catch (e) {
      all.add(value);
      notifyListeners();
      return value;
    }
  }

  @override
  Future<Agent> create(Agent value) {
    // TODO: implement create
    throw UnimplementedError();
  }

  @override
  Future<Void> delete(Agent value) {
    // TODO: implement delete
    throw UnimplementedError();
  }

  @override
  Future<Agent> edit(Agent value) {
    // TODO: implement edit
    throw UnimplementedError();
  }

  @override
  Agent? get(int id) {
    // TODO: implement get
    throw UnimplementedError();
  }

  @override
  Future<Agent?> getOrLoad(int id) {
    // TODO: implement getOrLoad
    throw UnimplementedError();
  }

  @override
  Future<Agent?> load(int id) {
    // TODO: implement load
    throw UnimplementedError();
  }

  @override
  Future<List<Agent>> loadAll([bool refresh = false]) {
    // TODO: implement loadAll
    throw UnimplementedError();
  }
}
