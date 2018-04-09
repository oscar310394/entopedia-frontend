import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as jsPDF from 'jspdf';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  

  insectos = [
    {
      "num": "1",
        "nombreCien": "Morpho",
        "nombreCom": "Mariposa",
        "Orden": "Lepidoptera",
        "familia": "Nymphalidae",
        "filo":"Arthropoda"
    },
    {
      "num": "2",
      "nombreCien": "Gryllus Religiosus",
      "nombreCom": "Mantis Religiosa",
      "Orden": "Mantodea",
      "familia": "Mantidae",
      "filo":"Arthropoda"
    },
    {
      "num": "3",
      "nombreCien": "Enallagma cyathigerum",
      "nombreCom": "caballito del diablo",
      "Orden": "	Odonata",
      "familia": "Nymphalidae",
      "filo":"Arthropoda"
    }];


  closeResult: string;

  downloadPDF(){
    const doc = new jsPDF();
    doc.text("Esto esta quemado hay que pasar el seleccionado \n num: 1 \n nombreCien: Morpho \n nombreCom: Mariposa \n Orden:  Lepidopter \n familia:Nymphalidae n\ filo:Arthropoda",10,10);

    doc.save('entopedia.pfd');
  }


  constructor(private modalService: NgbModal) {}

  open(content,id) {
    this.modalService.open(content).result.then((result) => {
    
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  




  ngOnInit() {
  }

}
