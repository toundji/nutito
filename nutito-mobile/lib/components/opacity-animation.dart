import 'package:flutter/material.dart';

class AppOpacityAnimation extends StatefulWidget {
  AppOpacityAnimation({
    Key? key,
    required this.child,
    this.duration = 2,
  }) : super(key: key);

  final Widget child;
  final int duration;

  @override
  State<AppOpacityAnimation> createState() => _AppOpacityAnimationState();
}

class _AppOpacityAnimationState extends State<AppOpacityAnimation>
    with SingleTickerProviderStateMixin {
  late AnimationController animationController;
  late Animation animation;

  @override
  void initState() {
    super.initState();
    animationController = AnimationController(
      duration: Duration(seconds: widget.duration),
      vsync: this,
    );
    animation = Tween(begin: -1.0, end: 0.0).animate(CurvedAnimation(
        parent: animationController, curve: Curves.fastOutSlowIn));
    animationController.forward();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: animationController.drive(CurveTween(curve: Curves.easeOut)),
      child: widget.child,
    );
  }
}
