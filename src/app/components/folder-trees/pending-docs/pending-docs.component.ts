import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FolderTreeService } from '../../../services/folder-tree/folder-tree.service';
import { Router } from '@angular/router';
import { PnotifyService } from 'src/app/services/pnotify/pnotify.service';
import {
  FILE_DELETED_SUCCESSFULLY,
  FILE_NOT_DELETED, FILE_NOT_RENAMED,
  PENDING_DOC,
  TREE_NOT_LOADED
} from 'src/app/utility/message-alerts.utility';
import { NoOfPendingDocsService } from "../../../services/noOfPendingDocs/no-of-pending-docs.service";
import {ModalService} from "../../../services/modal-service/modal.service";

declare var $: any;

@Component({
  selector: 'app-pending-docs',
  templateUrl: './pending-docs.component.html',
  styleUrls: ['./pending-docs.component.css']
})
export class PendingDocsComponent implements OnInit, AfterViewInit {
  constructor(
    private folderTreeService: FolderTreeService,
    private pnotifyService: PnotifyService,
    private router: Router,
    private noOfPendingDocsService: NoOfPendingDocsService,
    private modalService:ModalService
  ) {
  }

  ngOnInit(): void {
    this.buildFolderTree();
  }

  ngAfterViewInit() {
    this.attachEventListeners();
  }
  attachEventListeners() {
    const folderService = this.folderTreeService;
    const notification = this.pnotifyService;
    const noOfPendingDocs = this.noOfPendingDocsService;
    const refresh = () => this.refreshTree();
    const navigateToIndex = (path: string) => {
      this.router.navigate(['/index'], { queryParams: { path: path, fromFolderTree: true } });
    }

    $('#jstree').on('click', '.jstree-anchor', function (e: any) {
      var path = $(this).parentsUntil('#jstree', 'li').map(function () {
        return $(this).children('a').text();
      }).get().reverse().join('/');
      if (e.target.innerHTML.includes('jstree-file')) {
        navigateToIndex(path);
      }
    });

    $('#jstree').on('refresh.jstree', function (e: any) {
      refresh();
    });

    $('#jstree').on('rename_node.jstree', function (e: any, data: any) {
      let parentString = '';
      data.node.parents.reverse().forEach((element: string, index: number) => {
        switch (index) {
          case 0:
            return
          default:
            parentString = `${parentString}/${element.replace("_", " ")}`
        }
      });
      let filepath = `${parentString}/${data.old}`
      let name = getFileNameWithoutExtension(data.text)

      folderService.fileRename(filepath, name).subscribe({
        next: (data: any) => {
          refresh();
          notification.success({
            message: data.data,
            title: PENDING_DOC,
            hasConfirm: false,
            confirmMessage: '',
          });
        },
        error: error => {
          refresh();
          notification.error({
            message: error.error.data ? error.error.data : FILE_NOT_RENAMED,
            title: PENDING_DOC,
            hasConfirm: false,
            confirmMessage: '',
          })
          console.log(error);
        },
        complete: () => {
          noOfPendingDocs.findNoOfDocs();
        }
      });
    });

    $('#jstree').on('delete_node.jstree', function (e: any, data: any) {

      let parentString = '';
      data.node.parents.reverse().forEach((element: string, index: number) => {
        switch (index) {
          case 0:
            return
          default:
            parentString = `${parentString}/${element.replace("_", " ")}`
        }
      });
      let filepath = `${parentString}/${data.node.text}`
      folderService.deleteFile(filepath).subscribe({
        next: (data: any) => {
          notification.success({
            message: data.data,
            title: PENDING_DOC,
            hasConfirm: false,
            confirmMessage: '',
          })
        },
        error: error => {
          notification.error({
            message: FILE_NOT_DELETED,
            title: PENDING_DOC,
            hasConfirm: false,
            confirmMessage: '',
          })
        },
        complete: () => {
          refresh();
          noOfPendingDocs.findNoOfDocs();
        }
      });
    });

    $('#jstree').on('move_node.jstree', function (e: any, data: any) {
      console.log('Movenode data.node => ', data.node);
      console.log('Movenode data.parent => ', data.parent);
      folderService.moveFile(data.node.id, data.parent).subscribe({
        next: (data: any) => {
          refresh();
          notification.success({
            message: data.data,
            title: PENDING_DOC,
            hasConfirm: false,
            confirmMessage: '',
          })
        },
        error: error => {
          console.error(error);
        }
      })
    });

    function getFileNameWithoutExtension(fileName: string): string {
      // Use the lastIndexOf method to find the last occurrence of the dot (.)
      const dotIndex = fileName.lastIndexOf('.');
      // If a dot is found and it is not the first character of the file name
      if (dotIndex !== -1 && dotIndex !== 0) {
        // Use the substring method to extract the file name without the extension
        return fileName.substring(0, dotIndex);
      }
      // If no dot is found or it is the first character of the file name, return the original file name
      return fileName;
    }
  }

