import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SearchOperation} from "../../../enum/search-operation.enum";
import {DocSearchService} from "../../../services/doc-search/doc-search.service";
import {FolderTreeService} from "../../../services/folder-tree/folder-tree.service";
declare var $: any;
@Component({
  selector: 'app-document-private-folder-tree',
  templateUrl: './document-private-folder-tree.component.html',
  styleUrls: ['./document-private-folder-tree.component.css']
})
export class DocumentPrivateFolderTreeComponent implements OnInit {
  @Input() isActive: boolean=false;
  documentPrivateFolderTreeAccordion="<i class='fa fa-sitemap'></i>  Private Folder Tree";
  id:number;
  isViewSelectedOrViewAll:boolean=false;
  constructor( private folderTreeService: FolderTreeService,
               private router: Router,
               private docSearchService: DocSearchService,
               private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.buildFolderTree();
    if(this.isActive){
      this.refreshTree();
    }

  }
  buildFolderTree() {
    this.route.queryParams.subscribe((params: Params) => {
      this.id = params['id'];
      this.isViewSelectedOrViewAll = params['viewSelected'] == 'true' || params['viewAll']=='true';
      if(!this.isViewSelectedOrViewAll){
        if(this.id!=null || this.id != undefined ) {
          this.docSearchService.getDocument(this.id, SearchOperation.FOLDER_TREE).subscribe({
            next: (data: any) => {
              $('#jstree').jstree({
                "core": {
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
                  "types", "wholerow", "sort", "state"
                ]
              });

            },
            error: error => {
              console.log(error);
              $('#jstree').jstree({
                'core': {
                  'data': [
                    'Finance',
                  ]
                }
              });
            }
          });
        }
      }
    })
  }
  refreshTree() {
    $('#jstree').jstree('destroy');
    this.buildFolderTree();
  }
}
