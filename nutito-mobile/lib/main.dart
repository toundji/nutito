import 'package:flutter/material.dart';
import 'package:nutito/screens/auth/register/register.screen.dart';
import 'package:nutito/screens/home/home.screen.dart';
import 'package:nutito/screens/welcome/onboarding-first.dart';
import 'package:nutito/screens/welcome/onboarding-second.dart';
import 'package:nutito/services/agent.service.dart';
import 'package:nutito/services/auth.service.dart';
import 'package:nutito/services/company.service.dart';
import 'package:nutito/services/user.service.dart';
import 'package:nutito/utils/color-const.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthService()),
        ChangeNotifierProvider(create: (_) => UserService()),
        ChangeNotifierProvider(create: (_) => AgentService()),
        ChangeNotifierProvider(create: (_) => CompanyService()),
        // ChangeNotifierProvider(create: (_) => AuthService()),
        // ChangeNotifierProvider(create: (_) => AuthService()),
        // ChangeNotifierProvider(create: (_) => AuthService()),
        // ChangeNotifierProvider(create: (_) => AuthService()),
        // ChangeNotifierProvider(create: (_) => AuthService()),
      ],
      child: MaterialApp(
        title: 'Nutito',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          primarySwatch: ColorConst.primary,
          primaryColor: ColorConst.primary,
          fontFamily: "Poppins",
        ),
        home: OnboardingFirst(),
      ),
    );
  }
}
