import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SearchOperation} from "../../../enum/search-operation.enum";
import {DocSearchService} from "../../../services/doc-search/doc-search.service";
import {ModalService} from "../../../services/modal-service/modal.service";


@Component({
  selector: 'app-document-details-groups',
  templateUrl: './document-details-groups.component.html',
  styleUrls: ['./document-details-groups.component.css']
})
export class DocumentDetailsGroupsComponent implements OnInit ,OnChanges{
  documentDetailsAccordion="<i class='fa fa-file-text-o'></i>  Document Details";
  documentDetailsData:any[]=[{}]
  templateName: string
  selectedButton: HTMLElement | null = null;
  @Input() isActive: boolean=false;
  @Input() id:number
  @Input() isViewSelectedOrViewAll:boolean=false
  @Input() base64Src:any;
  @Output() sendTemplateName=new EventEmitter<string>()
  @Output() sendFileName=new EventEmitter<string>()
  @Output() showEditDetailsAccordion=new EventEmitter<boolean>()
  @Output() sendTemplateId=new EventEmitter<number>();
  constructor(private docSearchService: DocSearchService,private modalService:ModalService ) { }
  ngOnInit(): void {


  }
  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (changes.hasOwnProperty(key)) {
        switch (key) {
          case 'id':
            this.id = changes.id.currentValue;
            break;
          case 'isViewSelectedOrViewAll':
            this.isViewSelectedOrViewAll = changes.isViewSelectedOrViewAll.currentValue;
            break;
          case 'base64Src':
            this.base64Src = changes.base64Src.currentValue;
            break;
          // Add more cases for other properties if needed
        }
      }
    }

    if(!this.isViewSelectedOrViewAll){
      if(this.id!=null || this.id != undefined ) {
        this.docSearchService.getDocument(this.id, SearchOperation.INITIAL).subscribe({
          next: (data) => {
            this.documentDetailsData=[{}]
            this.documentDetailsData[0]['File Name'] = data.data.documentName;
            this.templateName = data.data.templateName;
            this.sendTemplateId.emit(data.data.templateId);
            data.data.indexData.forEach(json => {
              Object.entries(json).forEach(([key, value]) => {
                // Add key-value pairs to the new object
                this.documentDetailsData[0][key] = value;
              })
            })
          },
          error: (error) => {
            console.log(error)
          },
          complete:()=>{
            this.sendTemplateName.emit(this.templateName);
            this.sendFileName.emit(this.documentDetailsData[0]['File Name'] );
          }
        });
      }
    }
  }


  changeButtonColor(clickedButton: HTMLElement): void {
    if (this.selectedButton) {
      this.selectedButton.style.backgroundColor = '#595f69';
      // Set color to gray for previously selected button
    }

    clickedButton.style.backgroundColor = '#ff7b08'; // Set color to yellow for the clicked button
    this.selectedButton = clickedButton; // Update the selected button reference
  }

  showEditTemplateDetails() {
    this.showEditDetailsAccordion.emit(true);
    this.sendFileName.emit(this.documentDetailsData[0]['File Name'] );
  }

  printPDF() {
    const embedSrc = 'data:application/pdf;base64,' + this.base64Src;
    const WindowPrt = window.open('', '', 'left=500,top=100,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    if (WindowPrt) {
      WindowPrt.document.write('<html><head><title>Print</title></head><body style="margin: 0;">');
      WindowPrt.document.write('<embed id="pdfEmbed" width="100%" height="100%" src="' + embedSrc + '">');
      WindowPrt.document.write('</body></html>');
      WindowPrt.onload = () => {
        // Give some time for the PDF to load before printing
        setTimeout(() => {
          WindowPrt.focus();
          WindowPrt.print();
          WindowPrt.close();
        }, 1000); // Adjust timing if necessary
      };
    } else {
      alert('Please allow popups for this website');
    }
  }


  addNoteAndSignButtonClicked() {
    this.modalService.emitChange( true,'Add-Note-Sign')
  }
}
