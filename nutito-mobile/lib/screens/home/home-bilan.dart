import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_gauges/gauges.dart';

import '../../components/app-decore.dart';
import '../../utils/color-const.dart';

class HomeBilan extends StatefulWidget {
  const HomeBilan({
    Key? key,
  }) : super(key: key);

  @override
  State<HomeBilan> createState() => _HomeBilanState();
}

class _HomeBilanState extends State<HomeBilan> {
  String anotation = "20.000.000.000 f";
  var periode = "01/08 - 31/08";
  @override
  Widget build(BuildContext context) {
    return Card(
      child: Container(
        height: 250,
        padding:
            const EdgeInsets.only(top: 16, left: 16, right: 16, bottom: 16),
        child: SfRadialGauge(
          enableLoadingAnimation: true,
          axes: <RadialAxis>[
            RadialAxis(
              showLabels: false,
              showFirstLabel: true,
              showLastLabel: true,
              showTicks: false,
              ranges: [
                GaugeRange(
                    startValue: 0, endValue: 50, color: ColorConst.secondary),
                GaugeRange(
                    startValue: 50, endValue: 100, color: ColorConst.primary),
              ],
              annotations: <GaugeAnnotation>[
                GaugeAnnotation(
                  axisValue: 0,
                  widget: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: const [
                      Text(
                        "200.000.000 f",
                        style: TextStyle(
                            color: Colors.grey,
                            fontWeight: FontWeight.bold,
                            fontSize: 16),
                      ),
                      Text(
                        "Débit",
                        textScaleFactor: 0.8,
                        style: TextStyle(
                          color: Colors.grey,
                          fontWeight: FontWeight.bold,
                          fontStyle: FontStyle.italic,
                        ),
                      ),
                    ],
                  ),
                  angle: 125,
                  positionFactor: 1.20,
                ),
                GaugeAnnotation(
                  widget: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      AppDecore.getTitle("Capitale", scal: 1.2),
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 8.0),
                        child: Text(
                          anotation,
                          textScaleFactor: 1.1,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                              fontWeight: FontWeight.bold, fontSize: 18),
                        ),
                      ),
                      Text(
                        periode,
                        textScaleFactor: 0.9,
                        style: const TextStyle(
                            color: Colors.grey,
                            fontWeight: FontWeight.bold,
                            fontStyle: FontStyle.italic),
                      ),
                    ],
                  ),
                ),
                GaugeAnnotation(
                  axisValue: 100,
                  widget: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: const [
                      Text(
                        "200.000.000 f",
                        style: TextStyle(
                            color: Colors.grey,
                            fontWeight: FontWeight.bold,
                            fontSize: 16),
                      ),
                      Text(
                        "Crédit",
                        textScaleFactor: 0.8,
                        style: TextStyle(
                          color: Colors.grey,
                          fontWeight: FontWeight.bold,
                          fontStyle: FontStyle.italic,
                        ),
                      ),
                    ],
                  ),
                  angle: 50,
                  positionFactor: 1.25,
                )
              ],
            )
          ],
        ),
      ),
    );
  }
}
