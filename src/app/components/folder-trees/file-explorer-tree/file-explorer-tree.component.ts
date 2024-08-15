import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FolderTreeService } from 'src/app/services/folder-tree/folder-tree.service';
import { PnotifyService } from 'src/app/services/pnotify/pnotify.service';
import { FILE_EXPLORER, TREE_NOT_LOADED } from 'src/app/utility/message-alerts.utility';

declare var $: any;

@Component({
  selector: 'app-file-explorer-tree',
  templateUrl: './file-explorer-tree.component.html',
  styleUrls: ['./file-explorer-tree.component.css']
})
export class FileExplorerTreeComponent implements AfterViewInit {

  constructor(
    private folderTreeService: FolderTreeService,
    private pnotifyService: PnotifyService
    ) { }

  ngAfterViewInit(): void {
    this.folderTreeService.getFileExplorerTree().subscribe({
      next: (data: any) => {
        $('#filexplorertree').jstree({
          "core": {
            'data': data.data
          },
          // 'sort': function (element1: any, element2: any) {
          //   return this.get_type(element1) === this.get_type(element2) ? (this.get_text(element1) > this.get_text(element2) ? 1 : -1) : (this.get_type(element1) >= this.get_type(element2) ? 1 : -1);
          // },
          "contextmenu": {
            items: function (node: any) {
              return {
                copyPath: {
                  label: 'Copy file path',
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
        $('#filexplorertree').jstree();
      }
    })

    $('#filexplorertree').on("changed.jstree", function (e: any, data: any) {
      if (data.action === "select_node" && data.event && data.node.icon === "jstree-icon jstree-file") {
        var path = data.instance.get_path(data.node, '/');
        // console.log(path);
      }
    });
  }

}
