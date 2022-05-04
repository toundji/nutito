import 'package:flutter/material.dart';
import 'package:nutito/components/opacity-animation.dart';

import '../../utils/color-const.dart';

class HomaAction extends StatelessWidget {
  const HomaAction(
    this.label,
    this.icon, {
    required this.onPressed,
    Key? key,
  }) : super(key: key);
  final String label;
  final IconData icon;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: AppOpacityAnimation(
        child: OutlinedButton.icon(
          onPressed: onPressed,
          style: OutlinedButton.styleFrom(
            primary: Colors.black54,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
          ),
          icon: Icon(
            icon,
            color: ColorConst.secondary,
          ),
          label: Padding(
            padding: EdgeInsets.symmetric(vertical: 16.0),
            child: Row(
              children: [
                Spacer(),
                Text(
                  label,
                  textScaleFactor: 1.2,
                ),
                Spacer(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
