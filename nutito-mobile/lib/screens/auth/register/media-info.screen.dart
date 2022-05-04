import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:nutito/screens/home/home.screen.dart';
import 'package:nutito/utils/app-util.dart';
import 'package:nutito/utils/color-const.dart';
import 'package:provider/provider.dart';

import '../../../components/app-decore.dart';
import 'package:image_picker/image_picker.dart';

import '../../../services/auth.service.dart';

class RegisterMediaScreen extends StatefulWidget {
  RegisterMediaScreen({Key? key}) : super(key: key);

  @override
  State<RegisterMediaScreen> createState() => _RegisterMediaScreenState();
}

class _RegisterMediaScreenState extends State<RegisterMediaScreen> {
  String? errorMessage;

  File? logo, profile;

  @override
  void initState() {
    super.initState();
    logo = context.read<AuthService>().logo;
    profile = context.read<AuthService>().profile;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppDecore.registerAppBar(context, "Inscription 4/5"),
      body: SingleChildScrollView(
          child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            AppDecore.getTitle("Média", color: ColorConst.text, scal: 1.2),
            SizedBox(height: 16),
            const Text(
              'Profile',
              style: TextStyle(fontSize: 16),
            ),
            _getImage(profile, getImage: _getProfile),
            SizedBox(height: 16),
            Text('Logo', style: TextStyle(fontSize: 16)),
            _getImage(logo, getImage: _getLogo),
            if (_hasError)
              Padding(
                  padding: EdgeInsets.only(top: 16),
                  child: Text(
                    errorMessage!,
                    style: TextStyle(color: ColorConst.error),
                  )),
            SizedBox(height: 20),
            SizedBox(
                width: MediaQuery.of(context).size.width * 0.5,
                child: AppDecore.submitButton(context, "Valider", onSubmit))
          ],
        ),
      )),
    );
  }

  onSubmit() {
    if (profile != null && logo != null) {
      context.read<AuthService>().setMedia(logo: logo!, profile: profile!);
      AppUtil.goToScreen(context, HomeScreen());
    }
  }

  bool get _hasError => errorMessage != null && errorMessage!.isNotEmpty;

  _getProfile() async {
    final pickerFile =
        await ImagePicker().pickImage(source: ImageSource.gallery);
    // await FilePicker.platform.pickFiles(type: FileType.image);
    if (pickerFile != null) {
      profile = File(pickerFile.path);
      setState(() {});
    }
  }

  _getLogo() async {
    final pickerFile =
        await ImagePicker().pickImage(source: ImageSource.gallery);
    // await FilePicker.platform.pickFiles(type: FileType.image);
    if (pickerFile != null) {
      logo = File(pickerFile.path);
      setState(() {});
    }
  }

  _getImage(image, {required VoidCallback getImage}) {
    return InkWell(
      onTap: getImage,
      child: Card(
        shape: CircleBorder(),
        child: Stack(
          children: [
            Container(
              alignment: Alignment.center,
              padding: EdgeInsets.all(5.0),
              width: MediaQuery.of(context).size.width * 0.45,
              height: MediaQuery.of(context).size.width * 0.45,
              child: Stack(
                children: [
                  if (image == null)
                    const Icon(
                      CupertinoIcons.camera,
                      size: 80,
                      color: ColorConst.primary,
                    ),
                  if (image != null)
                    SizedBox(
                      width: MediaQuery.of(context).size.width * 0.4,
                      height: MediaQuery.of(context).size.width * 0.4,
                      child: CircleAvatar(
                        child: ClipOval(
                          child: SizedBox(
                            width: MediaQuery.of(context).size.width * 0.4,
                            height: MediaQuery.of(context).size.width * 0.4,
                            child: Image.file(
                              File(image!.path),
                              fit: BoxFit.cover,
                            ),
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ),
            Positioned(
              bottom: 0,
              right: 10,
              child: buildEditButton(onPressed: null),
            )
          ],
        ),
      ),
    );
  }

  buildEditButton({required void Function()? onPressed}) {
    return Container(
      height: 40,
      width: 40,
      decoration: BoxDecoration(
          shape: BoxShape.circle,
          color: Colors.white,
          border: Border.all(color: ColorConst.primary, width: 1.5)),
      child: IconButton(
        icon: Icon(Icons.edit, color: ColorConst.primary),
        onPressed: onPressed,
      ),
    );
  }
}
