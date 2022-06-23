import { Component, Output, OnInit, EventEmitter, Input } from '@angular/core';



@Component({
  selector: 'app-filepicker',
  templateUrl: './filepicker.component.html',
  styleUrls: ['./filepicker.component.css']
})
export class FilepickerComponent implements OnInit {

  constructor() { }
  @Output() onChange: EventEmitter<File> = new EventEmitter<File>();
  @Input() formGroup: any
  @Input() formSubmitted: boolean = false;
  @Input() need_blog_image: boolean = false;
  source: string = '';
  uploadLabel: string = "";


  ngOnInit(): void {
    this.setUploadLabel();
  }

  updateSource(event: any) {
    var files = event.target.files;
    this.projectImage(files[0]);
  }

  projectImage(file: File) {
    let reader = new FileReader;
    reader.onload = (e: any) => {
      this.source = e.target.result;
      this.onChange.emit(file);
    };
    reader.readAsDataURL(file);
  }

  setUploadLabel() {
    if (this.need_blog_image == true) {
      this.uploadLabel = "Uploader une image pour ce contenu";
    }
  }

  previewImage(event: any) {
    // var output = document.getElementById('output');
    // output.src = URL.createObjectURL(event.target.files[0]);
    // output.onload = function() {
    //   URL.revokeObjectURL(output.src) // free memory
    // }
  }

}
