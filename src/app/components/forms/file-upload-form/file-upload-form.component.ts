import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {PnotifyService} from 'src/app/services/pnotify/pnotify.service';
import {UploadDocumentService} from 'src/app/services/upload-document/upload-document.service';
import {
  DOCUMENT_UPLOADED, FILE_IS_TOO_BIG,
  FILES_NOT_SELECTED,
  PENDING_DOC,
} from 'src/app/utility/message-alerts.utility';
import {catchError, finalize, forkJoin, lastValueFrom, map} from 'rxjs';
import {HttpEventType} from '@angular/common/http';
import {NoOfPendingDocsService} from '../../../services/noOfPendingDocs/no-of-pending-docs.service';
import {DOCUMENT, FOLDER, USERNAME} from 'src/app/utility/constants.utility';

@Component({
  selector: 'app-file-upload-form',
  templateUrl: './file-upload-form.component.html',
  styleUrls: ['./file-upload-form.component.css'],
})
export class FileUploadFormComponent implements OnInit {
  fileForm: FormGroup;
  uploadedFiles: File[] = [];
  filesPreview: any = [];
  fileSize = [];
  @Output() booleanValueChange = new EventEmitter<boolean>();
  @ViewChild('fileUploadProgressBar') fileUploadProgressBar: ElementRef;
  progress: number = 0;
  uploadedFileSize: number = 0;
  uploadedFileSizeInMborKb: string = ''
  totalFileSize: number = 0;
  totalFileSizeInMborKb: string = ''
  progressBarVisible: boolean;
  uploadingSpeed: string = '';
  fileUploadAnimationVisible: boolean = false;
  noOfUploadingDocs: number;
  showSuccessMessage: boolean = true

  constructor(
    private sanitizer: DomSanitizer,
    public uploadDocumentService: UploadDocumentService,
    private formBuilder: FormBuilder,
    private pnotifyService: PnotifyService,
    private noOfPendingDocsService: NoOfPendingDocsService,
  ) {
  }

  ngOnInit(): void {
    this.fileForm = this.formBuilder.group({
      documents: [''],
    });
  }


