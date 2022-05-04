import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:nutito/components/app-decore.dart';
import 'package:nutito/models/onboarding.dart';
import 'package:nutito/screens/welcome/onboarding-third.dart';
import 'package:nutito/utils/app-util.dart';
import 'package:nutito/utils/color-const.dart';

class OnboardingSecond extends StatelessWidget {
  OnboardingSecond({Key? key}) : super(key: key);
  Onboarding second = Onboarding.second;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
          child: Column(
        children: [
          Container(
            color: Colors.white,
            height: MediaQuery.of(context).size.height * 0.6,
            child: second.isSvg
                ? SvgPicture.asset(second.image)
                : Image.asset(second.image),
          ),
          Expanded(
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 16),
              decoration: const BoxDecoration(
                color: ColorConst.primary,
                borderRadius: BorderRadius.vertical(
                  top: Radius.circular(16),
                ),
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(top: 20.0),
                    child: AppDecore.getPrimaryTitle(second.title),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20.0),
                    child: AppDecore.getPrimaryTitle(second.content, scal: 1),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      TextButton(
                        onPressed: () {},
                        child: const Text(
                          "Sauter",
                          style: TextStyle(color: Colors.white),
                        ),
                      ),
                      Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          _buildDot(context),
                          _buildDot(context, true),
                          _buildDot(context),
                        ],
                      ),
                      IconButton(
                          color: Colors.white,
                          onPressed: () {
                            AppUtil.goToScreen(context, OnboardingThird());
                          },
                          icon: Icon(CupertinoIcons.arrow_right)),
                    ],
                  ),
                ],
              ),
            ),
          )
        ],
      )),
    );
  }

  AnimatedContainer _buildDot(BuildContext context, [bool primary = false]) {
    return AnimatedContainer(
      duration: Duration(milliseconds: 200),
      margin: EdgeInsets.only(left: 5),
      height: 6,
      width: primary ? 20 : 6,
      decoration: BoxDecoration(
        color: primary ? Colors.white : Colors.white.withOpacity(0.5),
        borderRadius: BorderRadius.circular(3),
      ),
    );
  }
}

class _currentIndex {}
