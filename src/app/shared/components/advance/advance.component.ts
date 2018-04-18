import { Component, OnInit } from '@angular/core';
import { ArthropodService } from '../../services/arthropod.service';

@Component({
  selector: 'app-advance',
  templateUrl: './advance.component.html',
  styleUrls: ['./advance.component.css']
})
export class AdvanceComponent implements OnInit {
avances:JSON[]=[];
buscar = "";
  constructor(private arthropodService: ArthropodService) { }

  ngOnInit() {
    this.getAdvance();
  }


  getAdvance(){
    this.arthropodService.getAdvance(this.buscar)
      .subscribe(art => {
        this.avances = art.json();
        this.buscar = "";
        return;
      });
  }
}
