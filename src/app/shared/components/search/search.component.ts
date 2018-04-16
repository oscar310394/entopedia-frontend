import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Arthropod} from '../../../arthropod';
import * as jsPDF from 'jspdf';
import { ArthropodService } from '../../services/arthropod.service';




@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

current_arthropod:Arthropod;
operation = { is_new: true };
proff:string
who:boolean;

  

  insectos:Arthropod[] = [];


  closeResult: string;

  downloadPDF(){
    const doc = new jsPDF();
    doc.text(
    "Nombre Cientifico: "+this.current_arthropod.scientific_name+
    "\nClase: "+this.current_arthropod.claArt+
    "\nNombre Comun: "+this.current_arthropod.common_name+
    "\nOrden: "+this.current_arthropod.order_subphylum+ 
    "\nFamilia: "+this.current_arthropod.family+
    "\nHabitad: "+this.current_arthropod.habitat+
    "\nHabitos: "+this.current_arthropod.habits+
    "\nGenero: "+this.current_arthropod.genus+
    "\nEspecie: "+this.current_arthropod.specie+
    "\nImpacto en la Humanidad: "+this.current_arthropod.impact_on_humanity+
    "\nDescripcion: "+this.current_arthropod.desciption+
    "\nTamaño del cuerpo: "+this.current_arthropod.body_size+
    "\nSubfilo: "+this.current_arthropod.subphylum,10,10);

    doc.save(this.current_arthropod.scientific_name+'.pfd');
    
  }


  constructor(private modalService: NgbModal,private arthropodService: ArthropodService) {}

  vermas(inse:Arthropod){
    this.current_arthropod = inse;
  }

  returnValidate(){
if(this.proff==="Chelicerata"){
this.who = true;
}else{
  this.who = false;
}
  }

  open(content,id) {
    
    this.modalService.open(content).result.then((result) => {
    
      this.closeResult = `Closed with: ${result}`;
      this.current_arthropod = new Arthropod();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.current_arthropod = new Arthropod();
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
    this.current_arthropod = new Arthropod();
    this.getArthropod();
  }

  editArthropod(art: Arthropod) {
    this.current_arthropod = art;
    this.operation.is_new = false;
  }

  getArthropod() {
    this.arthropodService.getArthropod()
      .subscribe(art => {
        this.insectos = art;
      });
  }

  addArthropod() {
    if (this.operation.is_new) {
      this.current_arthropod.user_id = 1;
      var today = new Date();
      var dd = today.getDate(); 
      var mm = today.getMonth()+1; 
      var yyyy = today.getFullYear(); 
      var fecha = dd+"/"+mm+"/"+yyyy;
      this.current_arthropod.insert_date = fecha;
      this.arthropodService.addArthropod(this.current_arthropod)
        .subscribe(res => {
          this.operation.is_new = false;
          this.current_arthropod = new Arthropod();
          this.ngOnInit();
        });
        alert("Artopodo insertado");
      return;
    }
    this.arthropodService.updateArthropod(this.current_arthropod)
      .subscribe(res => {
        this.current_arthropod = new Arthropod();
        this.operation.is_new = true;
        this.ngOnInit();
      });
  }

  deleteArthropod(id: number) {
    this.arthropodService.deleteArthropod(id)
      .subscribe(res => {
        this.ngOnInit();
      });
  }

}