  buildFolderTree() {
    this.folderTreeService.getFolderTree().subscribe({
      next: (data: any) => {
        const modalService=this.modalService;
        $('#jstree').jstree({
          "core": {
            "animation": false,
            "check_callback": function (operation: any, node: any, node_parent: any, node_position: any, more: any) {
              if (more && more.dnd && more.pos !== 'i') {
                return false;
              }
              if (operation === "move_node" || operation === "copy_node") {
                if (this.get_node(node).parent === this.get_node(node_parent).id) {
                  return false;
                }
              }
              return true;
            },
            "multiple": true,
            "themes": { "stripes": false },
            'data': data.data
          },
          "root": {
            "valid_children": ["default"]
          },
          'state': {
            'key': 'yourTreeStateKey',
            'preserve_loaded': true,
          },
          "default": {
            "valid_children": ["default", "file"]
          },
          "file": {
            "valid_children": []
          },
          'sort': function (element1: any, element2: any) {
            return this.get_type(element1) === this.get_type(element2) ? (this.get_text(element1) > this.get_text(element2) ? 1 : -1) : (this.get_type(element1) >= this.get_type(element2) ? 1 : -1);
          },
          "contextmenu": {
            "items": function (node: any) {
              var tree = $('#jstree').jstree(true);
              return {
                "AutoIndex": {
                  "separator_before": false,
                  "separator_after": false,
                  "icon": "fa fa-indent",
                  "label": "Auto Index",
                  "action": function (e: any) {

                  }
                },
                "Rename": {
                  "separator_before": false,
                  "separator_after": false,
                  "icon": "fa fa-pencil",
                  "label": "Rename",
                  "action": function (data: any) {
                    tree.edit(node);

                  }
                },
                "ForwardToOtherUser": {
                  "separator_before": false,
                  "separator_after": false,
                  "icon": "fa fa-share",
                  "label": "Forward To Other User",
                  "action": function (e: any) {
                    modalService.emitChange(true, 'forward-to-user-modal')
                    // TODO CALL folderTreeService.forwardToUser() and REFRESH the tree on success.
                  }
                },
                "Remove": {
                  "separator_before": false,
                  "separator_after": false,
                  "icon": "fa fa-trash-o",
                  "label": "Remove",
                  "action": function (obj: any) {
                    if (window.confirm("Are you sure you want to delete this document?")) {
                      tree.delete_node(node);
                    } else {
                      $('#jstree').jstree(true).refresh();
                    }
                  }
                },
                "refresh": {
                  "separator_before": true,
                  "separator_after": false,
                  "icon": "fa fa-refresh",
                  "label": "Refresh",
                  "action": function (obj: any) {
                    $("#jstree").jstree(true).refresh();
                  }
                }
              };
            }
          },
          "plugins": [
            "contextmenu", "dnd", "search",
            "types", "wholerow", "sort"
          ]
        });

      },
      error: error => {
        this.pnotifyService.error({
          message: TREE_NOT_LOADED,
          title: PENDING_DOC,
          hasConfirm: false,
          confirmMessage: '',
        })
        console.log(error);
        $('#jstree').jstree({
          'core': {
            'data': [
              'In Folder',
              'Mail Box',
            ]
          }
        });
      }
    })
  }

  refreshTree() {
    $('#jstree').jstree('destroy');
    this.buildFolderTree();
    //listeners will be added each time folder tree refreshed
    this.attachEventListeners()
  }
}
