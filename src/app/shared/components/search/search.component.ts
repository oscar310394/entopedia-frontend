import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Arthropod } from '../../../arthropod';
import * as jsPDF from 'jspdf';
import { ArthropodService } from '../../services/arthropod.service';
import { PhotoService } from '../../services/photo.service';
import { Photo } from '../../../photo';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  current_arthropod: Arthropod;
  operation = { is_new: true };
  proff: string
  who: boolean;
  buscar: string = "";

  photos: Photo[];
  photo: Photo;

  fileToUpload: File[];


  insectos: Arthropod[];

  closeResult: string;

  downloadPDF() {
    const doc = new jsPDF();
    doc.text(
      "Nombre Cientifico: " + this.current_arthropod.scientific_name +
      "\nClase: " + this.current_arthropod.cla_art +
      "\nNombre Comun: " + this.current_arthropod.common_name +
      "\nOrden: " + this.current_arthropod.order_subphylum +
      "\nFamilia: " + this.current_arthropod.family +
      "\nHabitad: " + this.current_arthropod.habitat +
      "\nHabitos: " + this.current_arthropod.habits +
      "\nGenero: " + this.current_arthropod.genus +
      "\nEspecie: " + this.current_arthropod.specie +
      "\nImpacto en la Humanidad: " + this.current_arthropod.impact_on_humanity +
      "\nDescripcion: " + this.current_arthropod.desciption +
      "\nTamaño del cuerpo: " + this.current_arthropod.body_size +
      "\nSubfilo: " + this.current_arthropod.subphylum, 10, 10);

    doc.save(this.current_arthropod.scientific_name + '.pfd');

  }


  constructor(private modalService: NgbModal, private arthropodService: ArthropodService, private photoService: PhotoService) { }

  vermas(inse: Arthropod) {
    this.current_arthropod = inse;

  }

  returnValidate() {
    if (this.proff === "Chelicerata") {
      this.who = true;
    } else {
      this.who = false;
    }
  }

  open(content, id) {

    this.modalService.open(content).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;
      this.current_arthropod = new Arthropod();
      this.ngOnInit();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.current_arthropod = new Arthropod();
      this.ngOnInit();
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.fileToUpload = [];
    this.current_arthropod = new Arthropod();

    if (this.buscar === "") {
      this.getArthropod();
      return;

    } else {
      this.getSearch();
      return;
    }
  }

  editArthropod(art: Arthropod) {
    this.current_arthropod = art;
    this.operation.is_new = false;
  }

  getArthropod() {
    this.arthropodService.getArthropod()
      .subscribe(art => {
        this.insectos = art.json();
      });
  }

  getSearch() {

    this.arthropodService.getSearch(this.buscar)
      .subscribe(art => {
        this.insectos = art.json();
        this.buscar = "";
        return;
      });

  }


  handleFileInput(files: FileList) {
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.fileToUpload.push(element);

    }
    console.log(this.fileToUpload);
  }

  addArthropod() {
    if (this.operation.is_new) {
      let user = JSON.parse(sessionStorage.getItem('user'));
      this.current_arthropod.user_id = user.id;

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      var fecha = dd + "/" + mm + "/" + yyyy;
      this.current_arthropod.insert_date = fecha;

      this.arthropodService.addArthropod(this.current_arthropod)
        .subscribe(res => {
          this.operation.is_new = false;
          this.current_arthropod = new Arthropod();
          this.photo = new Photo();

          let lastId = res.json().insertId;
          this.photo = new Photo();
          for (let index = 0; index < this.fileToUpload.length; index++) {

            let photo_name = this.fileToUpload[index].name;

            this.photo.arthropod_id = lastId;
            this.photo.name_photo = photo_name;
            console.log(this.photo);

            this.photoService.savePhoto(this.photo)
              .subscribe(res => {
                console.log(this.fileToUpload[index]);
                this.ngOnInit();
              });

          }

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

  savePhoto() {

  }

}
