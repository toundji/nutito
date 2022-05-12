import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_gauges/gauges.dart';

import '../../components/app-decore.dart';
import '../../utils/color-const.dart';

class LicenceCard extends StatelessWidget {
  LicenceCard({Key? key}) : super(key: key);
  String anotation = "20.000.000.000 f";
  var periode = "01/08/22 - 31/08/22";
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
                        "01/08/22",
                        style: TextStyle(
                            color: Colors.grey,
                            fontWeight: FontWeight.bold,
                            fontSize: 16),
                      ),
                      Text(
                        "Début",
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
                  widget: AppDecore.getTitle("En cours ...", scal: 1.2),
                ),
                GaugeAnnotation(
                  axisValue: 100,
                  widget: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: const [
                      Text(
                        "08/08/22",
                        style: TextStyle(
                            color: Colors.grey,
                            fontWeight: FontWeight.bold,
                            fontSize: 16),
                      ),
                      Text(
                        "Expire",
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
