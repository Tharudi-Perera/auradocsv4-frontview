import {Component, AfterViewChecked, AfterViewInit} from '@angular/core';
import { FolderTreeService } from 'src/app/services/folder-tree/folder-tree.service';
import { PnotifyService } from 'src/app/services/pnotify/pnotify.service';
import { FILE_EXPLORER, TREE_NOT_LOADED } from 'src/app/utility/message-alerts.utility';

declare var $: any;

@Component({
  selector: 'my-documents-tree',
  templateUrl: './my-documents-tree.component.html',
  styleUrls: ['./my-documents-tree.component.css']
})
export class MyDocumentsTreeComponent implements AfterViewInit {
  constructor(
    private folderTreeService: FolderTreeService,
    private pnotifyService: PnotifyService
    ) { }
  ngAfterViewInit(): void {
    this.buildFolderTree();
  }
  buildFolderTree(){
    this.folderTreeService.getMyDocumentsTree().subscribe({
      next: data => {
        $('#my-documents-tree').jstree({
          "core": {
            'data': data.data
          },
          "contextmenu": {
            items: function (node: any) {
              return {
                copyPath: {
                  label: 'Copy File Path',
                  action: function () {
                    // console.log(node);
                    let parentPath = node.parents.join("/")
                    var filePath = node.original.path; // Adjust this according to your data structure
                    // console.log(parentPath);
                  }
                },
              };
            }
          },
          "plugins": [
            "contextmenu", "dnd", "search",
            "state", "types", "wholerow"
          ]
        });
      },
      error: error => {
        this.pnotifyService.error({
          message: TREE_NOT_LOADED,
          title: FILE_EXPLORER,
          hasConfirm: false,
          confirmMessage: '',
        })
        console.log(error);
        $('#my-documents-tree').jstree();
      }
    })
  }
  rebuildTree(){
    $('#my-documents-tree').jstree('destroy');
    this.buildFolderTree();
    // console.log("working")
  }
}
