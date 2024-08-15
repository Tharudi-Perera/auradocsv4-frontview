import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  ngOnInit(): void {


  }


  ngAfterViewInit() {
    // const noOfUsers: number = 100;
    // const svgImage= document.getElementById("users") as HTMLObjectElement;
    // const textElement= svgImage.contentDocument.getElementById("noOfUsers");
    // textElement.textContent = noOfUsers.toString();

    let buttons = Array.from(
      document.getElementsByClassName('buttonColorChange') as HTMLCollectionOf<HTMLElement>,
    );
    // change button color when clicked
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(otherButton => {
          if (otherButton != button) {
            otherButton.style.backgroundColor = '#595f69'
          } else {
            button.style.backgroundColor = '#ff7b08'
          }
        })

      })

    })
  }


}