  provideSecureImageBlob(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  onFileUpload(event: any) {
    this.fileUploadAnimationVisible = false;
    const allowedFileTypes = [
      'dwg',
      'doc',
      'wav',
      'docx',
      'odt',
      'pdf',
      'png',
      'txt',
      'jpg',
      'jpeg',
      'tif',
      'tiff',
      'xlsx',
      'xls',
      'csv',
      'mp4',
      'ppt',
      'mp3',
      'gif',
      'pptx',
      'zip',
      'word',
      'excel',
      'tiff',
      'giff',
      'csv',
      'cad',
    ];
    if (event.target.files.length > 0) {
      const files = event.target.files;
      if (this.areAllFilesAllowed(files, allowedFileTypes)) {

        this.fileForm.get('documents').setValue(files[0]);
        let totalFileSize=0;
        for (const element of files) {
          const file = element;
          totalFileSize=totalFileSize+file.size/1000000;
          if(totalFileSize> 10){
            this.pnotifyService.error({
              message: FILE_IS_TOO_BIG,
              hasConfirm: false,
            })
            return
          }
          this.uploadedFiles.push(file);
          const size =
            file.size > 1000000
              ? `${(file.size / 1000000).toFixed(2)} MB`
              : `${(file.size / 1000).toFixed(2)} KB`;
          const safeURL = this.provideSecureImageBlob(
            URL.createObjectURL(file)
          );
          this.filesPreview.push({
            name: file.name,
            size,
            type: file.type,
            url: safeURL,
            file,
          });
        }
        event.target.value = ''; // Clear the input value
      } else {
        alert(
          `Sorry, ${this.invalidFiles} is invalid, allowed extensions are: .doc, .wav, .docx, .odt, .pdf, .png, .txt, .jpg, .jpeg, .tif, .tiff, .xlsx, .xls, .csv, .mp4, .ppt, .mp3, .gif, .pptx, .zip, .word, .excel, .tiff, .giff, .csv, .cad `
        );
      }
    } else {
      this.pnotifyService.error({
        message: FILES_NOT_SELECTED,
        title: PENDING_DOC,
        hasConfirm: false,
      });
    }
  }

  removeFromFiles(index: number) {
    this.uploadedFiles.splice(index, 1);
    this.filesPreview.splice(index, 1);
  }

  removeAllFiles() {
    this.filesPreview.splice(0, this.filesPreview.length);
    this.uploadedFiles.splice(0, this.uploadedFiles.length);
  }

  onSubmit() {
    this.uploadedFileSize = 0;
    this.totalFileSize = 0;
    this.progress = 0;
    this.progressBarVisible = true;
    this.fileUploadAnimationVisible = true;
    let nextFolder = '';
    this.showSuccessMessage=true;
   // this.noOfPendingDocsService.findNoOfDocs();
    this.noOfPendingDocsService.getNextFolder.subscribe(e => {
      nextFolder = e.toString()
    });


    let fileNames: string[] = [];
    const observables = [];

    this.uploadedFiles.forEach((file) => {
      this.totalFileSize = this.totalFileSize + file.size;
    })
    this.totalFileSizeInMborKb = this.totalFileSize > 1000 ? (this.totalFileSize / 1000000).toFixed(2).concat('MB') : (this.totalFileSize / 1000).toFixed(2).concat('KB');

    this.noOfUploadingDocs = this.uploadedFiles.length;

    this.uploadedFiles.forEach((file) => {
      let modifiedFileName = file.name;
      this.fileSize.push(file.size);
      // Check for duplicate file names
      while (fileNames.includes(modifiedFileName)) {
        const match = RegExp(/\((\d+)\)/).exec(modifiedFileName);
        if (match) {
          const index = parseInt(match[1], 10) + 1;
          modifiedFileName = modifiedFileName.replace(/\(\d+\)/, `(${index})`);
        } else {
          modifiedFileName = `${modifiedFileName} (1)`;
        }
      }

      // Add the modified file name to the array
      fileNames.push(modifiedFileName);

      // Append the file to the FormData with the modified name
      const formData = new FormData();
      formData.append(DOCUMENT, file, modifiedFileName);
      formData.append(USERNAME, localStorage.getItem(USERNAME));
      formData.append(FOLDER, nextFolder); // the uploading folder

      // Create an observable for each file upload
      const observable = this.uploadDocumentService.uploadDocuments(formData)
        .pipe(
          map((event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.uploadDocumentService.startTimer();
              this.uploadedFileSize = this.uploadedFileSize + event.loaded;
              this.progress = Math.round((this.uploadedFileSize / this.totalFileSize) * 100);
              this.progress > 100 ? this.progress = 100 : '';
              this.uploadedFileSizeInMborKb = this.uploadedFileSize > 1000000 ? (this.uploadedFileSize / 1000000).toFixed(2).concat('MB') : (this.uploadedFileSize / 1000).toFixed(2).concat('KB');
            }
          }),
          catchError((error) => {
            // Handle error immediately
            this.pnotifyService.error({
              message: error.message,
              title: PENDING_DOC,
              hasConfirm: false,
            });
            this.showSuccessMessage=false;
            throw error; // re-throw the error to propagate it to the outer subscribe
          }),
          finalize(() => {
            // Code that runs regardless of success or error
            this.uploadDocumentService.stopTimer();
            this.uploadingSpeed = (
              this.uploadDocumentService.getUploadSpeed(this.uploadedFileSize) /
              (1024 * 1024)
            ).toFixed(2);

          })
        );

      observables.push(observable);
    });

    forkJoin(observables).subscribe({
      error: () => {
        this.refreshFolderTreeAndNextFolder();
      },
      complete: () => {
        // Display success message only if there are no errors
        if(this.showSuccessMessage){
          this.pnotifyService.success({
            message: DOCUMENT_UPLOADED,
            title: PENDING_DOC,
            hasConfirm: true,
            confirmMessage: 'Done',
          });
        }
        this.refreshFolderTreeAndNextFolder();
      }
    });


  }

  refreshFolderTreeAndNextFolder(){
    //tell folder tree to refresh
    this.booleanValueChange.emit(true);
    // pending no of docs refresh
    this.noOfPendingDocsService.findNoOfDocs();
    lastValueFrom(this.noOfPendingDocsService.getNoOfDocs).then(
      (totalNoOfDocs) => {
        this.noOfPendingDocsService.setNoOfDocs(
          this.noOfUploadingDocs + totalNoOfDocs
        );
      }
    );
    this.progressBarVisible = false;
    this.removeAllFiles();
  }



  imageOnload(url: string) {
    return URL.revokeObjectURL(url);
  }

  getFileExtension(filename: string): string {
    const match = /\.([0-9a-z]+)$/i.exec(filename);
    return match ? match[1] : '';
  }

  invalidFiles: string[] = [];

  areAllFilesAllowed(files: File[], allowedTypes: string[]): boolean {
    this.invalidFiles.splice(0, this.invalidFiles.length);
    for (const file of files) {
      if (
        !allowedTypes.includes(this.getFileExtension(file.name).toLowerCase())
      ) {
        this.invalidFiles.push(file.name);
        return false;
      }
    }
    return true;
  }
}
